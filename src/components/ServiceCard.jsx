import React from 'react';
import {
  Globe,
  Smartphone,
  Gamepad2,
  Palette,
  Box,
  Film,
  Layout,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const iconMap = {
  Globe,
  Smartphone,
  Gamepad2,
  Palette,
  Box,
  Film,
  Layout,
  Cpu,
  Layers
};

export default function ServiceCard({ service, onLearnMore }) {
  const IconComponent = iconMap[service.iconName] || Globe;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white border border-[#D8B070]/25 p-7 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(216,176,112,0.35)] hover:border-[#D8B070] transition-all duration-400 transform hover:-translate-y-2 overflow-hidden text-left">
      
      {/* Top Gold Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D8B070]/40 to-transparent group-hover:via-[#D8B070] transition-all duration-500"></div>

      {/* Subtle Ambient Hover Glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#D8B070]/0 group-hover:bg-[#D8B070]/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none"></div>

      <div>
        {/* Top Header Row: Icon + Number + Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#071A33] border border-[#D8B070]/30 flex items-center justify-center text-[#D8B070] shadow-md group-hover:bg-gradient-to-br group-hover:from-[#0D294A] group-hover:to-[#071A33] group-hover:border-[#E0C38A] group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(216,176,112,0.4)] transition-all duration-300">
            <IconComponent className="w-7 h-7 transform group-hover:rotate-6 transition-transform duration-300" />
          </div>

          <div className="flex flex-col items-end">
            <span className="font-mono-tech text-xs font-bold text-[#B88A4C] tracking-widest">
              {service.number}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 mt-1 rounded bg-[#071A33]/5 text-[#071A33] group-hover:bg-[#D8B070]/20 group-hover:text-[#071A33] transition-colors">
              {service.badge}
            </span>
          </div>
        </div>

        {/* Service Title */}
        <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#071A33] group-hover:text-[#0D294A] mb-3 leading-snug">
          {service.name}
        </h3>

        {/* Service Short Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
          {service.shortDesc}
        </p>

        {/* Quick Highlights Bullet Points */}
        <div className="space-y-2 mb-6 pt-4 border-t border-[#D8B070]/15">
          {service.highlights.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8B070] group-hover:bg-[#B88A4C] transition-colors"></span>
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action: Learn More Button */}
      <div className="pt-2">
        <button
          onClick={() => onLearnMore(service)}
          className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider text-[#071A33] bg-[#F7F4EE] group-hover:bg-gradient-to-r group-hover:from-[#FFF1D6] group-hover:via-[#E0C38A] group-hover:to-[#D8B070] border border-[#D8B070]/30 group-hover:border-[#D8B070] shadow-sm transition-all duration-300"
        >
          <span>Learn More</span>
          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
