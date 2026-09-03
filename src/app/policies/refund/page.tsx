export const metadata = {
  title: "Refund & Returns Policy | Apex Moon Galle",
  description: "Hassle-free replacement and refund policy for Apex Moon customers.",
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-ivory min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto card-luxury p-8 md:p-12 space-y-6 text-chocolate-800 text-sm leading-relaxed">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-espresso-950 mb-2">
          Refund &amp; Replacement Policy
        </h1>
        <p className="text-xs text-chocolate-500">Your satisfaction is our sweet guarantee</p>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-espresso-950">1. Damaged or Incorrect Items</h2>
          <p>
            We take pride in exceptional quality packaging. If an item arrives damaged or incorrect, please take a quick photo and message us on WhatsApp (077 066 3154) within 48 hours of receiving the parcel. We will arrange a replacement or full refund immediately.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-espresso-950">2. Refund Processing</h2>
          <p>
            Approved refunds are credited directly to your bank account within 2-3 business days, or provided as instant store credit vouchers for your next purchase.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-espresso-950">3. Non-Returnable Items</h2>
          <p>
            Due to food safety and health standards, opened edible products or customized food items cannot be returned unless verified as defective or compromised upon delivery.
          </p>
        </section>
      </div>
    </div>
  );
}
