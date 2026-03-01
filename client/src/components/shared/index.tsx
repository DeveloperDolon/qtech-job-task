import React from "react";

// Loading Spinner
export const Spinner: React.FC<{ size?: "sm" | "md" | "lg" }> = ({ size = "md" }) => {
  const sizeClass = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" }[size];
  return (
    <div className={`${sizeClass} border-2 border-primary border-t-transparent rounded-full animate-spin`} />
  );
};

// Page Loader
export const PageLoader: React.FC = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <Spinner size="lg" />
  </div>
);

// Empty State
export const EmptyState: React.FC<{ title?: string; description?: string; icon?: string }> = ({
  title = "No results found",
  description = "Try adjusting your search or filters.",
  icon = "🔍",
}) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-brand-dark mb-2">{title}</h3>
    <p className="text-brand-gray text-sm max-w-xs">{description}</p>
  </div>
);

// Tag Badge
export const TagBadge: React.FC<{ label: string; color?: "default" | "primary" | "green" | "amber" }> = ({
  label,
  color = "default",
}) => {
  const colorClass = {
    default: "bg-brand-bg text-brand-gray border border-brand-lightgray",
    primary: "bg-primary-50 text-primary border border-primary-100",
    green: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    amber: "bg-amber-50 text-amber-600 border border-amber-200",
  }[color];
  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full ${colorClass}`}>
      {label}
    </span>
  );
};

// Modal
export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-brand-dark font-epilogue">{title}</h2>
            <button onClick={onClose} className="text-brand-gray hover:text-brand-dark text-xl leading-none">×</button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Confirm Dialog
export const ConfirmDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}> = ({ isOpen, onClose, onConfirm, title, message, isLoading }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <p className="text-brand-gray text-sm mb-6">{message}</p>
    <div className="flex gap-3 justify-end">
      <button
        onClick={onClose}
        className="px-5 py-2 border border-brand-lightgray rounded-md text-sm font-medium text-brand-dark hover:border-primary transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={isLoading}
        className="px-5 py-2 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center gap-2"
      >
        {isLoading && <Spinner size="sm" />}
        Delete
      </button>
    </div>
  </Modal>
);
