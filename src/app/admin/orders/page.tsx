"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/data";
import { ShoppingBag, CheckCircle, Clock, Truck, Eye } from "lucide-react";
import { useUIStore } from "@/store/ui";

const initialOrders = [
  {
    id: "SM-94821",
    customer: "Kasun Silva",
    phone: "077 456 7890",
    city: "Galle",
    items: "Ferrero Rocher T24 (x1)",
    total: 6950,
    payment: "Cash on Delivery",
    status: "Processing",
    date: "Sep 2, 2026",
  },
  {
    id: "SM-81204",
    customer: "Dilini Perera",
    phone: "071 234 5678",
    city: "Colombo",
    items: "Lindt Lindor Milk Truffles (x1)",
    total: 3450,
    payment: "Bank Transfer",
    status: "Delivered",
    date: "Aug 18, 2026",
  },
  {
    id: "SM-70192",
    customer: "Amal Wickrama",
    phone: "076 998 8776",
    city: "Matara",
    items: "Custom Luxury Gift Box (x1)",
    total: 8200,
    payment: "Cash on Delivery",
    status: "Delivered",
    date: "Jul 29, 2026",
  },
];

export default function AdminOrdersPage() {
  const { addToast } = useUIStore();
  const [orders, setOrders] = useState(initialOrders);

  const updateStatus = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    addToast({ type: "success", message: `Order #${id} updated to ${newStatus}` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-espresso-950">
          Customer Orders
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Review placed orders, update delivery status, and coordinate dispatch
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold">Order</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Items</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold">Payment</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-espresso-950">#{order.id}</p>
                    <p className="text-[10px] text-gray-400">{order.date}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-espresso-950">{order.customer}</p>
                    <p className="text-[10px] text-gray-400">{order.phone} &bull; {order.city}</p>
                  </td>
                  <td className="p-4 font-medium text-gray-600">{order.items}</td>
                  <td className="p-4 font-bold text-espresso-950">
                    {formatPrice(order.total)}
                  </td>
                  <td className="p-4">{order.payment}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="text-[11px] border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-champagne"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
