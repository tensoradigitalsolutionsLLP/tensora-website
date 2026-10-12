import React from 'react';
import {
  Building2,
  Rocket,
  Video,
  Gamepad,
  Briefcase,
  Users,
  CheckCircle,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Flame
} from 'lucide-react';

export default function About({ onOpenEstimate }) {
  const targetAudiences = [
    { label: 'Businesses', icon: Building2, desc: 'Corporate portals & enterprise platforms' },
    { label: 'Startups', icon: Rocket, desc: 'MVP prototypes & scalable architectures' },
    { label: 'Content Creators', icon: Video, desc: 'High-retention editing & branding' },
    { label: 'Gamers', icon: Gamepad, desc: 'Roblox & Unity custom experiences' },
    { label: 'Entrepreneurs', icon: Briefcase, desc: 'Bespoke ideas turned to digital revenue' },
    { label: 'Organizations', icon: Users, desc: 'Digital transformation & robust systems' }
  ];

  const stats = [
    { value: '100%', label: 'Creative', sub: 'Custom tailored visions', icon: Sparkles },
    { value: 'Tech', label: 'Driven', sub: 'Modern 2026 engineering', icon: Zap },
    { value: 'Client', label: 'Focused', sub: 'Transparent collaboration', icon: ShieldCheck },
    { value: 'Long-Term', label: 'Support', sub: 'Continuous expansion', icon: TrendingUp }
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#F7F4EE] text-[#071A33] overflow-hidden">
      {/* Subtle Background Geometric Accents */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
      <div className="absolute -top-32 right-0 w-96 h-96 bg-[#D8B070]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#071A33]/5 border border-[#B88A4C]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#B88A4C]"></span>
            <span className="font-mono-tech text-xs uppercase tracking-[0.2em] font-bold text-[#071A33]">
              ABOUT TENSORA
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#071A33] leading-tight">
            MORE THAN A <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B88A4C] via-[#D8B070] to-[#071A33]">SERVICE</span>
          </h2>

          <p className="mt-5 text-lg sm:text-xl text-gray-700 font-normal leading-relaxed">
            <span className="font-semibold text-[#071A33]">Tensora Digital Solutions</span> combines creativity, technology, and innovation to transform ideas into meaningful digital experiences.
          </p>
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Mission, Target Audiences & CTA */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#071A33]">
                Empowering Visionaries with Next-Gen Digital Execution
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Whether you are launching an ambitious startup, scaling an enterprise ecosystem, building immersive gaming worlds, or seeking elite branding and video production, Tensora delivers end-to-end excellence.
              </p>
            </div>

            {/* Target Audience Grid */}
            <div className="space-y-3">
              <p className="text-xs font-mono-tech uppercase font-bold text-[#B88A4C] tracking-wider">
                WE ENGINEER DEDICATED SOLUTIONS FOR:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {targetAudiences.map((target, idx) => {
                  const Icon = target.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-[#D8B070]/30 shadow-sm hover:border-[#B88A4C] hover:shadow-md hover:-translate-y-0.5 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#071A33]/5 text-[#071A33] group-hover:bg-[#071A33] group-hover:text-[#D8B070] flex items-center justify-center transition-colors mb-2">
                        <Icon className="w-4 h-4" />
                      </div>
                      <p className="font-heading text-xs font-bold text-[#071A33] leading-tight">{target.label}</p>
                      <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{target.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-white bg-[#071A33] hover:bg-[#0D294A] shadow-md hover:shadow-lg transition-all"
              >
                <span>Discover All Services</span>
                <ArrowRight className="w-4 h-4 text-[#D8B070]" />
              </a>

              <button
                onClick={onOpenEstimate}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-[#071A33] bg-[#D8B070]/20 hover:bg-[#D8B070]/30 border border-[#D8B070]/50 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#B88A4C]" />
                Calculate Project Scope
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Luxury Technology Workspace Graphic + Floating Gold Accents */}
          <div className="lg:col-span-6 relative">
            
            {/* Visual Card */}
            <div className="relative rounded-3xl bg-[#071A33] p-6 sm:p-8 text-white border border-[#D8B070]/40 shadow-2xl overflow-hidden">
              
              {/* Background ambient gold gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D8B070]/15 rounded-full blur-3xl pointer-events-none"></div>

              {/* Header inside card */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D8B070] to-[#B88A4C] p-0.5 flex items-center justify-center">
                    <div className="w-full h-full bg-[#071A33] rounded-[10px] flex items-center justify-center">
                      <Award className="w-5 h-5 text-[#E0C38A]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white">TENSORA DIGITAL SUITE</h4>
                    <p className="text-[11px] font-mono-tech text-[#D8B070]">Creative & Technology Vanguard</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#0D294A] border border-[#D8B070]/40 text-[10px] font-mono-tech text-emerald-400 font-semibold">
                  EST. 2026
                </span>
              </div>

              {/* Four Core Statistics Grid */}
              <div className="grid grid-cols-2 gap-4 py-8 relative z-10">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-[#0D294A]/70 border border-[#D8B070]/20 hover:border-[#D8B070]/60 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-5 h-5 text-[#D8B070] group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-mono-tech text-gray-400">0{i + 1}</span>
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-heading text-xl sm:text-2xl font-extrabold text-[#FFF1D6]">
                          {stat.value}
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#D8B070]">
                          {stat.label}
                        </div>
                        <div className="text-[11px] text-gray-300 pt-1">
                          {stat.sub}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Trust Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#0D294A] via-[#071A33] to-[#0D294A] border border-[#D8B070]/30 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  <span className="text-xs font-semibold text-gray-200">
                    Guaranteed Delivery & Full Source Ownership
                  </span>
                </div>
                <span className="font-serif-luxury text-xs text-[#D8B070] font-bold">100% SLA</span>
              </div>

              {/* Floating Gold Pill Accent 1 */}
              <div className="absolute -top-3 -left-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FFF1D6] to-[#D8B070] text-[#071A33] font-heading font-extrabold text-[11px] shadow-lg animate-float-slow z-20">
                <Sparkles className="w-3 h-3" />
                CREATE. CONNECT. GROW.
              </div>

              {/* Floating Gold Pill Accent 2 */}
              <div className="absolute -bottom-3 -right-3 hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#071A33] border border-[#D8B070] text-[#D8B070] font-mono-tech text-[10px] shadow-xl z-20 animate-float-reverse">
                <Zap className="w-3 h-3 text-[#10B981]" />
                HIGH VELOCITY WORKFLOW
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
