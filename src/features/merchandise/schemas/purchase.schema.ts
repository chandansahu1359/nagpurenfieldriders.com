import { z } from "zod";

const indianPhoneRegex = /^[6-9]\d{9}$/;

export const purchaseRequestSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name cannot exceed 100 characters"),

    email: z
      .string()
      .trim()
      .email("Please provide a valid email address")
      .max(120, "Email cannot exceed 120 characters"),

    confirmEmail: z
      .string()
      .trim()
      .email("Please confirm your email address"),

    mobile: z
      .string()
      .trim()
      .regex(
        indianPhoneRegex,
        "Please provide a valid 10-digit Indian mobile number (e.g. 9876543210)"
      ),

    notes: z
      .string()
      .trim()
      .max(500, "Notes cannot exceed 500 characters")
      .optional()
      .or(z.literal("")),

    cartItems: z
      .array(
        z.object({
          productId: z.string().min(1),
          name: z.string().min(1),
          price: z.number().nonnegative(),
          image: z.string(),
          size: z.string().optional(),
          variant: z.string().optional(),
          quantity: z.number().int().min(1).max(10),
        })
      )
      .min(1, "Cart cannot be empty for a purchase request"),
  })
  .refine((data) => data.email.toLowerCase() === data.confirmEmail.toLowerCase(), {
    message: "Email addresses do not match",
    path: ["confirmEmail"],
  });

export type PurchaseRequestFormData = z.infer<typeof purchaseRequestSchema>;
