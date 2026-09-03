import Link from "next/link";
import { products, categories, formatPrice } from "@/lib/data";
import { Package, ShoppingBag, Users, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

export default function AdminDashboardPage() {
  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = totalProducts - inStockCount;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-espresso-950">
          Store Overview
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Real-time metrics and inventory health for Apex Moon Galle
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold">Total Revenue (MTD)</span>
            <DollarSign size={18} className="text-champagne" />
          </div>
          <p className="font-serif text-2xl font-bold text-espresso-950">Rs. 248,500</p>
          <span className="inline-flex items-center gap-1 text-[11px] text-green-600 font-semibold mt-1">
            <TrendingUp size={12} /> +18.4% vs last month
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold">Total Orders</span>
            <ShoppingBag size={18} className="text-champagne" />
          </div>
          <p className="font-serif text-2xl font-bold text-espresso-950">48</p>
          <span className="text-[11px] text-blue-600 font-semibold mt-1 block">
            6 Pending Dispatch
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold">Active Products</span>
            <Package size={18} className="text-champagne" />
          </div>
          <p className="font-serif text-2xl font-bold text-espresso-950">{totalProducts}</p>
          <span className="text-[11px] text-gray-500 mt-1 block">
            Across {categories.length} Categories
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold">Inventory Alert</span>
            <AlertTriangle size={18} className="text-amber-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-espresso-950">{outOfStockCount}</p>
          <span className="text-[11px] text-amber-600 font-semibold mt-1 block">
            Out of stock items
          </span>
        </div>
      </div>

      {/* Quick Tables */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-espresso-950">
              Recent Orders
            </h2>
            <Link href="/admin/orders" className="text-xs text-champagne font-semibold hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 border-b border-gray-100">
                <tr>
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Location</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr>
                  <td className="py-3 font-bold text-espresso-950">#SM-94821</td>
                  <td className="py-3">Kasun Silva</td>
                  <td className="py-3">Galle</td>
                  <td className="py-3 font-semibold">{formatPrice(6950)}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                      Processing
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-espresso-950">#SM-81204</td>
                  <td className="py-3">Dilini Perera</td>
                  <td className="py-3">Colombo</td>
                  <td className="py-3 font-semibold">{formatPrice(3450)}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-bold">
                      Delivered
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-espresso-950">#SM-70192</td>
                  <td className="py-3">Amal Wickrama</td>
                  <td className="py-3">Matara</td>
                  <td className="py-3 font-semibold">{formatPrice(8200)}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-bold">
                      Delivered
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="font-serif text-lg font-bold text-espresso-950">
            Top Selling Treats
          </h2>
          <div className="space-y-3">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center justify-between text-xs pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="truncate pr-2">
                  <p className="font-semibold text-espresso-950 truncate">{p.name}</p>
                  <p className="text-gray-400">{p.category}</p>
                </div>
                <span className="font-bold text-champagne shrink-0">
                  {formatPrice(p.price)}
                </span>
              </div>
            ))}
          </div>
          <Link href="/admin/products" className="btn-secondary w-full justify-center text-xs block text-center mt-2">
            Manage Products
          </Link>
        </div>
      </div>
    </div>
  );
}
