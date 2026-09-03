"use client";
import { useEffect } from "react";
import { useUIStore } from "@/store/ui";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: "border-l-green-500 bg-green-50 text-green-800",
  error: "border-l-red-500 bg-red-50 text-red-800",
  info: "border-l-blue-500 bg-blue-50 text-blue-800",
  warning: "border-l-amber-500 bg-amber-50 text-amber-800",
};

const iconColors = {
  success: "text-green-500",
  error: "text-red-500",
  info: "text-blue-500",
  warning: "text-amber-500",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 p-4 rounded-xl border-l-4 shadow-lg animate-slide-in-right ${colors[toast.type]}`}
          >
            <Icon size={18} className={`flex-shrink-0 mt-0.5 ${iconColors[toast.type]}`} />
            <p className="text-sm flex-1 font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
