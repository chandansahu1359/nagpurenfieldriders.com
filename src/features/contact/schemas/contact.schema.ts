import { z } from "zod";

export const ENQUIRY_TYPES = [
  "join",
  "riding-club",
  "collaboration",
  "ride-event",
  "general",
  "feedback",
  "other",
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export const COLLABORATION_TYPES = [
  "brand",
  "event",
  "community",
  "media",
  "product",
  "other",
] as const;

export type CollaborationType = (typeof COLLABORATION_TYPES)[number];

// Standard phone format regex supporting Indian (+91) and international formats
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,16}$/;

// Standard website URL regex (http/https optional for user input)
const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/i;

// Social handle regex (@handle, handle, or full URL)
const socialHandleRegex = /^(@[a-zA-Z0-9._]{1,30}|[a-zA-Z0-9._]{1,30}|https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]{1,30}\/?)$/i;

// --- REUSABLE FIELD SCHEMAS ---

const requiredString = (fieldName: string, minLength = 2, maxLength = 100) =>
  z
    .string({
      message: `Please enter your ${fieldName.toLowerCase()}.`,
    })
    .trim()
    .min(minLength, {
      message: `${fieldName} must be at least ${minLength} characters.`,
    })
    .max(maxLength, {
      message: `${fieldName} cannot exceed ${maxLength} characters.`,
    });

const optionalString = (maxLength = 150) =>
  z
    .string()
    .trim()
    .max(maxLength, { message: `Cannot exceed ${maxLength} characters.` })
    .optional()
    .transform((val) => (val && val.length > 0 ? val : undefined));

const emailField = z
  .string({
    message: "Please enter your email address.",
  })
  .trim()
  .toLowerCase()
  .min(1, { message: "Please enter your email address." })
  .email({ message: "Please enter a valid email address." })
  .max(120, { message: "Email cannot exceed 120 characters." });

const phoneRequiredField = z
  .string({
    message: "Please enter your phone number.",
  })
  .trim()
  .min(1, { message: "Please enter your phone number." })
  .refine((val) => phoneRegex.test(val.replace(/\s+/g, "")), {
    message: "Please enter a valid phone number.",
  })
  .refine((val) => val.length <= 20, {
    message: "Phone number cannot exceed 20 characters.",
  });

const phoneOptionalField = z
  .string()
  .trim()
  .optional()
  .refine(
    (val) => !val || val.length === 0 || phoneRegex.test(val.replace(/\s+/g, "")),
    {
      message: "Please enter a valid phone number.",
    }
  )
  .refine((val) => !val || val.length <= 20, {
    message: "Phone number cannot exceed 20 characters.",
  })
  .transform((val) => (val && val.length > 0 ? val : undefined));

const subjectRequiredField = z
  .string({
    message: "Please enter a subject.",
  })
  .trim()
  .min(3, { message: "Subject must be at least 3 characters." })
  .max(120, { message: "Subject cannot exceed 120 characters." });

const subjectOptionalField = z
  .string()
  .trim()
  .max(120, { message: "Subject cannot exceed 120 characters." })
  .optional()
  .transform((val) => (val && val.length > 0 ? val : undefined));

const messageField = z
  .string({
    message: "Please enter a message.",
  })
  .trim()
  .min(10, { message: "Message must be at least 10 characters." })
  .max(2000, { message: "Message cannot exceed 2000 characters." });

const websiteOptionalField = z
  .string()
  .trim()
  .optional()
  .refine((val) => !val || val.length === 0 || urlRegex.test(val), {
    message: "Please enter a valid website address.",
  })
  .refine((val) => !val || val.length <= 150, {
    message: "Website cannot exceed 150 characters.",
  })
  .transform((val) => (val && val.length > 0 ? val : undefined));

const instagramOptionalField = z
  .string()
  .trim()
  .optional()
  .refine((val) => !val || val.length === 0 || socialHandleRegex.test(val), {
    message: "Please enter a valid Instagram handle or URL.",
  })
  .refine((val) => !val || val.length <= 100, {
    message: "Instagram handle cannot exceed 100 characters.",
  })
  .transform((val) => (val && val.length > 0 ? val : undefined));

// Honeypot bot trap field (must remain empty for human submissions)
const botTrapField = z
  .string()
  .max(100)
  .optional()
  .default("");

