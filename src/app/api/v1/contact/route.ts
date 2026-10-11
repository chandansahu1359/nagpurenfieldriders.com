import { NextRequest, NextResponse } from "next/server";
import { validateContactSubmission } from "@/features/contact/schemas/contact.validation";
import { submitContactMessage } from "@/features/contact/services/contact.service";

export async function POST(req: NextRequest) {
  try {
    // 1. Content-Type Header Verification
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

    // 2. Safe Body Extraction with Size Limit (50 KB max)
    let bodyText = "";
    try {
      bodyText = await req.text();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Invalid request.",
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
            message: "Invalid request. Request body cannot be empty.",
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
            message: "Request body exceeds maximum allowed size.",
          },
        },
        { status: 413 }
      );
    }

    // 3. JSON Parsing
    let rawJson: unknown;
    try {
      rawJson = JSON.parse(bodyText);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Invalid request.",
          },
        },
        { status: 400 }
      );
    }

    // 4. Server-Side Schema & Conditional Validation
    const validation = validateContactSubmission(rawJson);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: validation.message,
            fields: validation.errors,
          },
        },
        { status: 422 }
      );
    }

    // 5. Extract Client IP for Abuse Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp =
      forwardedFor?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 6. Contact Service Dispatch
    const result = await submitContactMessage(validation.data, clientIp);

    if (result.rateLimited) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "RATE_LIMIT_EXCEEDED",
            message: `Too many submissions. Please wait ${result.retryAfterSeconds || 60} seconds before trying again.`,
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

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong. Please try again later.",
          },
        },
        { status: 500 }
      );
    }

    // 7. Standardized Success Response
    return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been sent successfully. Nagpur Enfield Riders will get back to you soon.",
        messageId: result.messageId,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Prevent internal details/traces leakage
    console.error("[NER Contact API Error]", error instanceof Error ? error.message : error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong. Please try again later.",
        },
      },
      { status: 500 }
    );
  }
}
