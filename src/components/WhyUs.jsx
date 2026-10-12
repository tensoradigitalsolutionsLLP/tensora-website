import React from 'react';
import { whyUsData } from '../data/whyUsData';
import { Sparkles, ShieldCheck, Headphones, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

const iconMap = {
  Sparkles,
  ShieldCheck,
  Headphones,
  TrendingUp
};

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 sm:py-32 bg-[#0B1220] text-white overflow-hidden">
      
      {/* Dark Luxury Ambient Lights */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-50 pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#D8B070]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[#0D294A] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D294A] border border-[#D8B070]/40 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B070]" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.2em] font-bold text-[#FFF1D6]">
              OUR COMMITMENT
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            WHY <span className="text-gold-gradient">TENSORA?</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-300 font-normal">
            We don't just deliver deliverables — we forge high-performance digital partnerships.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          {whyUsData.map((item, idx) => {
            const Icon = iconMap[item.iconName] || Sparkles;
            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#0D294A]/80 to-[#071A33]/90 border border-[#D8B070]/25 p-7 hover:border-[#D8B070] hover:shadow-[0_15px_35px_-10px_rgba(216,176,112,0.35)] transition-all duration-300 transform hover:-translate-y-2 text-left"
              >
                {/* Top Corner Gold Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#071A33] border border-[#D8B070]/40 flex items-center justify-center text-[#D8B070] group-hover:bg-[#D8B070] group-hover:text-[#071A33] group-hover:scale-110 transition-all duration-300 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="font-mono-tech text-xs font-bold text-[#D8B070]/60 group-hover:text-[#D8B070] transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-extrabold text-[#FFF1D6] tracking-wide mb-1">
                    {item.title}
                  </h3>
                  
                  <span className="text-[11px] font-mono-tech text-[#D8B070] block mb-3 uppercase tracking-wider font-semibold">
                    {item.subtitle}
                  </span>

                  <p className="text-sm text-gray-200 font-medium mb-3 leading-relaxed">
                    "{item.description}"
                  </p>

                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {item.longText}
                  </p>
                </div>

                {/* Bottom Metric Pill */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono-tech uppercase text-gray-400">BENCHMARK</span>
                  <span className="text-xs font-mono-tech font-bold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-full">
                    {item.stats}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Brand Promise Strip */}
        <div className="mt-16 p-6 rounded-2xl bg-[#071A33]/90 border border-[#D8B070]/30 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] flex-shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-white">
                Tensora 100% Quality & Milestone Guarantee
              </p>
              <p className="text-xs text-gray-400">
                Transparent sprint updates, code repositories access, and dedicated technical lead for every client.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-[#071A33] bg-gradient-to-r from-[#FFF1D6] to-[#D8B070] hover:shadow-lg transition-all flex-shrink-0"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
