import React, { useState } from 'react';
import { techStackData, techCategories } from '../data/techData';
import {
  Code,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  Boxes,
  Palette,
  Film,
  Zap,
  CheckCircle
} from 'lucide-react';

export default function TechCreative() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTech =
    activeCategory === 'All'
      ? techStackData
      : techStackData.filter((item) => item.category === activeCategory);

  return (
    <section id="tech-stack" className="relative py-24 sm:py-32 bg-[#071A33] text-white overflow-hidden">
      
      {/* Deep Navy Gradient & Luxury Background Aura */}
      <div className="absolute inset-0 bg-radial-navy opacity-90 pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-60 pointer-events-none"></div>
      <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] bg-[#D8B070]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0D294A] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D294A]/90 border border-[#D8B070]/40 mb-4 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-[#D8B070]" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.2em] font-bold text-[#FFF1D6]">
              TOOLKIT & ENGINE
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            WHERE <span className="text-gold-gradient">CREATIVITY</span> MEETS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#E0C38A] to-[#FFF1D6]">TECHNOLOGY</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-300 font-normal">
            We merge enterprise-grade codebases with world-class digital artistry to build products that perform and inspire.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {techCategories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#FFF1D6] via-[#D8B070] to-[#B88A4C] text-[#071A33] font-bold shadow-[0_0_15px_rgba(216,176,112,0.4)]'
                    : 'bg-[#0D294A]/70 text-gray-300 hover:text-white border border-[#D8B070]/20 hover:border-[#D8B070]/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Interactive Floating Glass Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredTech.map((tech, idx) => (
            <div
              key={tech.name}
              className="group relative rounded-2xl bg-gradient-to-b from-[#0D294A]/90 to-[#0B1220]/95 border border-[#D8B070]/20 p-5 backdrop-blur-xl hover:border-[#D8B070] shadow-md hover:shadow-[0_15px_30px_rgba(216,176,112,0.25)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between text-left"
            >
              {/* Corner Glow */}
              <div
                style={{ backgroundColor: tech.iconColor }}
                className="absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"
              ></div>

              <div>
                {/* Header row: Tech Name + Level */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-xl bg-[#071A33] border border-white/10 flex items-center justify-center font-heading font-black text-sm group-hover:scale-105 transition-transform"
                      style={{ color: tech.iconColor }}
                    >
                      {tech.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-white group-hover:text-[#FFF1D6] transition-colors leading-snug">
                        {tech.name}
                      </h3>
                      <span className="text-[10px] font-mono-tech text-gray-400 block">
                        {tech.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono-tech font-bold text-[#D8B070] bg-[#D8B070]/10 px-2 py-0.5 rounded border border-[#D8B070]/30">
                    {tech.level}
                  </span>
                </div>

                {/* Role */}
                <p className="text-xs font-semibold text-[#FFF1D6] mb-2">
                  {tech.role}
                </p>

                {/* Description */}
                <p className="text-[11px] text-gray-300 font-light leading-relaxed">
                  {tech.description}
                </p>
              </div>

              {/* Bottom Badge */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono-tech text-gray-400">
                <span className="uppercase tracking-wider">{tech.badge}</span>
                <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" />
              </div>

            </div>
          ))}
        </div>

        {/* Interactive Matrix Bar */}
        <div className="mt-14 p-5 rounded-2xl bg-[#0D294A]/80 border border-[#D8B070]/30 flex flex-wrap items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-[#D8B070] flex-shrink-0" />
            <p className="text-xs text-gray-200">
              <span className="font-bold text-[#FFF1D6]">Zero Legacy Debt:</span> All Tensora web, app, game & 3D projects are architected on 2026 modern production standards.
            </p>
          </div>

          <span className="font-mono-tech text-xs text-[#D8B070] uppercase font-bold tracking-widest px-3 py-1 rounded bg-[#071A33] border border-[#D8B070]/30">
            CONTINUOUS INTEGRATION & DEPLOYMENT
          </span>
        </div>

      </div>
    </section>
  );
}
