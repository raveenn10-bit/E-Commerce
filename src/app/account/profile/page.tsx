"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, User, MapPin, Save, Check } from "lucide-react";
import { useUIStore } from "@/store/ui";

export default function AccountProfilePage() {
  const { addToast } = useUIStore();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Kasun Silva",
    email: "customer@apexmoon.lk",
    phone: "077 456 7890",
    address: "No 45 Wakwella Road",
    city: "Galle",
    district: "Galle",
    postalCode: "80000",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    addToast({ type: "success", message: "Profile & delivery address updated!" });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-ivory min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/account"
          className="text-xs text-chocolate-500 hover:text-champagne inline-flex items-center gap-1 mb-4"
        >
          <ChevronLeft size={14} /> Back to Dashboard
        </Link>
        <h1 className="font-serif text-3xl font-bold text-espresso-950 mb-6">
          Profile &amp; Delivery Address
        </h1>

        <form onSubmit={handleSave} className="card-luxury p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="font-serif text-lg font-bold text-espresso-950 flex items-center gap-2">
              <User size={18} className="text-champagne" /> Personal Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-espresso-950 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="input-luxury"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-espresso-950 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={profile.email}
                  className="input-luxury bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-espresso-950 mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="input-luxury"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-chocolate-100 space-y-4">
            <h2 className="font-serif text-lg font-bold text-espresso-950 flex items-center gap-2">
              <MapPin size={18} className="text-champagne" /> Default Shipping Address
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-espresso-950 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="input-luxury"
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-espresso-950 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    className="input-luxury"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-espresso-950 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    value={profile.district}
                    onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                    className="input-luxury"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-espresso-950 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={profile.postalCode}
                    onChange={(e) => setProfile({ ...profile, postalCode: e.target.value })}
                    className="input-luxury"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-chocolate-100 flex items-center justify-between">
            <button
              type="submit"
              className="btn-primary inline-flex items-center gap-2 text-xs"
            >
              {saved ? <Check size={16} /> : <Save size={16} />}
              {saved ? "Saved Successfully" : "Save Changes"}
            </button>
            <Link href="/account" className="text-xs text-chocolate-500 hover:text-champagne">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
