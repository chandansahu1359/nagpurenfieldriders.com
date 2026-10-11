import { z } from "zod";
import {
  contactSubmissionSchema,
  ContactSubmissionData,
  EnquiryType,
  ENQUIRY_TYPES,
  COLLABORATION_TYPES,
  CollaborationType,
  joinContactSchema,
  ridingClubContactSchema,
  collaborationContactSchema,
  rideEventContactSchema,
  generalContactSchema,
  feedbackContactSchema,
  otherContactSchema,
} from "./contact.schema";

export interface ValidationSuccess<T> {
  success: true;
  data: T;
}

export interface ValidationFailure {
  success: false;
  errors: Record<string, string>;
  message: string;
}

export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

/**
 * Transforms raw Zod validation issues into clean, human-friendly field errors.
 */
export function formatZodIssues(issues: z.ZodIssue[]): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const issue of issues) {
    if (issue.code === "unrecognized_keys") {
      // Reject any unexpected or arbitrary fields sent by client
      const extraKeys = (issue as { keys?: string[] }).keys || [];
      extraKeys.forEach((key) => {
        if (!errors[key]) {
          errors[key] = `Unexpected field '${key}' is not permitted.`;
        }
      });
      continue;
    }

    if (issue.code === "invalid_union") {
      const path = issue.path.join(".") || "enquiryType";
      if (!errors[path]) {
        errors[path] =
          path === "enquiryType"
            ? "Please select a valid enquiry type from the available options."
            : issue.message;
      }
      continue;
    }

    const fieldKey = issue.path.join(".") || "form";

    if (!errors[fieldKey]) {
      // Map technical Zod errors to clear human-friendly phrases if needed
      if (issue.message.includes("Expected string, received")) {
        errors[fieldKey] = "This field must be a valid text value.";
      } else if (issue.message.includes("Invalid enum value")) {
        errors[fieldKey] = "Please select a valid option.";
      } else {
        errors[fieldKey] = issue.message;
      }
    }
  }

  return errors;
}

/**
 * Validates a complete contact submission payload against the appropriate enquiryType schema.
 * Reusable by BOTH Frontend and Backend API.
 */
export function validateContactSubmission(
  rawPayload: unknown
): ValidationResult<ContactSubmissionData> {
  // Ensure payload is an object
  if (!rawPayload || typeof rawPayload !== "object" || Array.isArray(rawPayload)) {
    return {
      success: false,
      errors: { form: "Invalid request payload. Must be a JSON object." },
      message: "Please check the submitted fields.",
    };
  }

  const parseResult = contactSubmissionSchema.safeParse(rawPayload);

  if (!parseResult.success) {
    const formattedErrors = formatZodIssues(parseResult.error.issues);
    return {
      success: false,
      errors: formattedErrors,
      message: "Please check the submitted fields.",
    };
  }

  return {
    success: true,
    data: parseResult.data,
  };
}

/**
 * Maps each enquiryType to its schema for targeted single-field validation on blur.
 */
export const ENQUIRY_SCHEMAS: Record<EnquiryType, z.ZodTypeAny> = {
  join: joinContactSchema,
  "riding-club": ridingClubContactSchema,
  collaboration: collaborationContactSchema,
  "ride-event": rideEventContactSchema,
  general: generalContactSchema,
  feedback: feedbackContactSchema,
  other: otherContactSchema,
};

/**
 * Validates a single field dynamically during user interaction on the frontend.
 */
export function validateContactField(
  enquiryType: EnquiryType,
  fieldName: string,
  value: unknown
): string | null {
  const schema = ENQUIRY_SCHEMAS[enquiryType];
  if (!schema) return "Invalid enquiry type.";

  // Partial check by creating a dummy test object with the single field
  const testPayload = {
    enquiryType,
    [fieldName]: typeof value === "string" ? value.trim() : value,
  };

  const result = schema.safeParse(testPayload);
  if (!result.success) {
    const issue = result.error.issues.find(
      (iss) => iss.path.join(".") === fieldName
    );
    if (issue) {
      return issue.message;
    }
  }

  return null;
}

export interface EnquiryOption {
  value: EnquiryType;
  label: string;
  badge: string;
  description: string;
}

export const ENQUIRY_OPTIONS: EnquiryOption[] = [
  {
    value: "join",
    label: "Join NER",
    badge: "MEMBERSHIP",
    description: "Own a Royal Enfield and want to ride with the brotherhood.",
  },
  {
    value: "riding-club",
    label: "Riding Club / Community",
    badge: "CLUB CONNECT",
    description: "Fellow motorcycle clubs, chapters, and touring groups.",
  },
  {
    value: "collaboration",
    label: "Collaboration / Partnership",
    badge: "PARTNER",
    description: "Brand partnerships, media coverage, and commercial inquiries.",
  },
  {
    value: "ride-event",
    label: "Ride / Event",
    badge: "EXPEDITIONS",
    description: "Queries about upcoming rollouts, dates, routes, or assemblies.",
  },
  {
    value: "general",
    label: "General Enquiry",
    badge: "GENERAL",
    description: "Any general questions about Nagpur Enfield Riders.",
  },
  {
    value: "feedback",
    label: "Feedback / Suggestion",
    badge: "COMMUNITY",
    description: "Share feedback or suggestions regarding rides or safety.",
  },
  {
    value: "other",
    label: "Other",
    badge: "DIRECT",
    description: "Other inquiries not covered by the categories above.",
  },
];

export const COLLABORATION_OPTIONS: { value: CollaborationType; label: string }[] =
  COLLABORATION_TYPES.map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
  }));
