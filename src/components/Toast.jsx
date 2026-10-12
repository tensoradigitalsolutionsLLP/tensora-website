import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-short shadow-2xl">
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#071A33] border border-[#D8B070]/60 text-white shadow-[0_10px_35px_rgba(7,26,51,0.6)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-[#D8B070] flex-shrink-0" />}
          <div>
            <p className="font-heading text-sm font-semibold text-[#FFF1D6]">{toast.title}</p>
            <p className="text-xs text-gray-300 mt-0.5">{toast.message}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-3 p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
