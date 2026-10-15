"use client";

import React, { useState } from "react";
import { EnquiryType, CollaborationType } from "../schemas/contact.schema";
import {
  validateContactSubmission,
  validateContactField,
  ENQUIRY_OPTIONS,
} from "../schemas/contact.validation";
import { Button } from "@/components/ui/Button";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import { EnquiryTypeSelector } from "./EnquiryTypeSelector";
import { ContactFields, ContactFormDataState } from "./ContactFields";
import { ContactSuccess } from "./ContactSuccess";

const INITIAL_FORM_STATE: ContactFormDataState = {
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
  const [formData, setFormData] = useState<ContactFormDataState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleEnquiryTypeChange = (type: EnquiryType) => {
    setFormData((prev) => ({
      ...prev,
      enquiryType: type,
    }));
    setErrors({});
    setTouched({});
    setServerError(null);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

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

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (value || hasAttemptedSubmit) {
      const fieldError = validateContactField(formData.enquiryType, name, value);
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
      case "other":
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
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setHasAttemptedSubmit(true);
    setServerError(null);

    const payload = buildPayload();
    const validation = validateContactSubmission(payload);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (response.status === 422 && result.error?.fields) {
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

      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch {
      setServerError(
        "Network transmission failed. Please check your internet connection and try again."
      );
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setTouched({});
    setHasAttemptedSubmit(false);
    setServerError(null);
    setIsSubmitted(false);
  };

  const shouldShowError = (fieldName: string): boolean => {
    return Boolean(errors[fieldName] && (touched[fieldName] || hasAttemptedSubmit));
  };

  if (isSubmitted) {
    return <ContactSuccess onReset={handleReset} />;
  }

  const currentEnquiry = ENQUIRY_OPTIONS.find(
    (opt) => opt.value === formData.enquiryType
  );

  return (
    <div className="relative rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 sm:p-10 backdrop-blur-md shadow-2xl shadow-black/60">
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

      <div className="mb-8">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">
            OFFICIAL DISPATCH DESK
          </span>
          {currentEnquiry && (
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase bg-zinc-950 px-2.5 py-0.5 rounded border border-zinc-800">
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
        {/* Anti-spam Honeypot field */}
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

        {/* 1. Category Selector */}
        <EnquiryTypeSelector
          value={formData.enquiryType}
          onChange={handleEnquiryTypeChange}
          disabled={isSubmitting}
        />

        {/* 2. Decomposed Form Fields */}
        <ContactFields
          formData={formData}
          errors={errors}
          shouldShowError={shouldShowError}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />

        {/* 3. Submit Action */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
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
          <p className="text-[11px] font-mono text-zinc-500 text-center mt-2.5">
            Encrypted transmission directly to Nagpur Enfield Riders coordination team.
          </p>
        </div>
      </form>
    </div>
  );
};
