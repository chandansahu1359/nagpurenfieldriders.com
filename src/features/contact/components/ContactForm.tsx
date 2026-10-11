"use client";

import React, { useState } from "react";
import {
  EnquiryType,
  CollaborationType,
  ContactSubmissionData,
} from "../schemas/contact.schema";
import {
  validateContactSubmission,
  validateContactField,
  ENQUIRY_OPTIONS,
  COLLABORATION_OPTIONS,
} from "../schemas/contact.validation";
import { Button } from "@/components/ui/Button";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  Mail,
  User,
  Phone,
  FileText,
  MessageSquare,
  MapPin,
  Bike,
  Building,
  Globe,
  AtSign,
  Compass,
} from "lucide-react";

interface FormState {
  enquiryType: EnquiryType;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  subject: string;
  message: string;
  bikeModel: string;
  ridingExperience: string;
  instagram: string;
  clubName: string;
  contactPerson: string;
  website: string;
  organizationName: string;
  collaborationType: CollaborationType;
  rideEventName: string;
  relatedRideEvent: string;
  botTrap: string;
}

const INITIAL_FORM_STATE: FormState = {
  enquiryType: "join",
  fullName: "",
  email: "",
  phone: "",
  city: "",
  subject: "",
  message: "",
  bikeModel: "",
  ridingExperience: "",
  instagram: "",
  clubName: "",
  contactPerson: "",
  website: "",
  organizationName: "",
  collaborationType: "brand",
  rideEventName: "",
  relatedRideEvent: "",
  botTrap: "",
};

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Switch Enquiry Type
  const handleEnquiryTypeChange = (type: EnquiryType) => {
    setFormData((prev) => ({
      ...prev,
      enquiryType: type,
    }));
    // Clear validation errors for previous enquiry type
    setErrors({});
    setTouched({});
    setServerError(null);
  };

  // Field change handler
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // If field has an active error, re-evaluate or clear it
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (serverError) {
      setServerError(null);
    }
  };

  // Field blur handler for smooth UX (validates only after interaction)
  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Run single-field validation only if user has entered content or attempted submit
    if (value || hasAttemptedSubmit) {
      const fieldError = validateContactField(
        formData.enquiryType,
        name,
        value
      );
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    }
  };

  // Construct payload specifically tailored for the active enquiryType
  const buildPayload = (): Record<string, unknown> => {
    const base: Record<string, unknown> = {
      enquiryType: formData.enquiryType,
      botTrap: formData.botTrap,
    };

    switch (formData.enquiryType) {
      case "join":
        return {
          ...base,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          city: formData.city.trim(),
          bikeModel: formData.bikeModel.trim(),
          ridingExperience: formData.ridingExperience.trim() || undefined,
          instagram: formData.instagram.trim() || undefined,
          message: formData.message.trim(),
        };

      case "riding-club":
        return {
          ...base,
          clubName: formData.clubName.trim(),
          contactPerson: formData.contactPerson.trim(),
          email: formData.email.trim(),
          city: formData.city.trim(),
          subject: formData.subject.trim(),
          phone: formData.phone.trim() || undefined,
          website: formData.website.trim() || undefined,
          instagram: formData.instagram.trim() || undefined,
          message: formData.message.trim(),
        };

      case "collaboration":
        return {
          ...base,
          fullName: formData.fullName.trim(),
          organizationName: formData.organizationName.trim(),
          email: formData.email.trim(),
          collaborationType: formData.collaborationType,
          message: formData.message.trim(),
          phone: formData.phone.trim() || undefined,
          website: formData.website.trim() || undefined,
          city: formData.city.trim() || undefined,
          subject: formData.subject.trim() || undefined,
        };

      case "ride-event":
        return {
          ...base,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          phone: formData.phone.trim() || undefined,
          rideEventName: formData.rideEventName.trim() || undefined,
        };

      case "general":
        return {
          ...base,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          phone: formData.phone.trim() || undefined,
        };

      case "feedback":
        return {
          ...base,
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          fullName: formData.fullName.trim() || undefined,
          relatedRideEvent: formData.relatedRideEvent.trim() || undefined,
        };

      case "other":
        return {
          ...base,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          phone: formData.phone.trim() || undefined,
        };
    }
  };

  // Submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setHasAttemptedSubmit(true);
    setServerError(null);

    const payload = buildPayload();

    // 1. Frontend Schema Validation (Shared source of truth)
    const validation = validateContactSubmission(payload);
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // 2. Transmit to Contact API v1
      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (response.status === 422 && result.error?.fields) {
          // Map backend field errors directly back to the matching fields
          setErrors(result.error.fields);
          setServerError(
            result.error.message || "Please correct the highlighted fields below."
          );
        } else if (response.status === 429) {
          setServerError(
            result.error?.message ||
              "Too many requests sent. Please wait a few moments before trying again."
          );
        } else {
          setServerError(
            result.error?.message ||
              "Unable to process your dispatch. Please check your connection and try again."
          );
        }
        setIsSubmitting(false);
        return;
      }

      // 3. Successful Submission
      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch {
      setServerError(
        "Network transmission failed. Please check your internet connection and try again."
      );
      setIsSubmitting(false);
    }
  };

  // Reset form to send another message
  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setTouched({});
    setHasAttemptedSubmit(false);
    setServerError(null);
    setIsSubmitted(false);
  };

  // Field error visibility rule: show if user blurred the field OR attempted to submit
  const shouldShowError = (fieldName: string): boolean => {
    return Boolean(errors[fieldName] && (touched[fieldName] || hasAttemptedSubmit));
  };

  // SUCCESS STATE VIEW
  if (isSubmitted) {
    return (
      <div className="relative rounded-2xl bg-zinc-900/90 border border-amber-500/40 p-8 sm:p-12 text-center backdrop-blur-md shadow-2xl shadow-black/80 flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-md">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
            TRANSMISSION RECEIVED
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            MESSAGE SENT
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Thanks for reaching out to Nagpur Enfield Riders. Your dispatch has
            been logged into our community road desk. We will review your message
            and respond soon.
          </p>
        </div>

        <div className="pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Send Another Dispatch
          </Button>
        </div>
      </div>
    );
  }

  const currentEnquiry = ENQUIRY_OPTIONS.find(
    (opt) => opt.value === formData.enquiryType
  );

  return (
    <div className="relative rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 sm:p-10 backdrop-blur-md shadow-2xl shadow-black/60">
      {/* Decorative top amber accent bar */}
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

      <div className="mb-8">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
            OFFICIAL DISPATCH DESK
          </span>
          {currentEnquiry && (
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
              {currentEnquiry.badge}
            </span>
          )}
        </div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">
          Transmit Your Query
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Select your enquiry category. Fields marked with{" "}
          <span className="text-amber-500">*</span> are required.
        </p>
      </div>

      {/* Global Server Error Alert */}
      {serverError && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="font-semibold block text-red-300 mb-0.5">
              Dispatch Error
            </strong>
            <span>{serverError}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Anti-spam Honeypot field (hidden from human users) */}
        <div
          className="opacity-0 absolute -top-[9999px] -left-[9999px] pointer-events-none select-none h-0 w-0 overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="botTrap">Do not fill this field</label>
          <input
            type="text"
            id="botTrap"
            name="botTrap"
            value={formData.botTrap}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* 1. ENQUIRY TYPE SELECTOR */}
        <div className="space-y-2">
          <label
            htmlFor="enquiryType"
            className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              Enquiry Type <span className="text-amber-500">*</span>
            </span>
          </label>
          <select
            id="enquiryType"
            name="enquiryType"
            value={formData.enquiryType}
            onChange={(e) => handleEnquiryTypeChange(e.target.value as EnquiryType)}
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20 text-sm text-zinc-100 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {ENQUIRY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-zinc-900 py-1">
                {opt.label} — {opt.description}
              </option>
            ))}
          </select>
          {currentEnquiry && (
            <p className="text-[11px] text-zinc-400 pl-1">
              {currentEnquiry.description}
            </p>
          )}
        </div>

        {/* --- DYNAMIC FIELDS BY ENQUIRY TYPE --- */}

        {/* A. JOIN NER FIELDS */}
        {formData.enquiryType === "join" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Rahul Sharma"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("fullName")}
                  aria-describedby={
                    shouldShowError("fullName") ? "fullName-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("fullName")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("fullName") && (
                  <p
                    id="fullName-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  Email Address <span className="text-amber-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. rahul@example.com"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("email")}
                  aria-describedby={
                    shouldShowError("email") ? "email-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("email")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("email") && (
                  <p
                    id="email-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone (Required for Join) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  Phone Number <span className="text-amber-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+91 98765 43210"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("phone")}
                  aria-describedby={
                    shouldShowError("phone") ? "phone-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("phone")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("phone") && (
                  <p
                    id="phone-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* City (Required for Join) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="city"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  City <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Nagpur"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("city")}
                  aria-describedby={
                    shouldShowError("city") ? "city-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("city")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("city") && (
                  <p
                    id="city-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.city}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Royal Enfield Bike Model */}
              <div className="space-y-1.5">
                <label
                  htmlFor="bikeModel"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Bike className="w-3.5 h-3.5 text-zinc-400" />
                  Royal Enfield Model <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  id="bikeModel"
                  name="bikeModel"
                  value={formData.bikeModel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Classic 350 / Interceptor 650 / Himalayan 450"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("bikeModel")}
                  aria-describedby={
                    shouldShowError("bikeModel") ? "bikeModel-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("bikeModel")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("bikeModel") && (
                  <p
                    id="bikeModel-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.bikeModel}</span>
                  </p>
                )}
              </div>

              {/* Riding Experience (Optional) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="ridingExperience"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 block"
                >
                  Riding Experience{" "}
                  <span className="text-zinc-400 lowercase text-[10px]">(optional)</span>
                </label>
                <input
                  type="text"
                  id="ridingExperience"
                  name="ridingExperience"
                  value={formData.ridingExperience}
                  onChange={handleChange}
                  placeholder="e.g. 3 years touring, weekend rider, etc."
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Instagram (Optional) */}
            <div className="space-y-1.5">
              <label
                htmlFor="instagram"
                className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
              >
                <AtSign className="w-3.5 h-3.5 text-zinc-400" />
                Instagram Handle{" "}
                <span className="text-zinc-400 lowercase text-[10px]">(optional)</span>
              </label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. @rider_nagpur"
                disabled={isSubmitting}
                aria-invalid={shouldShowError("instagram")}
                aria-describedby={
                  shouldShowError("instagram") ? "instagram-error" : undefined
                }
                className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  shouldShowError("instagram")
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                }`}
              />
              {shouldShowError("instagram") && (
                <p
                  id="instagram-error"
                  role="alert"
                  className="text-xs text-red-400 flex items-center gap-1 mt-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.instagram}</span>
                </p>
              )}
            </div>
          </>
        )}

        {/* B. RIDING CLUB / COMMUNITY FIELDS */}
        {formData.enquiryType === "riding-club" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Club Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="clubName"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Building className="w-3.5 h-3.5 text-zinc-400" />
                  Club / Community Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  id="clubName"
                  name="clubName"
                  value={formData.clubName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Central India Riders Club"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("clubName")}
                  aria-describedby={
                    shouldShowError("clubName") ? "clubName-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("clubName")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("clubName") && (
                  <p
                    id="clubName-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.clubName}</span>
                  </p>
                )}
              </div>

              {/* Contact Person */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contactPerson"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  Contact Person <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Captain Amit Rao"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("contactPerson")}
                  aria-describedby={
                    shouldShowError("contactPerson")
                      ? "contactPerson-error"
                      : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("contactPerson")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("contactPerson") && (
                  <p
                    id="contactPerson-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.contactPerson}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  Email Address <span className="text-amber-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. contact@ridersclub.in"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("email")}
                  aria-describedby={
                    shouldShowError("email") ? "email-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("email")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("email") && (
                  <p
                    id="email-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label
                  htmlFor="city"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  City / Location <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Pune / Mumbai / Raipur"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("city")}
                  aria-describedby={
                    shouldShowError("city") ? "city-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("city")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("city") && (
                  <p
                    id="city-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.city}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone (Optional) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  Phone Number{" "}
                  <span className="text-zinc-400 lowercase text-[10px]">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+91 98765 43210"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("phone")}
                  aria-describedby={
                    shouldShowError("phone") ? "phone-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("phone")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("phone") && (
                  <p
                    id="phone-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Website (Optional) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="website"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-zinc-400" />
                  Club Website{" "}
                  <span className="text-zinc-400 lowercase text-[10px]">(optional)</span>
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. www.ridersclub.in"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("website")}
                  aria-describedby={
                    shouldShowError("website") ? "website-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("website")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("website") && (
                  <p
                    id="website-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.website}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Subject (Required for Club) */}
            <div className="space-y-1.5">
              <label
                htmlFor="subject"
                className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-zinc-400" />
                Subject <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Joint Meet & Highway Ride Proposal"
                disabled={isSubmitting}
                aria-invalid={shouldShowError("subject")}
                aria-describedby={
                  shouldShowError("subject") ? "subject-error" : undefined
                }
                className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  shouldShowError("subject")
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                }`}
              />
              {shouldShowError("subject") && (
                <p
                  id="subject-error"
                  role="alert"
                  className="text-xs text-red-400 flex items-center gap-1 mt-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.subject}</span>
                </p>
              )}
            </div>
          </>
        )}

        {/* C. COLLABORATION / PARTNERSHIP FIELDS */}
        {formData.enquiryType === "collaboration" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  Contact Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Priya Nair"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("fullName")}
                  aria-describedby={
                    shouldShowError("fullName") ? "fullName-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("fullName")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("fullName") && (
                  <p
                    id="fullName-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Organization Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="organizationName"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Building className="w-3.5 h-3.5 text-zinc-400" />
                  Organization / Brand Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. MotoCraft Gear / Overland Media"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("organizationName")}
                  aria-describedby={
                    shouldShowError("organizationName")
                      ? "organizationName-error"
                      : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("organizationName")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("organizationName") && (
                  <p
                    id="organizationName-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.organizationName}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  Work Email <span className="text-amber-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. priya@brand.com"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("email")}
                  aria-describedby={
                    shouldShowError("email") ? "email-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("email")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("email") && (
                  <p
                    id="email-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Collaboration Type */}
              <div className="space-y-1.5">
                <label
                  htmlFor="collaborationType"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 block"
                >
                  Collaboration Category <span className="text-amber-500">*</span>
                </label>
                <select
                  id="collaborationType"
                  name="collaborationType"
                  value={formData.collaborationType}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20 text-sm text-zinc-100 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {COLLABORATION_OPTIONS.map((collab) => (
                    <option key={collab.value} value={collab.value}>
                      {collab.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone (Optional) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  Phone Number{" "}
                  <span className="text-zinc-400 lowercase text-[10px]">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+91 98765 43210"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("phone")}
                  aria-describedby={
                    shouldShowError("phone") ? "phone-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("phone")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("phone") && (
                  <p
                    id="phone-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Website (Optional) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="website"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-zinc-400" />
                  Brand Website{" "}
                  <span className="text-zinc-400 lowercase text-[10px]">(optional)</span>
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. www.brandname.com"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("website")}
                  aria-describedby={
                    shouldShowError("website") ? "website-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("website")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("website") && (
                  <p
                    id="website-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.website}</span>
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* D. RIDE / EVENT FIELDS */}
        {formData.enquiryType === "ride-event" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Aniket Joshi"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("fullName")}
                  aria-describedby={
                    shouldShowError("fullName") ? "fullName-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("fullName")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("fullName") && (
                  <p
                    id="fullName-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  Email Address <span className="text-amber-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. aniket@example.com"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("email")}
                  aria-describedby={
                    shouldShowError("email") ? "email-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("email")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("email") && (
                  <p
                    id="email-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone (Optional) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  Phone Number{" "}
                  <span className="text-zinc-400 lowercase text-[10px]">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+91 98765 43210"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("phone")}
                  aria-describedby={
                    shouldShowError("phone") ? "phone-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("phone")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("phone") && (
                  <p
                    id="phone-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Ride / Event Name (Optional) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="rideEventName"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 block"
                >
                  Specific Ride / Event{" "}
                  <span className="text-zinc-400 lowercase text-[10px]">(optional)</span>
                </label>
                <input
                  type="text"
                  id="rideEventName"
                  name="rideEventName"
                  value={formData.rideEventName}
                  onChange={handleChange}
                  placeholder="e.g. Sunday Pench Dawn Run or Foundation Tour"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label
                htmlFor="subject"
                className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-zinc-400" />
                Subject <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Inquiring about assembly location and schedule"
                disabled={isSubmitting}
                aria-invalid={shouldShowError("subject")}
                aria-describedby={
                  shouldShowError("subject") ? "subject-error" : undefined
                }
                className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  shouldShowError("subject")
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                }`}
              />
              {shouldShowError("subject") && (
                <p
                  id="subject-error"
                  role="alert"
                  className="text-xs text-red-400 flex items-center gap-1 mt-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.subject}</span>
                </p>
              )}
            </div>
          </>
        )}

        {/* E. GENERAL ENQUIRY / OTHER FIELDS */}
        {(formData.enquiryType === "general" || formData.enquiryType === "other") && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Rahul Sharma"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("fullName")}
                  aria-describedby={
                    shouldShowError("fullName") ? "fullName-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("fullName")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("fullName") && (
                  <p
                    id="fullName-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  Email Address <span className="text-amber-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. rahul@example.com"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("email")}
                  aria-describedby={
                    shouldShowError("email") ? "email-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("email")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("email") && (
                  <p
                    id="email-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone (Optional) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  Phone Number{" "}
                  <span className="text-zinc-400 lowercase text-[10px]">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+91 98765 43210"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("phone")}
                  aria-describedby={
                    shouldShowError("phone") ? "phone-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("phone")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("phone") && (
                  <p
                    id="phone-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label
                  htmlFor="subject"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-zinc-400" />
                  Subject <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. General community query"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("subject")}
                  aria-describedby={
                    shouldShowError("subject") ? "subject-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("subject")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("subject") && (
                  <p
                    id="subject-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* F. FEEDBACK / SUGGESTION FIELDS */}
        {formData.enquiryType === "feedback" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Email (Required for Feedback) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  Email Address <span className="text-amber-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. rider@example.com"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("email")}
                  aria-describedby={
                    shouldShowError("email") ? "email-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("email")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("email") && (
                  <p
                    id="email-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Full Name (Optional for Feedback) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  Your Name{" "}
                  <span className="text-zinc-400 lowercase text-[10px]">(optional)</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Anonymous Rider or Rahul"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Subject (Required for Feedback) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="subject"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-zinc-400" />
                  Subject <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Route suggestion for future Sunday rollouts"
                  disabled={isSubmitting}
                  aria-invalid={shouldShowError("subject")}
                  aria-describedby={
                    shouldShowError("subject") ? "subject-error" : undefined
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    shouldShowError("subject")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
                  }`}
                />
                {shouldShowError("subject") && (
                  <p
                    id="subject-error"
                    role="alert"
                    className="text-xs text-red-400 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              {/* Related Ride / Event (Optional) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="relatedRideEvent"
                  className="text-xs font-medium uppercase tracking-wider text-zinc-300 block"
                >
                  Related Ride / Event{" "}
                  <span className="text-zinc-400 lowercase text-[10px]">(optional)</span>
                </label>
                <input
                  type="text"
                  id="relatedRideEvent"
                  name="relatedRideEvent"
                  value={formData.relatedRideEvent}
                  onChange={handleChange}
                  placeholder="e.g. Last Sunday breakfast ride"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </>
        )}

        {/* --- COMMON MESSAGE TEXTAREA --- */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="message"
              className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
              {formData.enquiryType === "join"
                ? "Your Message / Riding Story"
                : "Your Message"}{" "}
              <span className="text-amber-500">*</span>
            </label>
            <span className="text-[11px] font-mono text-zinc-400">
              {formData.message.length} / 2000
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={
              formData.enquiryType === "join"
                ? "Tell us about yourself, what Royal Enfield you ride, how long you've been riding, and why you want to roll out with NER..."
                : formData.enquiryType === "riding-club"
                ? "Share details about your club, upcoming routes, or how you would like to connect with Nagpur Enfield Riders..."
                : formData.enquiryType === "collaboration"
                ? "Share details of your brand collaboration, proposal, event timeline, and contact information..."
                : "Type your query or message here..."
            }
            disabled={isSubmitting}
            aria-invalid={shouldShowError("message")}
            aria-describedby={
              shouldShowError("message") ? "message-error" : undefined
            }
            className={`w-full px-4 py-3 rounded-xl bg-zinc-950/80 border text-sm text-zinc-100 placeholder:text-zinc-600 transition-all focus:outline-none focus:ring-2 resize-y min-h-[130px] disabled:opacity-50 disabled:cursor-not-allowed ${
              shouldShowError("message")
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
            }`}
          />
          {shouldShowError("message") && (
            <p
              id="message-error"
              role="alert"
              className="text-xs text-red-400 flex items-center gap-1 mt-1"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* --- SUBMIT ACTION BUTTON --- */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-zinc-400 leading-tight">
            Encrypted transmission with server-side validation and abuse rate limiting.
          </p>

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
            icon={
              isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )
            }
          >
            {isSubmitting ? "Transmitting..." : "Send Dispatch"}
          </Button>
        </div>
      </form>
    </div>
  );
};
