import React from 'react';
import { ArrowRight, Sparkles, Mail, MessageSquare } from 'lucide-react';

export default function CTASection({ onOpenEstimate }) {
  return (
    <section className="relative py-20 sm:py-28 bg-[#0B1220] text-white overflow-hidden">
      
      {/* Premium Gold Gradient Aura Background behind section */}
      <div className="absolute inset-0 bg-radial-navy opacity-80 pointer-events-none"></div>
      
      {/* Huge Gold Ambient Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#D8B070]/20 via-[#E0C38A]/15 to-[#B88A4C]/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        
        {/* Container Box with Luxury Gold Border */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0D294A]/90 via-[#071A33]/95 to-[#0B1220]/95 border-2 border-[#D8B070]/50 p-8 sm:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(216,176,112,0.2)] backdrop-blur-2xl">
          
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#071A33] border border-[#D8B070]/40 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B070]" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.25em] font-bold text-[#FFF1D6]">
              INITIATE COLLABORATION
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            LET'S BUILD SOMETHING <br className="hidden sm:inline" />
            <span className="text-gold-gradient drop-shadow-[0_4px_25px_rgba(216,176,112,0.4)]">
              GREAT TOGETHER
            </span>
          </h2>

          {/* Text */}
          <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Have an idea? Let's transform it into a powerful digital experience. From initial wireframes to global cloud deployment, Tensora is your end-to-end partner.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-[#071A33] bg-gradient-to-r from-[#FFF1D6] via-[#D8B070] to-[#B88A4C] hover:from-white hover:via-[#E0C38A] hover:to-[#D8B070] shadow-[0_4px_30px_rgba(216,176,112,0.5)] hover:shadow-[0_8px_40px_rgba(216,176,112,0.8)] transform hover:-translate-y-1 transition-all duration-300 group"
            >
              <span>START YOUR PROJECT</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="mailto:tensora26pvtltd@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#FFF1D6] bg-[#071A33] hover:bg-[#0D294A] border border-[#D8B070]/50 hover:border-[#D8B070] backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <Mail className="w-4 h-4 text-[#D8B070]" />
              <span>CONTACT US DIRECTLY</span>
            </a>
          </div>

          {/* Bottom Tagline */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="font-serif-luxury text-xs sm:text-sm font-bold tracking-[0.3em] text-[#D8B070]">
              CREATE. CONNECT. GROW.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