// --- 1. JOIN NER SCHEMA ---
export const joinContactSchema = z
  .object({
    enquiryType: z.literal("join"),
    fullName: requiredString("Full name", 2, 100),
    email: emailField,
    phone: phoneRequiredField,
    city: requiredString("City", 2, 100),
    bikeModel: requiredString("Royal Enfield model", 2, 100),
    ridingExperience: optionalString(200),
    instagram: instagramOptionalField,
    message: messageField,
    botTrap: botTrapField,
  })
  .strict();

// --- 2. RIDING CLUB / COMMUNITY SCHEMA ---
export const ridingClubContactSchema = z
  .object({
    enquiryType: z.literal("riding-club"),
    clubName: requiredString("Club or community name", 2, 120),
    contactPerson: requiredString("Contact person", 2, 100),
    email: emailField,
    city: requiredString("City", 2, 100),
    subject: subjectRequiredField,
    phone: phoneOptionalField,
    website: websiteOptionalField,
    instagram: instagramOptionalField,
    message: messageField,
    botTrap: botTrapField,
  })
  .strict();

// --- 3. COLLABORATION / PARTNERSHIP SCHEMA ---
export const collaborationContactSchema = z
  .object({
    enquiryType: z.literal("collaboration"),
    fullName: requiredString("Full name", 2, 100),
    organizationName: requiredString("Organization or brand name", 2, 120),
    email: emailField,
    collaborationType: z.enum(COLLABORATION_TYPES, {
      message: "Please select a valid collaboration type.",
    }),
    message: messageField,
    phone: phoneOptionalField,
    website: websiteOptionalField,
    city: optionalString(100),
    subject: subjectOptionalField,
    botTrap: botTrapField,
  })
  .strict();

// --- 4. RIDE / EVENT SCHEMA ---
export const rideEventContactSchema = z
  .object({
    enquiryType: z.literal("ride-event"),
    fullName: requiredString("Full name", 2, 100),
    email: emailField,
    subject: subjectRequiredField,
    message: messageField,
    phone: phoneOptionalField,
    rideEventName: optionalString(120),
    botTrap: botTrapField,
  })
  .strict();

// --- 5. GENERAL ENQUIRY SCHEMA ---
export const generalContactSchema = z
  .object({
    enquiryType: z.literal("general"),
    fullName: requiredString("Full name", 2, 100),
    email: emailField,
    subject: subjectRequiredField,
    message: messageField,
    phone: phoneOptionalField,
    botTrap: botTrapField,
  })
  .strict();

// --- 6. FEEDBACK / SUGGESTION SCHEMA ---
export const feedbackContactSchema = z
  .object({
    enquiryType: z.literal("feedback"),
    email: emailField,
    subject: subjectRequiredField,
    message: messageField,
    fullName: optionalString(100),
    relatedRideEvent: optionalString(120),
    botTrap: botTrapField,
  })
  .strict();

// --- 7. OTHER SCHEMA ---
export const otherContactSchema = z
  .object({
    enquiryType: z.literal("other"),
    fullName: requiredString("Full name", 2, 100),
    email: emailField,
    subject: subjectRequiredField,
    message: messageField,
    phone: phoneOptionalField,
    botTrap: botTrapField,
  })
  .strict();

// --- MASTER DISCRIMINATED UNION SCHEMA ---
export const contactSubmissionSchema = z.discriminatedUnion("enquiryType", [
  joinContactSchema,
  ridingClubContactSchema,
  collaborationContactSchema,
  rideEventContactSchema,
  generalContactSchema,
  feedbackContactSchema,
  otherContactSchema,
]);

export type ContactSubmissionData = z.infer<typeof contactSubmissionSchema>;
export type JoinContactData = z.infer<typeof joinContactSchema>;
export type RidingClubContactData = z.infer<typeof ridingClubContactSchema>;
export type CollaborationContactData = z.infer<typeof collaborationContactSchema>;
export type RideEventContactData = z.infer<typeof rideEventContactSchema>;
export type GeneralContactData = z.infer<typeof generalContactSchema>;
export type FeedbackContactData = z.infer<typeof feedbackContactSchema>;
export type OtherContactData = z.infer<typeof otherContactSchema>;

// Alias for backward compatibility
export const contactSchema = contactSubmissionSchema;
export type ContactFormData = ContactSubmissionData;
