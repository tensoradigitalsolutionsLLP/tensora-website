import React, { useState } from 'react';
import TensoraLogo from './TensoraLogo';
import {
  ArrowUp,
  Shield,
  FileText,
  X,
  Mail,
  Heart,
  MessageSquare
} from 'lucide-react';

// Custom Crisp Vector Brand Icons
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const WhatsappIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.5 11.5a8.5 8.5 0 0 1-12.56 7.45L3 20l1.05-4.7A8.5 8.5 0 1 1 20.5 11.5z"></path>
    <path d="M8.2 7.8c.25-.55.5-.56.74-.56h.63c.2 0 .43.08.52.38l.73 1.77c.09.22.04.46-.12.64l-.5.58c-.16.18-.2.38-.08.59.45.78 1.1 1.43 1.89 1.87.21.12.4.08.58-.08l.58-.5c.18-.16.42-.2.64-.11l1.77.73c.3.12.38.32.38.53v.62c0 .24-.01.49-.56.74-.56.27-1.37.36-2.14.1-1.19-.4-2.65-1.28-3.8-2.43-1.15-1.15-2.03-2.61-2.43-3.8-.26-.77-.17-1.58.1-2.14z"></path>
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297a12 12 0 0 0-3.79 23.4c.6.113.82-.258.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.304.763-1.604-2.665-.304-5.467-1.334-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.323 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.553 3.297-1.23 3.297-1.23.653 1.652.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.48 5.921.431.372.816 1.102.816 2.222v3.293c0 .322.216.694.825.576A12 12 0 0 0 12 .297z" />
  </svg>
);

const DiscordIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export default function Footer() {
  const [modalType, setModalType] = useState(null); // 'privacy' | 'terms' | null

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Process', href: '#process' },
    { name: 'Projects', href: '#projects' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: InstagramIcon,
      href: 'https://www.instagram.com/tensora_digital_solutions26?stkn=OTVnZmJ6NmV0bHo0',
      color: 'hover:text-pink-400 hover:border-pink-400/50'
    },
    {
      name: 'WhatsApp',
      icon: WhatsappIcon,
      href: 'https://wa.me/918122544605',
      color: 'hover:text-green-400 hover:border-green-400/50'
    },
    {
      name: 'GitHub',
      icon: GithubIcon,
      href: 'https://github.com/tensoradigitalsolutionsLLP',
      color: 'hover:text-white hover:border-white/50'
    },
    {
      name: 'Discord',
      icon: DiscordIcon,
      href: 'https://discord.gg/DHqMJu5ngF',
      color: 'hover:text-indigo-400 hover:border-indigo-400/50'
    }
  ];

  return (
    <footer className="relative bg-[#071A33] text-white border-t border-[#D8B070]/30 overflow-hidden text-left">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#0D294A] rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="inline-block">
              <TensoraLogo size="large" isDark={true} />
            </a>

            <p className="font-serif-luxury text-sm font-bold tracking-[0.25em] text-[#D8B070] pt-1">
              "CREATE. CONNECT. GROW."
            </p>

            <p className="text-xs sm:text-sm text-gray-300 font-light max-w-sm leading-relaxed">
              Creative & Technology Solutions for a Better Tomorrow. Crafting luxury websites, cross-platform apps, 3D assets, games, and distinctive brand identities.
            </p>

            {/* Email contact pill */}
            <div className="pt-2">
              <a
                href="mailto:tensora26llp@gmail.com"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0D294A] border border-[#D8B070]/30 text-xs font-mono-tech text-[#FFF1D6] hover:border-[#D8B070] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#D8B070]" />
                tensora26llp@gmail.com
              </a>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-[#D8B070]">
              EXPLORE TENSORA
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-[#FFF1D6] hover:translate-x-1 transition-all py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Presence & Connect */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-[#D8B070]">
              COMMUNITY & SOCIAL
            </h4>

            <p className="text-xs text-gray-300">
              Follow our engineering logs, design drops, and creative releases.
            </p>

            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl bg-[#0D294A] border border-[#D8B070]/30 flex items-center justify-center text-gray-300 transition-all ${social.color} hover:scale-110 shadow-md`}
                    aria-label={`Tensora on ${social.name}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* Back to top quick action */}
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono-tech text-[#D8B070] hover:text-white bg-white/5 hover:bg-white/10 border border-[#D8B070]/20 transition-all"
              >
                <span>Back To Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Sub-Footer Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="font-mono-tech">
            © 2026 Tensora Digital Solutions. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-[#D8B070] transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-gray-600">•</span>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-[#D8B070] transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>

      {/* Privacy Policy / Terms Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#071A33]/90 backdrop-blur-xl animate-fade-in text-left">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0B1220] border border-[#D8B070]/60 p-6 sm:p-8 text-white max-h-[85vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-2xl font-bold text-[#FFF1D6] mb-4">
              {modalType === 'privacy' ? 'Tensora Privacy Policy' : 'Terms & Conditions'}
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              {modalType === 'privacy' ? (
                <>
                  <p>
                    At Tensora Digital Solutions ("Tensora", "we", "our"), protecting the confidentiality and security of our clients' intellectual property, data, and communications is our paramount priority.
                  </p>
                  <p>
                    <strong className="text-[#D8B070]">1. Data Collection:</strong> We only collect project specifications, communication details, and inquiries submitted willingly through our official portal.
                  </p>
                  <p>
                    <strong className="text-[#D8B070]">2. NDA & Confidentiality:</strong> All concepts, designs, codebases, and digital assets produced or reviewed remain strictly protected under standard non-disclosure protocols.
                  </p>
                  <p>
                    <strong className="text-[#D8B070]">3. Contact:</strong> For privacy inquiries, contact our legal desk at <span className="text-white font-mono-tech">tensora26llp@gmail.com</span>.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    By engaging Tensora Digital Solutions for web development, application engineering, game creation, 3D modeling, graphic design, or video editing services, you agree to our standard operational terms.
                  </p>
                  <p>
                    <strong className="text-[#D8B070]">1. Project Milestones:</strong> Deliverables are architected according to transparent sprint milestones approved mutually before kickoff.
                  </p>
                  <p>
                    <strong className="text-[#D8B070]">2. Ownership:</strong> Upon final milestone settlement, complete source code, 3D meshes, and final visual master files are transferred in full to the client.
                  </p>
                  <p>
                    <strong className="text-[#D8B070]">3. Warranty & SLA:</strong> Every delivery includes post-launch testing warranty and continuous maintenance options.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-5 py-2 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-[#071A33] bg-[#D8B070] hover:bg-[#E0C38A] transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}
