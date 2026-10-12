import React from 'react';
import { X, ExternalLink, Calendar, Layers, CheckCircle2, ArrowRight, Star } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#071A33]/90 backdrop-blur-xl animate-fade-in">
      
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#0B1220] border border-[#D8B070]/50 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_40px_rgba(216,176,112,0.25)] text-white p-6 sm:p-8 my-8 text-left overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-80 h-40 bg-[#D8B070]/20 blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full bg-[#D8B070]/20 text-[#FFF1D6] border border-[#D8B070]/40 text-xs font-mono-tech font-bold uppercase tracking-wider">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#071A33] text-gray-300 border border-white/10 text-xs font-mono-tech">
            {project.typeBadge}
          </span>
          <span className="text-xs font-mono-tech text-gray-400 flex items-center gap-1 ml-auto mr-10">
            <Calendar className="w-3.5 h-3.5 text-[#D8B070]" />
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          {project.title}
        </h3>

        <p className="text-xs font-mono-tech text-[#D8B070] mb-4">
          Client / Domain: <span className="text-white font-semibold">{project.client}</span>
        </p>

        {/* Mockup Preview Box with Dynamic Theme Gradient */}
        <div
          style={{ background: project.imageTheme }}
          className="w-full h-48 sm:h-64 rounded-2xl p-6 flex flex-col justify-between border border-[#D8B070]/30 shadow-inner relative overflow-hidden mb-6"
        >
          {project.imageUrl && (
            <img src={project.imageUrl} alt={`${project.title} project preview`} className="absolute inset-0 h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-[#071A33]/45"></div>
          <div className="relative z-10 flex justify-between items-center text-xs font-mono-tech text-white/80">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              TENSORA CASE STUDY
            </span>
            <span>HIGH FIDELITY PROTOTYPE</span>
          </div>

          <div className="relative z-10 text-center py-4">
            <h4 className="font-heading text-xl sm:text-2xl font-black text-white drop-shadow-md">
              {project.title}
            </h4>
            <p className="text-xs text-[#FFF1D6] mt-1 opacity-90 max-w-md mx-auto">
              Engineered with Tensora's luxury standards and high-performance stack.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-2 justify-center">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-black/40 text-white text-[11px] font-mono-tech border border-white/20">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
          {project.description}
        </p>

        {/* Project Key Metrics */}
        {project.stats && (
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#071A33] border border-[#D8B070]/20 mb-6 text-center">
            {Object.entries(project.stats).map(([key, val], idx) => (
              <div key={idx}>
                <span className="block text-[10px] font-mono-tech uppercase text-gray-400">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className="font-heading text-base sm:text-lg font-bold text-[#FFF1D6]">
                  {val}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-[#071A33] bg-gradient-to-r from-[#FFF1D6] via-[#D8B070] to-[#B88A4C] hover:shadow-lg transition-all"
          >
            <span>Request Similar Project</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>

    </div>
  );
}
