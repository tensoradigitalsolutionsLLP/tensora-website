import React from 'react';
import tensoraLogo from '../assets/TENSORA LOGO.jpeg';

export default function TensoraLogo({ variant = 'full', size = 'normal', isDark = true }) {
  const iconSize = size === 'large' ? 'w-12 h-12' : size === 'small' ? 'w-7 h-7' : 'w-9 h-9';
  const titleSize = size === 'large' ? 'text-2xl' : size === 'small' ? 'text-lg' : 'text-xl';
  const subtitleSize = size === 'large' ? 'text-[11px]' : size === 'small' ? 'text-[8px]' : 'text-[9.5px]';

  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* Luxury Geometric Monogram Logo */}
      <div className={`relative ${iconSize} flex-shrink-0 flex items-center justify-center overflow-hidden rounded-xl bg-[#F7F4EE] border border-[#D8B070]/40 shadow-[0_0_15px_rgba(216,176,112,0.25)] group-hover:border-[#E0C38A] group-hover:shadow-[0_0_20px_rgba(216,176,112,0.45)] transition-all duration-300 transform group-hover:scale-105`}>
        <img
          src={tensoraLogo}
          alt=""
          aria-hidden="true"
          className="absolute max-w-none w-[210%] h-[210%] left-[-55%] top-[-32%] object-cover"
        />
      </div>

      {/* Brand Text */}
      {variant === 'full' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-heading font-extrabold tracking-[0.18em] ${titleSize} ${
                isDark ? 'text-white' : 'text-[#071A33]'
              }`}
            >
              TENSORA
            </span>
          </div>
          <span
            className={`font-mono-tech uppercase font-semibold tracking-[0.28em] ${subtitleSize} text-[#D8B070] mt-1 flex items-center gap-1`}
          >
            DIGITAL SOLUTIONS
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse inline-block ml-0.5" title="Online / Active"></span>
          </span>
        </div>
      )}
    </div>
  );
}
