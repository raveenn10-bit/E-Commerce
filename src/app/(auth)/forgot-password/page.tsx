"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Lock, Mail, ArrowLeft, Moon } from "lucide-react";
import { useUIStore } from "@/store/ui";

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const { addToast } = useUIStore();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [sentToEmail, setSentToEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({ defaultValues: { email: "" } });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSentToEmail(data.email);
      setEmailSent(true);
      addToast({
        type: "success",
        message: "Password reset link sent! Check your inbox.",
      });
    } catch {
      addToast({
        type: "error",
        message: "Failed to send reset link. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 mb-10 hover:opacity-80 transition-opacity"
      >
        <Moon className="text-chocolate-800 w-7 h-7" />
        <span className="font-playfair text-2xl font-bold text-espresso-950">
          Sweet Moon
        </span>
      </Link>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          {!emailSent ? (
            <>
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-chocolate-50 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-chocolate-700" />
                </div>
              </div>

              {/* Heading */}
              <div className="text-center mb-8">
                <h1 className="font-playfair text-3xl font-bold text-espresso-950 mb-2">
                  Reset Password
                </h1>
                <p className="text-chocolate-500 text-sm leading-relaxed">
                  Enter your email address and we&apos;ll send you a link to
                  reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-espresso-950 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={`input-luxury w-full ${errors.email ? "border-red-400" : ""}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "SEND RESET LINK"
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className="font-playfair text-2xl font-bold text-espresso-950 mb-3">
                  Check Your Email
                </h2>
                <p className="text-chocolate-500 text-sm leading-relaxed">
                  We&apos;ve sent a password reset link to
                </p>
                <p className="text-espresso-950 font-semibold text-sm mt-1 break-all">
                  {sentToEmail}
                </p>
              </div>

              <div className="bg-chocolate-50 rounded-xl p-4 mb-6">
                <p className="text-chocolate-700 text-xs leading-relaxed text-center">
                  Didn&apos;t receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setEmailSent(false)}
                    className="text-champagne font-semibold hover:underline"
                  >
                    try again
                  </button>{" "}
                  with a different email address.
                </p>
              </div>

              <div className="text-center text-xs text-chocolate-400">
                The link will expire in{" "}
                <span className="font-semibold text-chocolate-600">30 minutes</span>.
              </div>
            </>
          )}

          {/* Back to Login */}
          <div className="mt-8 pt-6 border-t border-chocolate-100">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-chocolate-500 hover:text-espresso-950 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </div>

        {/* Help text */}
        <p className="text-center text-xs text-chocolate-400 mt-6">
          Need help?{" "}
          <a
            href="mailto:hello@sweetmoon.lk"
            className="text-champagne hover:underline"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
