import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children, actions }) {
  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-h-[90%] overflow-y-auto max-w-5xl mx-4 rounded-2xl shadow-xl p-6 animate-fadeIn scroll-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-theme-primary">{title}</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-theme-accent text-xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="text-gray-600 text-sm">{children}</div>

        {/* Actions */}
        {actions && (
          <div className="mt-6 flex justify-end gap-2">{actions}</div>
        )}
      </div>
    </div>
  );
}
