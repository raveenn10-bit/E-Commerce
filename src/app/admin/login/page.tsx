"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "sweetmoon2024") {
      localStorage.setItem("sweetmoon_admin_auth", "true");
      router.push("/admin");
    } else {
      setError("Incorrect admin credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-espresso-950 flex items-center justify-center p-4">
      <div className="card-luxury p-8 max-w-sm w-full space-y-6 text-center">
        <div className="w-14 h-14 rounded-full bg-champagne/20 text-champagne flex items-center justify-center mx-auto">
          <Lock size={26} />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-espresso-950">
            Admin Access
          </h1>
          <p className="text-xs text-chocolate-600 mt-1">
            Sweet Moon Galle Management System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-espresso-950 mb-1">
              Admin Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter password"
              className="input-luxury"
            />
            {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
          </div>

          <button type="submit" className="btn-primary w-full justify-center text-xs">
            Sign In to Dashboard <ArrowRight size={14} />
          </button>
        </form>

        <p className="text-[11px] text-chocolate-400">
          Authorized personnel only &bull; Sweet Moon Galle
        </p>
      </div>
    </div>
  );
}
