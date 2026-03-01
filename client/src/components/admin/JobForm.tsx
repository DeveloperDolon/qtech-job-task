/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { categoryOptions, jobTypeOptions } from "../../utils/helper";
import { Spinner } from "../shared";
import { useCreateJobMutation } from "../../store/api/jobApi";

interface JobFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "FULL_TIME" as string,
    tags: "" as string,
    vacancy: "1",
    workingTime: "",
    category: "SOFTWARE_DEVELOPMENT" as string,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [createJob, { isLoading }] = useCreateJobMutation();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.company.trim()) errs.company = "Company is required";
    if (!form.location.trim()) errs.location = "Location is required";
    if (!form.salary || isNaN(Number(form.salary)) || Number(form.salary) <= 0) errs.salary = "Valid salary is required";
    if (!form.workingTime.trim()) errs.workingTime = "Working time is required";
    if (!form.tags.trim()) errs.tags = "At least one tag is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "tags") {
        const tagArr = value.split(",").map((t) => t.trim()).filter(Boolean);
        tagArr.forEach((tag) => formData.append("tags[]", tag));
      } else if (key === "salary") {
        formData.append(key, String(Number(value)));
      } else if (key === "vacancy") {
        formData.append(key, String(Number(value)));
      } else {
        formData.append(key, value);
      }
    });
    if (logoFile) formData.append("logo", logoFile);

    try {
      await createJob(formData).unwrap();
      onSuccess?.();
    } catch (err: any) {
      setErrors({ submit: err?.data?.message || "Failed to create job. Please try again." });
    }
  };

  const inputClass = (field: string) =>
    `w-full border ${errors[field] ? "border-red-400" : "border-brand-lightgray"} rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors bg-white`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
          {errors.submit}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1.5">Job Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => { setForm({ ...form, title: e.target.value }); setErrors({ ...errors, title: "" }); }}
            placeholder="e.g. Senior Frontend Developer"
            className={inputClass("title")}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1.5">Company *</label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => { setForm({ ...form, company: e.target.value }); setErrors({ ...errors, company: "" }); }}
            placeholder="Company name"
            className={inputClass("company")}
          />
          {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-brand-dark mb-1.5">Description *</label>
        <textarea
          value={form.description}
          onChange={(e) => { setForm({ ...form, description: e.target.value }); setErrors({ ...errors, description: "" }); }}
          placeholder="Job description..."
          rows={4}
          className={`${inputClass("description")} resize-none`}
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1.5">Location *</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => { setForm({ ...form, location: e.target.value }); setErrors({ ...errors, location: "" }); }}
            placeholder="e.g. New York, USA"
            className={inputClass("location")}
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1.5">Annual Salary ($) *</label>
          <input
            type="number"
            value={form.salary}
            onChange={(e) => { setForm({ ...form, salary: e.target.value }); setErrors({ ...errors, salary: "" }); }}
            placeholder="e.g. 80000"
            className={inputClass("salary")}
          />
          {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1.5">Job Type *</label>
          <select
            value={form.jobType}
            onChange={(e) => setForm({ ...form, jobType: e.target.value })}
            className={inputClass("jobType")}
          >
            {jobTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1.5">Category *</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={inputClass("category")}
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1.5">Vacancy *</label>
          <input
            type="number"
            value={form.vacancy}
            min={1}
            onChange={(e) => setForm({ ...form, vacancy: e.target.value })}
            className={inputClass("vacancy")}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1.5">Working Time *</label>
          <input
            type="text"
            value={form.workingTime}
            onChange={(e) => { setForm({ ...form, workingTime: e.target.value }); setErrors({ ...errors, workingTime: "" }); }}
            placeholder="e.g. 9 AM - 5 PM"
            className={inputClass("workingTime")}
          />
          {errors.workingTime && <p className="text-red-500 text-xs mt-1">{errors.workingTime}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-brand-dark mb-1.5">Tags (comma-separated) *</label>
        <input
          type="text"
          value={form.tags}
          onChange={(e) => { setForm({ ...form, tags: e.target.value }); setErrors({ ...errors, tags: "" }); }}
          placeholder="e.g. React, TypeScript, Remote"
          className={inputClass("tags")}
        />
        {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium text-brand-dark mb-1.5">Company Logo</label>
        <div className="border border-dashed border-brand-lightgray rounded-lg px-4 py-3 hover:border-primary transition-colors">
          <input
            type="file"
            id="logo"
            accept="image/*"
            onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          <label htmlFor="logo" className="cursor-pointer flex items-center gap-3">
            {logoFile ? (
              <>
                <img src={URL.createObjectURL(logoFile)} alt="preview" className="w-10 h-10 rounded object-cover" />
                <span className="text-sm text-brand-dark">{logoFile.name}</span>
              </>
            ) : (
              <span className="text-sm text-brand-gray">Click to upload company logo</span>
            )}
          </label>
        </div>
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
          Post Job
        </button>
      </div>
    </form>
  );
};

export default JobForm;
