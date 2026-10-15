"use client";

import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bike,
  Building,
  Globe,
  AtSign,
  FileText,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { EnquiryType, CollaborationType } from "../schemas/contact.schema";
import { COLLABORATION_OPTIONS } from "../schemas/contact.validation";

export interface ContactFormDataState {
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

interface ContactFieldsProps {
  formData: ContactFormDataState;
  errors: Record<string, string>;
  shouldShowError: (name: string) => boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onBlur: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  disabled?: boolean;
}

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  placeholder?: string;
  icon: React.ReactNode;
  error?: string;
  showError?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  required = false,
  type = "text",
  value,
  placeholder,
  icon,
  error,
  showError,
  disabled,
  onChange,
  onBlur,
}) => (
  <div className="space-y-1.5">
    <label
      htmlFor={id}
      className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center justify-between"
    >
      <span className="flex items-center gap-1.5">
        <span className="text-amber-500">{icon}</span>
        {label} {required && <span className="text-amber-500">*</span>}
      </span>
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-xl bg-zinc-950/90 border text-sm text-zinc-100 placeholder-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed ${
        showError
          ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/20"
          : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
      }`}
    />
    {showError && error && (
      <p className="text-xs text-red-400 flex items-center gap-1.5 pl-1 pt-0.5">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        <span>{error}</span>
      </p>
    )}
  </div>
);

export const ContactFields: React.FC<ContactFieldsProps> = ({
  formData,
  errors,
  shouldShowError,
  onChange,
  onBlur,
  disabled = false,
}) => {
  const { enquiryType } = formData;

  return (
    <div className="space-y-5">
      {/* 1. RIDING CLUB SPECIFIC FIELDS */}
      {enquiryType === "riding-club" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id="clubName"
            name="clubName"
            label="Club / Group Name"
            required
            value={formData.clubName}
            placeholder="e.g. Pune Bulleteers"
            icon={<Building className="w-3.5 h-3.5" />}
            showError={shouldShowError("clubName")}
            error={errors.clubName}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
          />
          <TextInput
            id="contactPerson"
            name="contactPerson"
            label="Representative Name"
            required
            value={formData.contactPerson}
            placeholder="e.g. Captain Rohan"
            icon={<User className="w-3.5 h-3.5" />}
            showError={shouldShowError("contactPerson")}
            error={errors.contactPerson}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
      )}

      {/* 2. COLLABORATION SPECIFIC FIELDS */}
      {enquiryType === "collaboration" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id="fullName"
            name="fullName"
            label="Contact Person Name"
            required
            value={formData.fullName}
            placeholder="e.g. Ananya Sen"
            icon={<User className="w-3.5 h-3.5" />}
            showError={shouldShowError("fullName")}
            error={errors.fullName}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
          />
          <TextInput
            id="organizationName"
            name="organizationName"
            label="Company / Brand Name"
            required
            value={formData.organizationName}
            placeholder="e.g. Touratech India"
            icon={<Building className="w-3.5 h-3.5" />}
            showError={shouldShowError("organizationName")}
            error={errors.organizationName}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
      )}

      {/* 3. DEFAULT FULL NAME FIELD (for join, general, ride-event, other) */}
      {enquiryType !== "riding-club" && enquiryType !== "collaboration" && (
        <TextInput
          id="fullName"
          name="fullName"
          label="Your Full Name"
          required={enquiryType !== "feedback"}
          value={formData.fullName}
          placeholder="e.g. Rohan Deshmukh"
          icon={<User className="w-3.5 h-3.5" />}
          showError={shouldShowError("fullName")}
          error={errors.fullName}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}

      {/* 4. EMAIL & PHONE ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          required
          value={formData.email}
          placeholder="rider@example.com"
          icon={<Mail className="w-3.5 h-3.5" />}
          showError={shouldShowError("email")}
          error={errors.email}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        />

        <TextInput
          id="phone"
          name="phone"
          type="tel"
          label={enquiryType === "join" ? "Mobile Number" : "Phone (Optional)"}
          required={enquiryType === "join"}
          value={formData.phone}
          placeholder="+91 98765 43210"
          icon={<Phone className="w-3.5 h-3.5" />}
          showError={shouldShowError("phone")}
          error={errors.phone}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>

      {/* 5. JOIN SPECIFIC: Bike Model & Location */}
      {enquiryType === "join" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              id="bikeModel"
              name="bikeModel"
              label="Royal Enfield Model & Year"
              required
              value={formData.bikeModel}
              placeholder="e.g. Classic 350 / Himalayan 450"
              icon={<Bike className="w-3.5 h-3.5" />}
              showError={shouldShowError("bikeModel")}
              error={errors.bikeModel}
              disabled={disabled}
              onChange={onChange}
              onBlur={onBlur}
            />

            <TextInput
              id="city"
              name="city"
              label="Current City / Area"
              required
              value={formData.city}
              placeholder="e.g. Nagpur (Civil Lines)"
              icon={<MapPin className="w-3.5 h-3.5" />}
              showError={shouldShowError("city")}
              error={errors.city}
              disabled={disabled}
              onChange={onChange}
              onBlur={onBlur}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              id="ridingExperience"
              name="ridingExperience"
              label="Riding Experience"
              value={formData.ridingExperience}
              placeholder="e.g. 3 years touring, highway runs"
              icon={<FileText className="w-3.5 h-3.5" />}
              showError={shouldShowError("ridingExperience")}
              error={errors.ridingExperience}
              disabled={disabled}
              onChange={onChange}
              onBlur={onBlur}
            />

            <TextInput
              id="instagram"
              name="instagram"
              label="Instagram Handle (Optional)"
              value={formData.instagram}
              placeholder="@username"
              icon={<AtSign className="w-3.5 h-3.5" />}
              showError={shouldShowError("instagram")}
              error={errors.instagram}
              disabled={disabled}
              onChange={onChange}
              onBlur={onBlur}
            />
          </div>
        </>
      )}

      {/* 6. COLLABORATION TYPE SELECTOR */}
      {enquiryType === "collaboration" && (
        <div className="space-y-1.5">
          <label
            htmlFor="collaborationType"
            className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center justify-between"
          >
            <span>
              Collaboration Format <span className="text-amber-500">*</span>
            </span>
          </label>
          <select
            id="collaborationType"
            name="collaborationType"
            value={formData.collaborationType}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className="w-full px-4 py-3 rounded-xl bg-zinc-950/90 border border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20 text-sm text-zinc-100 transition-all focus:outline-none focus:ring-2 disabled:opacity-50"
          >
            {COLLABORATION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-zinc-900 py-1">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 7. SUBJECT (for non-join types) */}
      {enquiryType !== "join" && (
        <TextInput
          id="subject"
          name="subject"
          label="Subject / Topic"
          required={enquiryType !== "collaboration"}
          value={formData.subject}
          placeholder="e.g. Weekend joint ride invitation"
          icon={<FileText className="w-3.5 h-3.5" />}
          showError={shouldShowError("subject")}
          error={errors.subject}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}

      {/* 8. MESSAGE TEXTAREA */}
      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="text-xs font-medium uppercase tracking-wider text-zinc-300 flex items-center justify-between"
        >
          <span className="flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
            Your Dispatch Message <span className="text-amber-500">*</span>
          </span>
          <span className="text-[10px] font-mono text-zinc-500">
            {formData.message.length} / 2000
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          value={formData.message}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={
            enquiryType === "join"
              ? "Tell us briefly about your motorcycle, touring aspirations, and when you'd like to join your first Sunday rollout..."
              : "Share the details of your inquiry, proposal, or road message..."
          }
          className={`w-full px-4 py-3 rounded-xl bg-zinc-950/90 border text-sm text-zinc-100 placeholder-zinc-600 transition-all focus:outline-none focus:ring-2 disabled:opacity-50 resize-y min-h-[110px] ${
            shouldShowError("message")
              ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/20"
              : "border-zinc-800 hover:border-zinc-700 focus:border-amber-500 focus:ring-amber-500/20"
          }`}
        />
        {shouldShowError("message") && errors.message && (
          <p className="text-xs text-red-400 flex items-center gap-1.5 pl-1 pt-0.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>
    </div>
  );
};
