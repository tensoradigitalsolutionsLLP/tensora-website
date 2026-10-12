import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import ServiceCard from './ServiceCard';
import ServiceModal from './ServiceModal';
import { Sparkles, Layers, ArrowUpRight } from 'lucide-react';

export default function Services({ onOpenEstimate }) {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#F7F4EE] text-[#071A33] overflow-hidden">
      
      {/* Background Decorator */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#D8B070]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#071A33]/5 border border-[#B88A4C]/30 mb-4">
            <Layers className="w-3.5 h-3.5 text-[#B88A4C]" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.2em] font-bold text-[#071A33]">
              FULL SPECTRUM CAPABILITIES
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#071A33]">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B88A4C] via-[#D8B070] to-[#071A33]">SERVICES</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-700 font-normal">
            Powerful digital solutions built around your ideas.
          </p>
        </div>

        {/* 9 Services Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onLearnMore={(s) => setSelectedService(s)}
            />
          ))}
        </div>

        {/* Bottom Custom Solution Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-[#071A33] border border-[#D8B070]/40 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#FFF1D6]">
              Need a Customized Multi-Disciplinary Solution?
            </h3>
            <p className="text-sm text-gray-300">
              Combine websites, custom 3D assets, game mechanics, and dedicated video production in one tailored package.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenEstimate()}
              className="px-6 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-[#071A33] bg-gradient-to-r from-[#FFF1D6] via-[#D8B070] to-[#B88A4C] hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Configure Scope</span>
            </button>
            <a
              href="#contact"
              className="px-5 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-[#FFF1D6] bg-[#0D294A] border border-[#D8B070]/40 hover:bg-white/10 transition-all"
            >
              Discuss Project
            </a>
          </div>
        </div>

      </div>

      {/* Detail Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onOpenEstimate={onOpenEstimate}
        />
      )}

    </section>
  );
}
