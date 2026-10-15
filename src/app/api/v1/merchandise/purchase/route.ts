import { NextRequest, NextResponse } from "next/server";
import { purchaseRequestSchema } from "@/features/merchandise/schemas/purchase.schema";
import { submitPurchaseRequest } from "@/features/merchandise/services/purchase.service";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNSUPPORTED_MEDIA_TYPE",
            message: "Content-Type must be application/json.",
          },
        },
        { status: 415 }
      );
    }

    let bodyText = "";
    try {
      bodyText = await req.text();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Invalid request payload.",
          },
        },
        { status: 400 }
      );
    }

    if (!bodyText || bodyText.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Request body cannot be empty.",
          },
        },
        { status: 400 }
      );
    }

    if (bodyText.length > 50 * 1024) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "PAYLOAD_TOO_LARGE",
            message: "Request exceeds maximum allowed size.",
          },
        },
        { status: 413 }
      );
    }

    let rawJson: unknown;
    try {
      rawJson = JSON.parse(bodyText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Malformed JSON payload.",
          },
        },
        { status: 400 }
      );
    }

    const validation = purchaseRequestSchema.safeParse(rawJson);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Please correct the errors in the form.",
            issues: validation.error.flatten().fieldErrors,
          },
        },
        { status: 422 }
      );
    }

    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp =
      forwardedFor?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const result = await submitPurchaseRequest(validation.data, clientIp);

    if (result.rateLimited) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "RATE_LIMIT_EXCEEDED",
            message: `Too many requests. Please wait ${result.retryAfterSeconds || 60} seconds before submitting again.`,
          },
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(result.retryAfterSeconds || 60),
          },
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        referenceId: result.referenceId,
        totalAmount: result.totalAmount,
        message:
          "Your purchase request has been received. Our team will verify availability and reach out with instructions.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Purchase Request Route Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred while processing your request.",
        },
      },
      { status: 500 }
    );
  }
}
