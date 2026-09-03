"use client";
import { useState } from "react";
import { useUIStore } from "@/store/ui";
import { Mail, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useUIStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      addToast({ type: "success", message: "You're subscribed! Expect sweet deals soon 🍫" });
    }, 1000);
  };

  return (
    <section className="bg-espresso-950 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-8 h-px bg-champagne" />
          <Mail size={16} className="text-champagne" />
          <span className="w-8 h-px bg-champagne" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-champagne mb-3">
          Sweet Deals Delivered To You
        </h2>
        <p className="text-chocolate-300 mb-8 max-w-md mx-auto leading-relaxed">
          Subscribe for new arrivals, exclusive offers and special gift ideas straight to your inbox.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-4 animate-fade-in">
            <CheckCircle size={48} className="text-green-400" />
            <p className="text-white font-semibold text-lg">You&apos;re subscribed!</p>
            <p className="text-chocolate-300 text-sm">Get ready for exclusive Apex Moon offers 🎉</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-espresso-900 border border-chocolate-700 text-white placeholder:text-chocolate-500 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-champagne transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary whitespace-nowrap disabled:opacity-70"
            >
              {loading ? "Subscribing..." : "SUBSCRIBE"}
            </button>
          </form>
        )}
        <p className="text-chocolate-600 text-xs mt-4">
          No spam ever. Unsubscribe anytime. 🍫
        </p>
      </div>
    </section>
  );
}
