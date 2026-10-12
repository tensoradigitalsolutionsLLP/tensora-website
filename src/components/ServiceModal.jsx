import React from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  Code2,
  PackageCheck,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export default function ServiceModal({ service, onClose, onOpenEstimate }) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#071A33]/85 backdrop-blur-xl animate-fade-in">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0B1220] border border-[#D8B070]/50 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(216,176,112,0.25)] text-white p-6 sm:p-8 my-8 text-left overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-40 bg-[#D8B070]/20 blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge & Number */}
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono-tech text-xs font-bold text-[#D8B070] tracking-widest">
            SERVICE {service.number}
          </span>
          <span className="text-[11px] font-mono-tech uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#D8B070]/20 text-[#FFF1D6] border border-[#D8B070]/40">
            {service.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
          {service.name}
        </h3>

        {/* Full Detailed Description */}
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
          {service.fullDesc}
        </p>

        {/* Key Features & Deliverables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          
          {/* Key Capabilities */}
          <div className="p-4 rounded-2xl bg-[#071A33] border border-[#D8B070]/20 space-y-2.5">
            <h4 className="flex items-center gap-2 text-xs font-mono-tech uppercase font-bold text-[#D8B070]">
              <Sparkles className="w-3.5 h-3.5" />
              Key Capabilities
            </h4>
            <ul className="space-y-2">
              {service.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div className="p-4 rounded-2xl bg-[#071A33] border border-[#D8B070]/20 space-y-2.5">
            <h4 className="flex items-center gap-2 text-xs font-mono-tech uppercase font-bold text-[#E0C38A]">
              <PackageCheck className="w-3.5 h-3.5" />
              What You Receive
            </h4>
            <ul className="space-y-2">
              {service.deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0C38A] flex-shrink-0 mt-1.5"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Tech Stack & Typical Timeline */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D294A]/60 border border-white/10 mb-8">
          <div>
            <span className="block text-[10px] font-mono-tech text-gray-400 uppercase tracking-wider mb-1">
              Tech / Tool Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {service.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#071A33] border border-[#D8B070]/30 text-[11px] font-mono-tech text-[#FFF1D6]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="sm:text-right">
            <span className="block text-[10px] font-mono-tech text-gray-400 uppercase tracking-wider mb-1">
              Estimated Timeline
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10B981]">
              <Clock className="w-3.5 h-3.5" />
              {service.timeline}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-[#071A33] bg-gradient-to-r from-[#FFF1D6] via-[#D8B070] to-[#B88A4C] hover:shadow-lg transition-all"
          >
            <span>Request This Service</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenEstimate(service.name);
            }}
            className="px-5 py-3.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-[#FFF1D6] bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
          >
            Estimate Budget
          </button>
        </div>

      </div>

    </div>
  );
}
