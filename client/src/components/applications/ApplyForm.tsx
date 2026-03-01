/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Spinner } from "../shared";
import { useCreateApplicationMutation } from "../../store/api/applicationApi";

interface ApplyFormProps {
  jobId: string;
  jobTitle: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ApplyForm: React.FC<ApplyFormProps> = ({
  jobId,
  jobTitle,
  onSuccess,
  onCancel,
}) => {
  const [form, setForm] = useState({
    applicantName: "",
    applicantEmail: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const [createApplication, { isLoading }] = useCreateApplicationMutation();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.applicantName.trim())
      newErrors.applicantName = "Name is required";
    if (!form.applicantEmail.trim())
      newErrors.applicantEmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.applicantEmail))
      newErrors.applicantEmail = "Invalid email format";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("applicantName", form.applicantName);
    formData.append("applicantEmail", form.applicantEmail);
    if (form.coverLetter) formData.append("coverLetter", form.coverLetter);
    if (resumeFile) formData.append("resume", resumeFile);

    try {
      await createApplication(formData).unwrap();
      setSubmitted(true);
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } catch (err: any) {
      setErrors({
        submit:
          err?.data?.message ||
          "Failed to submit application. Please try again.",
      });
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✓</span>
        </div>
        <h3 className="text-lg font-bold text-brand-dark mb-2">
          Application Submitted!
        </h3>
        <p className="text-brand-gray text-sm">
          We'll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-brand-gray text-sm">
        Applying for:{" "}
        <span className="font-semibold text-brand-dark">{jobTitle}</span>
      </p>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
          {errors.submit}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.applicantName}
          onChange={(e) => {
            setForm({ ...form, applicantName: e.target.value });
            setErrors({ ...errors, applicantName: "" });
          }}
          placeholder="John Doe"
          className={`w-full border ${errors.applicantName ? "border-red-400" : "border-brand-lightgray"} rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors`}
        />
        {errors.applicantName && (
          <p className="text-red-500 text-xs mt-1">{errors.applicantName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={form.applicantEmail}
          onChange={(e) => {
            setForm({ ...form, applicantEmail: e.target.value });
            setErrors({ ...errors, applicantEmail: "" });
          }}
          placeholder="john@example.com"
          className={`w-full border ${errors.applicantEmail ? "border-red-400" : "border-brand-lightgray"} rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors`}
        />
        {errors.applicantEmail && (
          <p className="text-red-500 text-xs mt-1">{errors.applicantEmail}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1.5">
          Resume (PDF/DOC)
        </label>
        <div className="border border-dashed border-brand-lightgray rounded-lg px-4 py-4 text-center hover:border-primary transition-colors">
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          <label htmlFor="resume" className="cursor-pointer">
            {resumeFile ? (
              <div className="flex items-center justify-center gap-2">
                <span className="text-emerald-500">✓</span>
                <span className="text-sm text-brand-dark font-medium">
                  {resumeFile.name}
                </span>
              </div>
            ) : (
              <>
                <p className="text-brand-gray text-sm">
                  Click to upload or drag & drop
                </p>
                <p className="text-brand-gray text-xs mt-1">
                  PDF, DOC up to 10MB
                </p>
              </>
            )}
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1.5">
          Cover Letter
        </label>
        <textarea
          value={form.coverLetter}
          onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
          placeholder="Tell us why you're a great fit for this role..."
          rows={4}
          className="w-full border border-brand-lightgray rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors resize-none"
        />
      </div>

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-brand-lightgray text-brand-dark py-3 rounded-lg text-sm font-semibold hover:border-primary transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-primary text-white py-3 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isLoading && <Spinner size="sm" />}
          Submit Application
        </button>
      </div>
    </form>
  );
};

export default ApplyForm;
