import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, LockKeyhole } from 'lucide-react';
import TensoraLogo from './TensoraLogo';

export default function Navbar({ onOpenEstimate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section
      const sections = ['home', 'about', 'services', 'why-us', 'process', 'projects', 'tech-stack', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Why Us', href: '#why-us', id: 'why-us' },
    { name: 'Process', href: '#process', id: 'process' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Tech Stack', href: '#tech-stack', id: 'tech-stack' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#071A33]/92 backdrop-blur-xl border-b border-[#D8B070]/25 shadow-[0_10px_30px_rgba(7,26,51,0.5)] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <a href="#home" className="flex items-center" aria-label="Tensora Digital Solutions Home">
            <TensoraLogo isDark={true} size="normal" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-[#0D294A]/60 border border-[#D8B070]/20 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 relative group ${
                    isActive
                      ? 'text-[#FFF1D6] bg-gradient-to-r from-[#D8B070]/30 to-[#B88A4C]/30 border border-[#D8B070]/50 shadow-[0_0_12px_rgba(216,176,112,0.3)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#D8B070]/35 px-3 py-2 text-xs font-semibold text-[#E0C38A] transition hover:border-[#D8B070] hover:bg-white/5"
            >
              <LockKeyhole className="h-3.5 w-3.5" />
              Admin
            </a>
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-[#071A33] bg-gradient-to-r from-[#FFF1D6] via-[#D8B070] to-[#B88A4C] hover:from-white hover:via-[#E0C38A] hover:to-[#D8B070] shadow-[0_4px_20px_rgba(216,176,112,0.35)] hover:shadow-[0_6px_25px_rgba(216,176,112,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="#contact"
              className="sm:hidden px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg text-[#071A33] bg-gradient-to-r from-[#E0C38A] to-[#D8B070]"
            >
              Get Started
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#0D294A]/80 border border-[#D8B070]/30 text-[#D8B070] hover:text-white hover:border-[#D8B070] focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100 border-b border-[#D8B070]/30' : 'max-h-0 opacity-0'
        } bg-[#071A33]/98 backdrop-blur-2xl`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#D8B070]/15">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-200 hover:text-[#D8B070] hover:bg-white/5 border border-transparent hover:border-[#D8B070]/20 transition-all flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-[10px] text-[#D8B070]/50">→</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimate();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-[#D8B070] bg-[#0D294A] border border-[#D8B070]/50"
            >
              <Sparkles className="w-4 h-4 text-[#D8B070]" />
              Project Cost Estimator
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-[#071A33] bg-gradient-to-r from-[#FFF1D6] via-[#D8B070] to-[#B88A4C] shadow-lg shadow-[#D8B070]/20"
            >
              Get In Touch With Tensora
            </a>
            <a
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-[#E0C38A] bg-[#0D294A] border border-[#D8B070]/35"
            >
              <LockKeyhole className="h-4 w-4" />
              Admin
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
