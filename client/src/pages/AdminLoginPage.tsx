/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { setCredentials } from "../store/slice/authSlice";
import { useAdminLoginMutation } from "../store/api/authApi";
import { Spinner } from "../components/shared";

const AdminLoginPage: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useAdminLoginMutation();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.password.trim()) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    try {
      const result = await login(form).unwrap();
      dispatch(setCredentials({ token: result.data.token }));
      navigate("/admin");
    } catch (err: any) {
      setErrors({
        submit: err?.data?.message || "Invalid credentials. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-lg">Q</span>
          </div>
          <h1 className="text-2xl font-bold text-brand-dark font-epilogue">
            Welcome back
          </h1>
          <p className="text-brand-gray text-sm mt-1">
            Sign in to your admin account
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-brand-lightgray p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                {errors.submit}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setErrors({ ...errors, email: "" });
                }}
                placeholder="admin@quickhire.com"
                className={`w-full border ${errors.email ? "border-red-400" : "border-brand-lightgray"} rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  setErrors({ ...errors, password: "" });
                }}
                placeholder="••••••••"
                className={`w-full border ${errors.password ? "border-red-400" : "border-brand-lightgray"} rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading && <Spinner size="sm" />}
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
