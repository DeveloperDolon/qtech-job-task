import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Spinner } from "../shared";
import { useCreateApplicationMutation } from "../../store/api/applicationApi";
import type { Application } from "../../types";

interface ApplyFormProps {
  jobId: string;
  jobTitle: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormState {
  applicantName: string;
  applicantEmail: string;
  coverLetter: string;
  resumeLink: string;
}

const ApplyForm: React.FC<ApplyFormProps> = ({
  jobId,
  jobTitle,
  onSuccess,
  onCancel,
}) => {
  const [form, setForm] = useState<FormState>({
    applicantName: "",
    applicantEmail: "",
    coverLetter: "",
    resumeLink: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const [createApplication, { isLoading }] = useCreateApplicationMutation();

  // Helper to validate URLs
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.applicantName.trim()) newErrors.applicantName = "Full name is required";
    
    if (!form.applicantEmail.trim()) {
      newErrors.applicantEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.applicantEmail)) {
      newErrors.applicantEmail = "Please enter a valid email address";
    }

    if (!form.resumeLink.trim()) {
      newErrors.resumeLink = "Resume link is required";
    } else if (!isValidUrl(form.resumeLink)) {
      newErrors.resumeLink = "Please enter a valid URL (e.g., https://...)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    // Note: Use JSON if your backend doesn't specifically require Multipart/FormData 
    // for simple text strings. If it does, keep FormData.
    const payload: Application = {
      jobId,
      ...form,
    };

    try {
      await createApplication(payload).unwrap();
      setSubmitted(true);
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrors({
        submit: err?.data?.message || "Connection error. Please try again later.",
      });
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10 animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-emerald-600 text-3xl">✓</span>
        </div>
        <h3 className="text-xl font-bold text-brand-dark mb-2">Application Sent!</h3>
        <p className="text-brand-gray text-sm">
          Your application for <span className="font-medium">{jobTitle}</span> has been received.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-sm font-semibold text-brand-gray uppercase tracking-wider">Applying for</h2>
        <p className="text-lg font-bold text-brand-dark">{jobTitle}</p>
      </div>

      {errors.submit && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 text-sm px-4 py-3 rounded shadow-sm">
          {errors.submit}
        </div>
      )}

      <div className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="applicantName" className="block text-sm font-semibold text-brand-dark mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="applicantName"
            name="applicantName"
            type="text"
            value={form.applicantName}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full border ${errors.applicantName ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"} rounded-lg px-4 py-2.5 outline-none focus:border-primary transition-all`}
          />
          {errors.applicantName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.applicantName}</p>}
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="applicantEmail" className="block text-sm font-semibold text-brand-dark mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="applicantEmail"
            name="applicantEmail"
            type="email"
            value={form.applicantEmail}
            onChange={handleChange}
            placeholder="john@example.com"
            className={`w-full border ${errors.applicantEmail ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"} rounded-lg px-4 py-2.5 outline-none focus:border-primary transition-all`}
          />
          {errors.applicantEmail && <p className="text-red-500 text-xs mt-1 font-medium">{errors.applicantEmail}</p>}
        </div>

        {/* Resume Link Input - Improved UX */}
        <div>
          <label htmlFor="resumeLink" className="block text-sm font-semibold text-brand-dark mb-1">
            Resume Link (Google Drive / Dropbox / Portfolio) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="resumeLink"
              name="resumeLink"
              type="url"
              value={form.resumeLink}
              onChange={handleChange}
              placeholder="https://drive.google.com/..."
              className={`w-full border ${errors.resumeLink ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"} rounded-lg px-4 py-2.5 outline-none focus:border-primary transition-all`}
            />
          </div>
          <p className="text-gray-400 text-[11px] mt-1">Make sure the link is public or viewable by anyone with the link.</p>
          {errors.resumeLink && <p className="text-red-500 text-xs mt-1 font-medium">{errors.resumeLink}</p>}
        </div>

        {/* Cover Letter */}
        <div>
          <label htmlFor="coverLetter" className="block text-sm font-semibold text-brand-dark mb-1">
            Cover Letter
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            value={form.coverLetter}
            onChange={handleChange}
            placeholder="Briefly describe your experience..."
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-all resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 border border-gray-300 text-brand-dark py-3 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-primary text-white py-3 rounded-lg text-sm font-bold hover:bg-primary-dark transition-all shadow-md active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isLoading ? <Spinner size="sm" /> : "Submit Application"}
        </button>
      </div>
    </form>
  );
};

export default ApplyForm;
