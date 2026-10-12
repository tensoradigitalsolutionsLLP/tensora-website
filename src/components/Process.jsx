import React, { useState } from 'react';
import { processSteps } from '../data/processData';
import { Compass, Map, PenTool, Code2, Rocket, LineChart, CheckCircle2, ArrowRight } from 'lucide-react';

const iconMap = {
  Compass,
  Map,
  PenTool,
  Code2,
  Rocket,
  LineChart
};

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="relative py-24 sm:py-32 bg-[#F7F4EE] text-[#071A33] overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#071A33]/5 border border-[#B88A4C]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#B88A4C]"></span>
            <span className="font-mono-tech text-xs uppercase tracking-[0.2em] font-bold text-[#071A33]">
              EXECUTION ROADMAP
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#071A33]">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B88A4C] via-[#D8B070] to-[#071A33]">PROCESS</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-700 font-normal">
            A battle-tested 6-phase engineering lifecycle taking you from concept to market triumph.
          </p>
        </div>

        {/* 6-Step Connected Process Grid */}
        <div className="relative">
          
          {/* Subtle connecting line across desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] bg-gradient-to-r from-[#D8B070]/20 via-[#B88A4C]/40 to-[#D8B070]/20 -translate-y-1/2 z-0 pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {processSteps.map((item, idx) => {
              const Icon = iconMap[item.iconName] || Compass;
              const isCurrent = activeStep === idx;

              return (
                <div
                  key={item.step}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`group relative flex flex-col justify-between rounded-2xl p-7 transition-all duration-300 transform hover:-translate-y-1.5 text-left cursor-pointer ${
                    isCurrent
                      ? 'bg-[#071A33] text-white border-2 border-[#D8B070] shadow-[0_15px_35px_rgba(7,26,51,0.25)]'
                      : 'bg-white text-[#071A33] border border-[#D8B070]/30 shadow-sm hover:border-[#B88A4C]'
                  }`}
                >
                  {/* Top Step Header */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-sm ${
                          isCurrent
                            ? 'bg-[#D8B070] text-[#071A33]'
                            : 'bg-[#071A33] text-[#D8B070] group-hover:bg-[#0D294A]'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-mono-tech text-xs uppercase tracking-wider font-semibold opacity-60">
                          PHASE
                        </span>
                        <span
                          className={`font-mono-tech text-base font-extrabold px-2.5 py-0.5 rounded-lg ${
                            isCurrent
                              ? 'bg-white/10 text-[#FFF1D6]'
                              : 'bg-[#071A33]/5 text-[#071A33]'
                          }`}
                        >
                          {item.step}
                        </span>
                      </div>
                    </div>

                    {/* Step Name & Title */}
                    <div className="space-y-1 mb-3">
                      <span
                        className={`text-xs font-mono-tech uppercase font-bold tracking-widest block ${
                          isCurrent ? 'text-[#D8B070]' : 'text-[#B88A4C]'
                        }`}
                      >
                        {item.phase}
                      </span>
                      <h3
                        className={`font-heading text-lg sm:text-xl font-extrabold tracking-tight ${
                          isCurrent ? 'text-white' : 'text-[#071A33]'
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    {/* Short Core Description */}
                    <p
                      className={`text-sm font-medium mb-3 leading-relaxed ${
                        isCurrent ? 'text-gray-200' : 'text-gray-800'
                      }`}
                    >
                      {item.description}
                    </p>

                    {/* Detailed Methodology */}
                    <p
                      className={`text-xs leading-relaxed ${
                        isCurrent ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {item.detail}
                    </p>
                  </div>

                  {/* Bottom Deliverable Action */}
                  <div
                    className={`mt-6 pt-4 border-t flex items-center justify-between text-xs ${
                      isCurrent ? 'border-white/10 text-[#D8B070]' : 'border-[#D8B070]/20 text-[#071A33]'
                    }`}
                  >
                    <span className="font-mono-tech font-bold uppercase tracking-wider text-[11px]">
                      {item.keyAction}
                    </span>
                    <CheckCircle2 className={`w-4 h-4 ${isCurrent ? 'text-[#10B981]' : 'text-[#D8B070]'}`} />
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
