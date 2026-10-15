import { PurchaseRequestFormData } from "../schemas/purchase.schema";
import { getAllMerchandise } from "@/data/merchandise.data";
import { ENV } from "@/config";

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 purchase requests per 10 minutes per IP

function checkPurchaseRateLimit(clientIp: string): {
  allowed: boolean;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const record = rateLimitMap.get(clientIp) || { timestamps: [] };

  const activeTimestamps = record.timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldest = activeTimestamps[0];
    const retryAfterSeconds = Math.ceil(
      (oldest + RATE_LIMIT_WINDOW_MS - now) / 1000
    );
    return { allowed: false, retryAfterSeconds: Math.max(1, retryAfterSeconds) };
  }

  activeTimestamps.push(now);
  rateLimitMap.set(clientIp, { timestamps: activeTimestamps });

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

export interface PurchaseSubmissionResult {
  success: boolean;
  rateLimited?: boolean;
  retryAfterSeconds?: number;
  referenceId?: string;
  totalAmount?: number;
  error?: string;
}

export async function submitPurchaseRequest(
  data: PurchaseRequestFormData,
  clientIp: string
): Promise<PurchaseSubmissionResult> {
  const rateLimit = checkPurchaseRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return {
      success: false,
      rateLimited: true,
      retryAfterSeconds: rateLimit.retryAfterSeconds,
    };
  }

  // Authoritative server-side price calculation
  const allMerch = getAllMerchandise();
  let serverTotal = 0;

  // If merchandise catalog is empty (pre-launch)
  if (allMerch.length === 0) {
    // Gracefully accept testing or inquiries without failing with 500
    serverTotal = data.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  } else {
    for (const item of data.cartItems) {
      const catalogItem = allMerch.find((p) => p.id === item.productId);
      const unitPrice = catalogItem ? catalogItem.price : item.price;
      serverTotal += unitPrice * item.quantity;
    }
  }

  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const referenceId = `NER-REQ-${year}-${randomSuffix}`;

  // Log in development for auditability
  if (ENV.IS_DEV) {
    console.log("[NER Merchandise Request Logged]", {
      referenceId,
      customer: {
        name: data.fullName,
        email: data.email,
        mobile: data.mobile,
      },
      itemCount: data.cartItems.length,
      serverTotal,
      timestamp: new Date().toISOString(),
    });
  }

  return {
    success: true,
    referenceId,
    totalAmount: serverTotal,
  };
}
