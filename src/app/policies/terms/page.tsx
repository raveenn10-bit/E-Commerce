export const metadata = {
  title: "Terms & Conditions | Apex Moon Galle",
  description: "Terms and conditions of purchase and service for Apex Moon.",
};

export default function TermsPage() {
  return (
    <div className="bg-ivory min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto card-luxury p-8 md:p-12 space-y-6 text-chocolate-800 text-sm leading-relaxed">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-espresso-950 mb-2">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-chocolate-500">Last updated: September 2026</p>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-espresso-950">1. Agreement to Terms</h2>
          <p>
            By accessing or ordering through Apex Moon (online or in-store), you agree to be bound by these terms. We offer genuine imported food items, confectionery, and customized gifting services subject to availability.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-espresso-950">2. Pricing &amp; Orders</h2>
          <p>
            All prices are listed in Sri Lankan Rupees (LKR / Rs.). We reserve the right to modify prices based on import currency fluctuations or supplier changes. In the rare event of out-of-stock items, we will notify you before dispatch to offer equivalent premium substitutes or order adjustments.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-espresso-950">3. Custom Gift Boxes</h2>
          <p>
            Custom hampers and gift boxes are handcrafted upon order confirmation. Personalized greeting cards and ribbon selections are final once dispatched. Please ensure accurate spelling and delivery contact details.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-espresso-950">4. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of Sri Lanka.
          </p>
        </section>
      </div>
    </div>
  );
}
