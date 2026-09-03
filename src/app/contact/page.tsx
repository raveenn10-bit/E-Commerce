"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, Mail, Send, CheckCircle2 } from "lucide-react";
import { useUIStore } from "@/store/ui";

export default function ContactPage() {
  const { addToast } = useUIStore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      addToast({ type: "error", message: "Please fill in all required fields." });
      return;
    }
    setSubmitted(true);
    addToast({ type: "success", message: "Message sent! We will contact you shortly." });
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <section className="bg-espresso-950 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-champagne uppercase text-xs font-semibold tracking-[0.25em] mb-2">
            Get In Touch
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Sweet Moon
          </h1>
          <p className="text-chocolate-200 text-sm md:text-base max-w-xl mx-auto">
            Have questions about customized gift boxes, imported treats, or bulk orders? We are here to help!
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Contact Details Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-luxury p-8 space-y-6">
              <h2 className="font-serif text-2xl font-bold text-espresso-950">
                Store Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-champagne/10 text-champagne flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-espresso-950">Address</h3>
                    <p className="text-xs text-chocolate-700 mt-0.5">
                      No 01 Main Street (New Street), Galle 80000, Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-champagne/10 text-champagne flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-espresso-950">Phone &amp; WhatsApp</h3>
                    <p className="text-xs text-chocolate-700 mt-0.5">076 608 9763 / 077 690 3192</p>
                    <a
                      href="https://wa.me/94766089763"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-green-600 font-semibold hover:underline block mt-0.5"
                    >
                      Chat on WhatsApp &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-champagne/10 text-champagne flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-espresso-950">Hours</h3>
                    <p className="text-xs text-chocolate-700 mt-0.5">Walk-in: 9:00 AM – 9:00 PM Daily</p>
                    <p className="text-xs text-chocolate-700">Online Deliveries: Always Open</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-champagne/10 text-champagne flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-espresso-950">Email</h3>
                    <p className="text-xs text-chocolate-700 mt-0.5">orders@sweetmoon.lk</p>
                  </div>
                </div>
              </div>

              {/* Direct Maps Link */}
              <div className="pt-4 border-t border-chocolate-100">
                <a
                  href="https://maps.app.goo.gl/4B88hA2pTpSAjBwX9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full justify-center text-center"
                >
                  <MapPin size={16} /> Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Form Right Column */}
          <div className="lg:col-span-7">
            <div className="card-luxury p-8 md:p-10">
              <h2 className="font-serif text-2xl font-bold text-espresso-950 mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs text-chocolate-600 mb-6">
                Fill out the form below and we will get back to you within 1-2 hours.
              </p>

              {submitted ? (
                <div className="p-8 bg-green-50 rounded-2xl border border-green-200 text-center space-y-3 animate-fade-in">
                  <CheckCircle2 size={48} className="text-green-500 mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-green-900">
                    Thank You!
                  </h3>
                  <p className="text-sm text-green-800 max-w-md mx-auto">
                    Your inquiry has been received. Our team in Galle will connect with you via WhatsApp or phone promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
                    }}
                    className="btn-dark mt-4"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-espresso-950 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-luxury"
                        placeholder="e.g. Kasun Silva"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-espresso-950 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input-luxury"
                        placeholder="e.g. 077 123 4567"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-espresso-950 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-luxury"
                        placeholder="name@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-espresso-950 mb-1">
                        Inquiry Type
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="input-luxury"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Custom Gift Box">Custom Gift Box Consultation</option>
                        <option value="Bulk / Corporate Orders">Bulk / Corporate Orders</option>
                        <option value="Delivery Status">Delivery Status Check</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-espresso-950 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-luxury resize-none"
                      placeholder="Tell us what you are looking for..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
