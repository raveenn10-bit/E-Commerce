"use client";

import { useState } from "react";
import Image from "next/image";
import { products, formatPrice, Product } from "@/lib/data";
import { Search, Plus, Trash2, Edit, CheckCircle, XCircle } from "lucide-react";
import { useUIStore } from "@/store/ui";

export default function AdminProductsPage() {
  const { addToast } = useUIStore();
  const [productList, setProductList] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = productList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStock = (id: string) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
    addToast({ type: "info", message: "Stock status toggled" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-espresso-950">
            Products Inventory
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your catalog, stock availability, and prices
          </p>
        </div>
        <button
          onClick={() => addToast({ type: "info", message: "New product creator opened" })}
          className="btn-primary text-xs flex items-center gap-2"
        >
          <Plus size={16} /> Add New Product
        </button>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-3">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by product name, category, or brand..."
          className="w-full text-xs focus:outline-none bg-transparent"
        />
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold">Product</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Stock Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-espresso-950">{product.name}</p>
                      <p className="text-[10px] text-gray-400">{product.brand}</p>
                    </div>
                  </td>
                  <td className="p-4 font-medium">{product.category}</td>
                  <td className="p-4 font-bold text-espresso-950">
                    {formatPrice(product.price)}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStock(product.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                        product.inStock
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {product.inStock ? (
                        <>
                          <CheckCircle size={12} /> In Stock
                        </>
                      ) : (
                        <>
                          <XCircle size={12} /> Out of Stock
                        </>
                      )}
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => addToast({ type: "info", message: `Editing ${product.name}` })}
                      className="p-1.5 text-gray-500 hover:text-champagne hover:bg-gray-100 rounded-lg"
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => {
                        setProductList((prev) => prev.filter((p) => p.id !== product.id));
                        addToast({ type: "warning", message: `${product.name} removed` });
                      }}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
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
