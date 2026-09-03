export const metadata = {
  title: "Privacy Policy | Sweet Moon Galle",
  description: "Sweet Moon customer data protection and privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ivory min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto card-luxury p-8 md:p-12 space-y-6 text-chocolate-800 text-sm leading-relaxed">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-espresso-950 mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-chocolate-500">Last updated: September 2026</p>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-espresso-950">1. Information We Collect</h2>
          <p>
            When you purchase from Sweet Moon or communicate with us through WhatsApp or website checkout, we collect necessary customer details including your name, contact phone number, WhatsApp number, email address, and shipping address.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-espresso-950">2. How We Use Your Information</h2>
          <p>
            Your information is strictly used to fulfill and dispatch your orders, provide WhatsApp delivery status updates, create personalized gift card messages, and offer customer assistance. We never sell, rent, or trade your personal data to third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-espresso-950">3. Payment Information Security</h2>
          <p>
            For Cash on Delivery, your payment is settled upon delivery. For bank transfers, transaction slips are processed directly via verified banking channels. We do not store sensitive credit card or banking credentials on our servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-espresso-950">4. Contact &amp; Inquiries</h2>
          <p>
            If you have questions about your data or wish to update your details, please reach out to us at orders@sweetmoon.lk or visit our store at No 01 Main Street, Galle.
          </p>
        </section>
      </div>
    </div>
  );
}
