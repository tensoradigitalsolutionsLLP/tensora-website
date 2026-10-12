import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Sparkles,
  Layers,
  Globe,
  Smartphone,
  Gamepad2,
  Palette,
  Box,
  Film,
  CheckCircle2,
  Terminal,
  Activity,
  Cpu,
  Flame,
  Shield
} from 'lucide-react';

export default function Hero({ onSelectService, onOpenEstimate }) {
  const [activeBadgeIndex, setActiveBadgeIndex] = useState(0);

  const heroFloatingCards = [
    { title: 'Web Development', icon: Globe, metric: '99.9% Uptime', color: '#D8B070', serviceId: 'web-dev' },
    { title: 'App Development', icon: Smartphone, metric: 'iOS & Android', color: '#E0C38A', serviceId: 'app-dev' },
    { title: 'Game Development', icon: Gamepad2, metric: 'Roblox & Unity', color: '#D8B070', serviceId: 'game-dev' },
    { title: 'Graphic Design', icon: Palette, metric: 'Luxury Identity', color: '#B88A4C', serviceId: 'graphic-design' },
    { title: '3D Modelling', icon: Box, metric: 'Photoreal PBR', color: '#E0C38A', serviceId: '3d-modelling' },
    { title: 'Video Editing', icon: Film, metric: '4K Cinematic FX', color: '#D8B070', serviceId: 'video-editing' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBadgeIndex((prev) => (prev + 1) % heroFloatingCards.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [heroFloatingCards.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-radial-navy text-white flex items-center"
    >
      {/* Ambient Luxury Background Lights & Grids */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-60 pointer-events-none"></div>
      
      {/* Top Gold Radial Aura */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#D8B070]/20 via-[#B88A4C]/10 to-transparent blur-3xl pointer-events-none rounded-full"></div>
      
      {/* Ambient Side Glows */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#0D294A] rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-[#D8B070]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Hero Copy & Calls To Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Top Eyebrow Tag / Small Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D294A]/80 border border-[#D8B070]/40 backdrop-blur-md shadow-[0_0_15px_rgba(216,176,112,0.15)] animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#D8B070] animate-ping"></span>
              <span className="font-mono-tech text-[11px] sm:text-xs tracking-[0.22em] font-semibold text-[#FFF1D6] uppercase">
                IDEAS • SERVICES • PEOPLE • TOGETHER
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08]">
                <span>TURN YOUR </span>
                <span className="text-gold-gradient relative inline-block">
                  IDEAS
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D8B070] to-transparent opacity-80"></span>
                </span>
                <br />
                <span>INTO </span>
                <span className="text-gold-gradient relative inline-block drop-shadow-[0_4px_25px_rgba(216,176,112,0.35)]">
                  REALITY
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light max-w-2xl leading-relaxed tracking-wide">
              <span className="font-medium text-[#FFF1D6]">Creative & Technology Solutions</span> for a Better Tomorrow. We craft world-class websites, mobile apps, 3D assets, games, and distinctive brand identities engineered for exponential growth.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-heading text-sm font-bold uppercase tracking-wider text-[#071A33] bg-gradient-to-r from-[#FFF1D6] via-[#D8B070] to-[#B88A4C] hover:from-white hover:via-[#E0C38A] hover:to-[#D8B070] shadow-[0_4px_25px_rgba(216,176,112,0.4)] hover:shadow-[0_8px_35px_rgba(216,176,112,0.65)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-heading text-sm font-semibold uppercase tracking-wider text-[#FFF1D6] bg-[#0D294A]/70 hover:bg-[#0D294A] border border-[#D8B070]/40 hover:border-[#D8B070] backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 group"
              >
                <Layers className="w-4 h-4 text-[#D8B070] group-hover:rotate-12 transition-transform" />
                <span>EXPLORE SERVICES</span>
              </a>
            </div>

            {/* Secondary Trust Statement & Brand Values */}
            <div className="pt-4 border-t border-[#D8B070]/20 w-full flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-serif-luxury text-sm md:text-base font-bold tracking-[0.25em] text-[#D8B070]">
                  CREATE. CONNECT. GROW.
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-300">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  2026 Production Ready
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#D8B070]" />
                  Enterprise Security
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Premium 3D Tech Workspace Scene & Floating Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-[520px] aspect-[4/3.8] rounded-3xl p-3 bg-gradient-to-b from-[#0D294A]/90 to-[#071A33]/95 border border-[#D8B070]/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(216,176,112,0.2)] backdrop-blur-2xl overflow-hidden group">
              
              {/* Internal Workspace Scene Mockup */}
              <div className="relative w-full h-full rounded-2xl bg-[#0B1220] border border-[#D8B070]/20 p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
                
                {/* Background Ambient Glow inside screen */}
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#D8B070]/20 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-[#0D294A] rounded-full blur-2xl pointer-events-none"></div>

                {/* Workspace Top Bar (Laptop / Interface Header) */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                    <span className="text-[11px] font-mono-tech text-gray-400 ml-2">tensora-studio-v2.6.sh</span>
                  </div>

                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#071A33] border border-[#D8B070]/30 text-[10px] font-mono-tech text-[#D8B070]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping"></span>
                    ACTIVE PROJECT PIPELINE
                  </div>
                </div>

                {/* Workspace Central Visuals: Tech UI + 3D Asset + Controller + Code Matrix */}
                <div className="grid grid-cols-12 gap-3 my-auto py-2 relative z-10">
                  
                  {/* Left sub-panel: Live Code & Metrics */}
                  <div className="col-span-7 bg-[#071A33]/85 rounded-xl p-3 border border-[#D8B070]/20 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-gray-300">
                      <span className="flex items-center gap-1.5 font-mono-tech text-[#E0C38A]">
                        <Terminal className="w-3.5 h-3.5" />
                        tensora.engine()
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono-tech">ONLINE</span>
                    </div>

                    {/* Simulated Code Lines */}
                    <div className="space-y-1.5 text-[10px] font-mono-tech text-gray-400 leading-tight">
                      <p className="text-[#38BDF8]">const <span className="text-[#FFF1D6]">project</span> = await tensora.create({'{'}</p>
                      <p className="pl-3 text-gray-300">scope: <span className="text-[#D8B070]">'Luxury Creative & Tech'</span>,</p>
                      <p className="pl-3 text-gray-300">stack: [<span className="text-[#10B981]">'React'</span>, <span className="text-[#10B981]">'Unity'</span>, <span className="text-[#10B981]">'Blender'</span>],</p>
                      <p className="pl-3 text-gray-300">quality: <span className="text-[#E0C38A]">'Uncompromised'</span></p>
                      <p className="text-[#38BDF8]">{'}'});</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="pt-1">
                      <div className="flex justify-between text-[9px] font-mono-tech text-gray-400 mb-1">
                        <span>RENDER ENGINE</span>
                        <span className="text-[#D8B070]">100% COMPLETE</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#D8B070] to-[#FFF1D6] rounded-full w-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Right sub-panel: 3D / Hardware / Studio Visualizer */}
                  <div className="col-span-5 flex flex-col gap-2">
                    
                    <div className="bg-gradient-to-br from-[#0D294A] to-[#071A33] rounded-xl p-3 border border-[#D8B070]/25 flex flex-col items-center justify-center text-center relative overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-[#D8B070]/20 border border-[#D8B070]/40 flex items-center justify-center mb-1.5 shadow-[0_0_15px_rgba(216,176,112,0.3)]">
                        <Box className="w-5 h-5 text-[#FFF1D6] animate-spin" style={{ animationDuration: '10s' }} />
                      </div>
                      <span className="text-[10px] font-heading font-bold text-[#FFF1D6]">3D Viewport</span>
                      <span className="text-[8.5px] font-mono-tech text-gray-300">Realtime PBR</span>
                    </div>

                    <div className="bg-[#071A33]/85 rounded-xl p-2.5 border border-[#D8B070]/20 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Gamepad2 className="w-3.5 h-3.5 text-[#E0C38A]" />
                        <span className="text-[10px] font-mono-tech text-gray-300">Game Dev</span>
                      </div>
                      <span className="text-[9px] font-bold text-[#10B981] bg-[#10B981]/15 px-1.5 py-0.5 rounded">60 FPS</span>
                    </div>

                  </div>

                </div>

                {/* Workspace Footer Bar */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400 font-mono-tech relative z-10">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-[#D8B070]" />
                    TENSORA HIGH-PERFORMANCE WORKSPACE
                  </span>
                  <span className="text-[#D8B070] font-bold">EST. 2026</span>
                </div>

              </div>

              {/* FLOATING ANIMATED BADGE 1: Top Right */}
              <div className="absolute -top-3 -right-3 z-20 animate-float-slow hidden sm:block">
                <div
                  onClick={() => onSelectService && onSelectService(heroFloatingCards[activeBadgeIndex].serviceId)}
                  className="cursor-pointer px-3.5 py-2.5 rounded-2xl bg-[#071A33]/95 border border-[#D8B070] shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_20px_rgba(216,176,112,0.3)] backdrop-blur-xl flex items-center gap-2.5 transform hover:scale-105 transition-all"
                >
                  <div className="w-7 h-7 rounded-xl bg-[#D8B070]/20 flex items-center justify-center text-[#D8B070]">
                    {React.createElement(heroFloatingCards[activeBadgeIndex].icon, { className: 'w-4 h-4' })}
                  </div>
                  <div>
                    <p className="text-[11px] font-heading font-bold text-white leading-tight">
                      {heroFloatingCards[activeBadgeIndex].title}
                    </p>
                    <p className="text-[9px] font-mono-tech text-[#D8B070]">
                      {heroFloatingCards[activeBadgeIndex].metric}
                    </p>
                  </div>
                </div>
              </div>

              {/* FLOATING ANIMATED BADGE 2: Bottom Left */}
              <div className="absolute -bottom-3 -left-3 z-20 animate-float-reverse hidden sm:block">
                <div className="px-3.5 py-2.5 rounded-2xl bg-[#0D294A]/95 border border-[#E0C38A]/70 shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_20px_rgba(216,176,112,0.25)] backdrop-blur-xl flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-heading font-bold text-white leading-tight">
                      Premium Execution
                    </p>
                    <p className="text-[9px] font-mono-tech text-gray-300">
                      Zero Template Compromises
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Mobile Carousel of Floating Capabilities */}
            <div className="sm:hidden mt-6 w-full grid grid-cols-2 gap-2">
              {heroFloatingCards.slice(0, 4).map((card, i) => (
                <div
                  key={i}
                  onClick={() => onSelectService && onSelectService(card.serviceId)}
                  className="p-2.5 rounded-xl bg-[#0D294A]/80 border border-[#D8B070]/30 flex items-center gap-2"
                >
                  {React.createElement(card.icon, { className: 'w-4 h-4 text-[#D8B070]' })}
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-white truncate">{card.title}</p>
                    <p className="text-[8px] text-[#D8B070]">{card.metric}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
