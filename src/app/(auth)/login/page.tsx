"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Moon, Star, Cookie } from "lucide-react";
import { useUIStore } from "@/store/ui";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const { addToast } = useUIStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (data.email && data.password) {
        addToast({
          type: "success",
          message: "Welcome back! You've been signed in successfully.",
        });
        router.push("/account");
      }
    } catch {
      addToast({
        type: "error",
        message: "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    addToast({
      type: "info",
      message: "Google sign-in coming soon!",
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side – Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-espresso-950 relative overflow-hidden flex-col items-center justify-center p-12">
        {/* Decorative floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-12 w-16 h-16 rounded-full bg-chocolate-800 opacity-30 animate-pulse" />
          <div className="absolute top-32 right-20 w-10 h-10 rounded-full bg-champagne opacity-20 animate-bounce" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-chocolate-700 opacity-25 animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-24 right-16 w-8 h-8 rounded-full bg-champagne opacity-15 animate-bounce" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-8 w-6 h-6 rounded-full bg-chocolate-600 opacity-20 animate-pulse" style={{ animationDelay: "0.8s" }} />
          <Cookie className="absolute top-20 right-1/3 text-chocolate-700 opacity-20 w-8 h-8 rotate-12" />
          <Cookie className="absolute bottom-32 left-1/3 text-champagne opacity-15 w-6 h-6 -rotate-12" />
          <Star className="absolute top-1/3 right-12 text-champagne opacity-25 w-5 h-5" />
          <Star className="absolute bottom-1/3 left-16 text-champagne opacity-20 w-4 h-4" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-md">
          <div className="flex items-center justify-center mb-6">
            <Moon className="text-champagne w-10 h-10 mr-3" />
            <span className="font-playfair text-4xl font-bold text-ivory tracking-wide">
              Sweet Moon
            </span>
          </div>

          <div className="w-24 h-px bg-champagne mx-auto mb-8 opacity-60" />

          <h2 className="font-playfair text-3xl text-ivory mb-4 leading-tight">
            Artisan Chocolates
            <br />
            <span className="text-champagne">Crafted with Love</span>
          </h2>

          <p className="text-chocolate-300 text-lg leading-relaxed mb-10">
            Every piece tells a story of passion, tradition, and the finest
            ingredients from around the world.
          </p>

          {/* Decorative chocolate squares */}
          <div className="flex justify-center gap-3">
            {["Dark", "Milk", "White", "Ruby"].map((type) => (
              <div
                key={type}
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    type === "Dark"
                      ? "#3b1a0a"
                      : type === "Milk"
                      ? "#8B4513"
                      : type === "White"
                      ? "#f5e6d3"
                      : "#d4808a",
                }}
              >
                <span className="text-xs font-semibold text-ivory opacity-80">
                  {type[0]}
                </span>
              </div>
            ))}
          </div>

          <p className="text-chocolate-500 text-sm mt-10 italic">
            "Where every bite is a moment of pure bliss"
          </p>
        </div>
      </div>

      {/* Right Side – Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-ivory">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center mb-8">
            <Moon className="text-chocolate-800 w-7 h-7 mr-2" />
            <span className="font-playfair text-2xl font-bold text-espresso-950">
              Sweet Moon
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
            <div className="mb-8">
              <h1 className="font-playfair text-3xl font-bold text-espresso-950 mb-2">
                Welcome Back
              </h1>
              <p className="text-chocolate-500 text-sm">
                Sign in to your Sweet Moon account
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
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

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-espresso-950">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-champagne hover:text-chocolate-700 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`input-luxury w-full pr-10 ${errors.password ? "border-red-400" : ""}`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
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
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="w-4 h-4 rounded border-chocolate-300 text-champagne accent-chocolate-700 cursor-pointer"
                  {...register("rememberMe")}
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm text-chocolate-600 cursor-pointer"
                >
                  Remember me for 30 days
                </label>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "SIGN IN"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-chocolate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-chocolate-400 font-medium tracking-wider">
                  or
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-chocolate-200 rounded-lg text-espresso-950 font-semibold text-sm hover:bg-chocolate-50 hover:border-chocolate-400 transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-chocolate-500 mt-6">
              New customer?{" "}
              <Link
                href="/register"
                className="text-champagne font-semibold hover:text-chocolate-700 transition-colors"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
