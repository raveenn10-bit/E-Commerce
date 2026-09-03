import Link from "next/link";
import { ChevronLeft, Package, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/data";

const mockOrders = [
  {
    id: "SM-94821",
    date: "September 2, 2026",
    status: "Processing",
    statusColor: "bg-blue-100 text-blue-800",
    total: 6950,
    items: "Ferrero Rocher T24 Box x 1",
  },
  {
    id: "SM-81204",
    date: "August 18, 2026",
    status: "Delivered",
    statusColor: "bg-green-100 text-green-800",
    total: 3450,
    items: "Lindt Lindor Milk Truffles x 1",
  },
  {
    id: "SM-70192",
    date: "July 29, 2026",
    status: "Delivered",
    statusColor: "bg-green-100 text-green-800",
    total: 8200,
    items: "Custom Luxury Gift Box x 1",
  },
];

export const metadata = {
  title: "My Orders | Sweet Moon Galle",
  description: "View and track all your Sweet Moon orders and delivery status.",
};

export default function OrdersHistoryPage() {
  return (
    <div className="bg-ivory min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link
              href="/account"
              className="text-xs text-chocolate-500 hover:text-champagne inline-flex items-center gap-1 mb-2"
            >
              <ChevronLeft size={14} /> Back to Dashboard
            </Link>
            <h1 className="font-serif text-3xl font-bold text-espresso-950">
              My Orders
            </h1>
          </div>
          <Link href="/shop" className="btn-primary text-xs">
            New Order
          </Link>
        </div>

        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="card-luxury p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-espresso-950">
                    Order #{order.id}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${order.statusColor}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-chocolate-500">{order.date}</p>
                <p className="text-xs text-chocolate-800 font-medium pt-1">
                  {order.items}
                </p>
              </div>

              <div className="flex items-center justify-between w-full md:w-auto md:gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-chocolate-100">
                <div className="text-left md:text-right">
                  <p className="text-[11px] text-chocolate-400 uppercase">Total</p>
                  <p className="font-serif font-bold text-lg text-espresso-950">
                    {formatPrice(order.total)}
                  </p>
                </div>
                <Link
                  href={`/account/orders/${order.id}`}
                  className="btn-secondary text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
