/**
 * Canonical Contact and Inquiry Type Definitions
 */

export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  href?: string;
  isExternal?: boolean;
  subtext: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type ContactFaqItem = FaqItem;

export type EnquiryType =
  | "ride_with_us"
  | "general"
  | "collaborate"
  | "press"
  | "emergency_safety";

export interface EnquiryOption {
  value: EnquiryType;
  label: string;
  badge: string;
  description: string;
  iconName: string;
}
