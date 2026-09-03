"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Moon, Star, Cookie, CheckCircle } from "lucide-react";
import { useUIStore } from "@/store/ui";

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score === 1) return { score: 1, label: "Weak", color: "bg-red-500" };
  if (score === 2) return { score: 2, label: "Fair", color: "bg-yellow-500" };
  if (score === 3) return { score: 3, label: "Good", color: "bg-blue-500" };
  if (score === 4) return { score: 4, label: "Strong", color: "bg-green-500" };
  return { score: 0, label: "", color: "" };
}

export default function RegisterPage() {
  const router = useRouter();
  const { addToast } = useUIStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [watchedPassword, setWatchedPassword] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const passwordValue = watch("password", "");
  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      addToast({
        type: "success",
        message: "Account created! Welcome to Apex Moon 🍫",
      });
      router.push("/account");
    } catch {
      addToast({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side – Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-espresso-950 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-12 w-16 h-16 rounded-full bg-chocolate-800 opacity-30 animate-pulse" />
          <div className="absolute top-32 right-20 w-10 h-10 rounded-full bg-champagne opacity-20 animate-bounce" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-chocolate-700 opacity-25 animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-24 right-16 w-8 h-8 rounded-full bg-champagne opacity-15 animate-bounce" style={{ animationDelay: "1.5s" }} />
          <Cookie className="absolute top-20 right-1/3 text-chocolate-700 opacity-20 w-8 h-8 rotate-12" />
          <Cookie className="absolute bottom-32 left-1/3 text-champagne opacity-15 w-6 h-6 -rotate-12" />
          <Star className="absolute top-1/3 right-12 text-champagne opacity-25 w-5 h-5" />
          <Star className="absolute bottom-1/3 left-16 text-champagne opacity-20 w-4 h-4" />
        </div>

        <div className="relative z-10 text-center max-w-md">
          <div className="flex items-center justify-center mb-6">
            <Moon className="text-champagne w-10 h-10 mr-3" />
            <span className="font-playfair text-4xl font-bold text-ivory tracking-wide">
              Apex Moon
            </span>
          </div>
          <div className="w-24 h-px bg-champagne mx-auto mb-8 opacity-60" />
          <h2 className="font-playfair text-3xl text-ivory mb-4 leading-tight">
            Join Our
            <br />
            <span className="text-champagne">Chocolate Family</span>
          </h2>
          <p className="text-chocolate-300 text-lg leading-relaxed mb-10">
            Become a member and enjoy exclusive access to new flavours, special
            offers, and handcrafted gift collections.
          </p>

          {/* Benefits */}
          <div className="space-y-3 text-left">
            {[
              "Early access to seasonal collections",
              "Exclusive member discounts",
              "Free delivery on first order",
              "Birthday surprise every year",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-champagne flex-shrink-0" />
                <span className="text-chocolate-300 text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          <p className="text-chocolate-500 text-sm mt-10 italic">
            "Where every bite is a moment of pure bliss"
          </p>
        </div>
      </div>

      {/* Right Side – Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-ivory overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center mb-8">
            <Moon className="text-chocolate-800 w-7 h-7 mr-2" />
            <span className="font-playfair text-2xl font-bold text-espresso-950">
              Apex Moon
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            <div className="mb-8">
              <h1 className="font-playfair text-3xl font-bold text-espresso-950 mb-2">
                Create Account
              </h1>
              <p className="text-chocolate-500 text-sm">
                Join Apex Moon for exclusive chocolatey perks
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-espresso-950 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className={`input-luxury w-full ${errors.fullName ? "border-red-400" : ""}`}
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" },
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
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
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-espresso-950 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+94 77 123 4567"
                  className={`input-luxury w-full ${errors.phone ? "border-red-400" : ""}`}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+]?[\d\s\-()]{9,15}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-espresso-950 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={`input-luxury w-full pr-10 ${errors.password ? "border-red-400" : ""}`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 8, message: "Password must be at least 8 characters" },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-chocolate-400 hover:text-chocolate-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}

                {/* Strength Indicator */}
                {passwordValue && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            strength.score >= level ? strength.color : "bg-chocolate-100"
                          }`}
                        />
                      ))}
                    </div>
                    {strength.label && (
                      <p className="text-xs text-chocolate-500">
                        Strength:{" "}
                        <span
                          className={`font-semibold ${
                            strength.score === 4
                              ? "text-green-600"
                              : strength.score === 3
                              ? "text-blue-600"
                              : strength.score === 2
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {strength.label}
                        </span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-espresso-950 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className={`input-luxury w-full pr-10 ${errors.confirmPassword ? "border-red-400" : ""}`}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === passwordValue || "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-chocolate-400 hover:text-chocolate-700 transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Terms */}
              <div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    className="w-4 h-4 mt-0.5 rounded border-chocolate-300 accent-chocolate-700 cursor-pointer flex-shrink-0"
                    {...register("acceptTerms", {
                      required: "You must accept the terms to continue",
                    })}
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="text-sm text-chocolate-600 cursor-pointer leading-relaxed"
                  >
                    I agree to Apex Moon&apos;s{" "}
                    <Link href="/policies/terms" className="text-champagne hover:underline font-medium">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/policies/privacy" className="text-champagne hover:underline font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-red-500 text-xs mt-1">{errors.acceptTerms.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "CREATE ACCOUNT"
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-sm text-chocolate-500 mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-champagne font-semibold hover:text-chocolate-700 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
