import { CheckCircle, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  const isSuccess = type === "success";
  
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: {
      bg: "bg-gradient-to-r from-green-500 to-emerald-500",
      icon: <CheckCircle size={20} className="text-white flex-shrink-0" />,
      progress: "bg-green-600"
    },
    error: {
      bg: "bg-gradient-to-r from-red-500 to-pink-500",
      icon: <AlertCircle size={20} className="text-white flex-shrink-0" />,
      progress: "bg-red-600"
    }
  };

  const theme = styles[type] || styles.success;

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className={`${theme.bg} rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300`}>
        <div className="px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {theme.icon}
            <span className="font-semibold text-sm md:text-base text-white">
              {message}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors duration-200 flex-shrink-0"
            aria-label="Close"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* Progress Bar */}
        <div
          className={`${theme.progress} h-1 animate-pulse`}
          style={{
            animation: "shrink 3s linear forwards"
          }}
        >
          <style>{`
            @keyframes shrink {
              from {
                width: 100%;
              }
              to {
                width: 0%;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}