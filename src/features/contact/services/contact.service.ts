import { ContactFormData } from "../schemas/contact.schema";

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory rate limiting map keyed by client IP or identifier
const rateLimitMap = new Map<string, RateLimitRecord>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 submissions per 10 minutes per IP

function checkRateLimit(clientIp: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(clientIp) || { timestamps: [] };

  // Filter timestamps within current sliding window
  const activeTimestamps = record.timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldestTimestamp = activeTimestamps[0];
    const retryAfterSeconds = Math.ceil(
      (oldestTimestamp + RATE_LIMIT_WINDOW_MS - now) / 1000
    );
    return { allowed: false, retryAfterSeconds: Math.max(1, retryAfterSeconds) };
  }

  activeTimestamps.push(now);
  rateLimitMap.set(clientIp, { timestamps: activeTimestamps });

  // Periodically clean up entries older than the window
  if (rateLimitMap.size > 500) {
    for (const [ip, entry] of rateLimitMap.entries()) {
      const valid = entry.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (valid.length === 0) {
        rateLimitMap.delete(ip);
      } else {
        rateLimitMap.set(ip, { timestamps: valid });
      }
    }
  }

  return { allowed: true };
}

export interface ContactSubmissionResult {
  success: boolean;
  rateLimited?: boolean;
  retryAfterSeconds?: number;
  messageId?: string;
  error?: string;
}

export async function submitContactMessage(
  data: ContactFormData,
  clientIp: string
): Promise<ContactSubmissionResult> {
  // 1. Bot Honeypot Check (silent drop for automated bots)
  if (data.botTrap && data.botTrap.trim().length > 0) {
    // Return simulated success to trick automated spam bots without executing delivery
    return {
      success: true,
      messageId: `bot-drop-${Date.now()}`,
    };
  }

  // 2. Abuse Rate Limit Check
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return {
      success: false,
      rateLimited: true,
      retryAfterSeconds: rateLimit.retryAfterSeconds,
    };
  }

  // 3. Message Delivery Dispatch Boundary
  // In production, this service forwards to an email provider (e.g. Resend, Sendgrid, SMTP) or database
  const messageId = `ner-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  // Server-side audit log without exposing personal data unnecessarily
  if (process.env.NODE_ENV !== "production") {
    const subjectTitle = "subject" in data && data.subject ? data.subject : `[${data.enquiryType}]`;
    console.info(
      `[NER Contact Dispatch] ${messageId} | Type: ${data.enquiryType} | Subject: "${subjectTitle}" | From: ${data.email} | IP: ${clientIp}`
    );
  }

  return {
    success: true,
    messageId,
  };
}
