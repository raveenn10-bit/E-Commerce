import { Truck, ShieldCheck, Lock, Headphones } from "lucide-react";

const trustItems = [
  {
    icon: Truck,
    title: "Fast Delivery",
    subtitle: "Islandwide Delivery",
  },
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    subtitle: "100% Original Products",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    subtitle: "Safe & Secure Checkout",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    subtitle: "We Are Always Here",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-center text-center gap-2 group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FAF6EF] group-hover:bg-[#C9A84C]/10 transition-colors duration-200">
                  <Icon
                    size={22}
                    className="text-[#C9A84C]"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <p
                    className="font-semibold text-[#1a0a00] text-sm leading-tight"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-gray-500 text-xs mt-0.5"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}