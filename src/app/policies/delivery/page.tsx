export const metadata = {
  title: "Delivery Policy | Apex Moon Galle",
  description: "Shipping rates, delivery timeframes, and handling procedures across Sri Lanka.",
};

export default function DeliveryPolicyPage() {
  return (
    <div className="bg-ivory min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto card-luxury p-8 md:p-12 space-y-6 text-chocolate-800 text-sm leading-relaxed">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-espresso-950 mb-2">
          Delivery Policy
        </h1>
        <p className="text-xs text-chocolate-500">Fast, careful delivery across all 25 districts of Sri Lanka</p>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-espresso-950">1. Delivery Zones &amp; Timeframes</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Galle City &amp; Suburbs:</strong> Same-day or next-day delivery (within 24 hours).</li>
            <li><strong>Colombo &amp; Western Province:</strong> 1 to 2 business days.</li>
            <li><strong>Islandwide (All other districts):</strong> 2 to 4 business days via reliable courier partners.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-espresso-950">2. Delivery Charges</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Standard Islandwide Delivery:</strong> Flat rate of Rs. 350.</li>
            <li><strong>FREE Delivery:</strong> Available on all orders over Rs. 5,000!</li>
            <li><strong>Express 24-48h Delivery:</strong> Rs. 650.</li>
            <li><strong>Store Pickup (Galle):</strong> Always 100% FREE at No 01 Main Street.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-espresso-950">3. Protective Packaging</h2>
          <p>
            Chocolates and perishable confectionery are packed using protective thermal insulation and shock-absorbent cushioning to protect against heat and handling during transit.
          </p>
        </section>
      </div>
    </div>
  );
}
