"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Store,
  LogOut,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if on login page
    if (pathname === "/admin/login") {
      setIsAuthenticated(true);
      return;
    }
    const auth = localStorage.getItem("sweetmoon_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/admin/login");
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-espresso-950 flex items-center justify-center text-champagne">
        Verifying admin authorization...
      </div>
    );
  }

  const navLinks = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  ];

  const handleLogout = () => {
    localStorage.removeItem("sweetmoon_admin_auth");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-espresso-950 text-white shrink-0 p-5 flex flex-col justify-between">
        <div>
          {/* Brand */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="relative w-9 h-9 rounded-full overflow-hidden shadow-luxury bg-white shrink-0">
              <Image
                src="/logo.png"
                alt="Sweet Moon Admin"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                Sweet Moon
              </span>
              <span className="block text-[10px] text-champagne uppercase tracking-widest">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-champagne text-espresso-950 shadow-sm"
                      : "text-chocolate-200 hover:bg-espresso-900 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-chocolate-800/60 space-y-2 mt-6">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-chocolate-300 hover:text-champagne transition-colors"
          >
            <Store size={15} /> View Storefront &rarr;
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-red-400 hover:text-red-300 transition-colors w-full text-left"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-green-600" />
            <span className="text-xs font-semibold text-gray-700">Authenticated Admin Session</span>
          </div>
          <span className="text-xs text-gray-500">Sweet Moon Galle &bull; Always Open</span>
        </header>
        <main className="p-6 md:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
