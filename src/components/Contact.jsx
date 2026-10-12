import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Copy,
  Clock,
  Sparkles,
  ShieldCheck,
  Globe2,
  MessageSquare
} from 'lucide-react';

export default function Contact({ appliedEstimate, onShowToast }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: 'Website Development',
    budget: '₹1,000 - ₹3,000',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // If cost estimator passed in an applied scope, auto-fill it
  useEffect(() => {
    if (appliedEstimate) {
      setFormData((prev) => ({
        ...prev,
        service: appliedEstimate.services.split(',')[0] || prev.service,
        budget: appliedEstimate.estimatedRange || prev.budget,
        message: prev.message
          ? prev.message
          : `I would like to discuss our project scope (${appliedEstimate.services}) with a ${appliedEstimate.tier} complexity tier and ${appliedEstimate.timeline} timeline.`
      }));
    }
  }, [appliedEstimate]);

  const serviceOptions = [
    'Website Development',
    'App Development',
    'Game Development',
    'Graphic Design',
    '3D Modelling',
    'Video Editing',
    'UI/UX Design',
    'Custom Solutions',
    'Digital Solutions',
    'Multi-Service Custom Package'
  ];

  const budgetOptions = [
    'Under ₹500',
    '₹500 - ₹1,000',
    '₹1,000 - ₹3,000',
    '₹3,000 - ₹5,000',
    '₹5,000 - ₹10,000+',
    'Flexible / Milestone-Based'
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('tensora26llp@gmail.com');
    setCopiedEmail(true);
    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Email Copied!',
        message: 'tensora26llp@gmail.com copied to your clipboard.'
      });
    }
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;
    if (!endpoint) {
      setSubmitError('Form submissions are not configured yet. Please contact us by email.');
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(formData)
      });
      setIsSubmitted(true);

      if (onShowToast) {
        onShowToast({
          type: 'success',
          title: 'Inquiry Submitted',
          message: 'Your contact details have been sent to our project intake sheet.'
        });
      }
    } catch {
      setSubmitError('We could not send your inquiry. Please try again or contact us by email.');
      if (onShowToast) {
        onShowToast({
          type: 'error',
          title: 'Submission Failed',
          message: 'Please try again or contact us by email.'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#F7F4EE] text-[#071A33] overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#D8B070]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#071A33]/5 border border-[#B88A4C]/30 mb-4">
            <Mail className="w-3.5 h-3.5 text-[#B88A4C]" />
            <span className="font-mono-tech text-xs uppercase tracking-[0.2em] font-bold text-[#071A33]">
              COMMENCE YOUR PROJECT
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#071A33]">
            GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B88A4C] via-[#D8B070] to-[#071A33]">TOUCH</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-700 font-normal">
            Have an idea or project in mind? Let's talk.
          </p>
        </div>

        {/* Form and Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT: Professional Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#D8B070]/35 shadow-xl text-left relative overflow-hidden">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FFF1D6] via-[#D8B070] to-[#B88A4C]"></div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-2xl bg-[#071A33] border border-[#D8B070] text-[#D8B070] flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
                </div>

                <h3 className="font-heading text-2xl font-bold text-[#071A33]">
                  Inquiry Submitted
                </h3>

                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Your details have been sent to our project intake sheet. We’ll be in touch soon.
                </p>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmitError('');
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        service: 'Website Development',
                        budget: '₹1,000 - ₹3,000',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-[#071A33] bg-[#F7F4EE] border border-[#D8B070]/40 hover:bg-[#D8B070]/20 transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono-tech uppercase font-bold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F4EE]/60 border border-[#D8B070]/40 focus:border-[#B88A4C] focus:bg-white focus:outline-none text-sm text-[#071A33] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech uppercase font-bold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F4EE]/60 border border-[#D8B070]/40 focus:border-[#B88A4C] focus:bg-white focus:outline-none text-sm text-[#071A33] transition-all"
                    />
                  </div>
                </div>

                {/* Phone & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono-tech uppercase font-bold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F4EE]/60 border border-[#D8B070]/40 focus:border-[#B88A4C] focus:bg-white focus:outline-none text-sm text-[#071A33] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech uppercase font-bold text-gray-700 mb-2">
                      Service of Interest *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F4EE]/60 border border-[#D8B070]/40 focus:border-[#B88A4C] focus:bg-white focus:outline-none text-sm text-[#071A33] transition-all cursor-pointer"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Budget */}
                <div>
                  <label className="block text-xs font-mono-tech uppercase font-bold text-gray-700 mb-2">
                    Project Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F4EE]/60 border border-[#D8B070]/40 focus:border-[#B88A4C] focus:bg-white focus:outline-none text-sm text-[#071A33] transition-all cursor-pointer"
                  >
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono-tech uppercase font-bold text-gray-700 mb-2">
                    Project Overview & Goals *
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Tell us about your project vision, target timeline, and specific deliverables..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F4EE]/60 border border-[#D8B070]/40 focus:border-[#B88A4C] focus:bg-white focus:outline-none text-sm text-[#071A33] transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-3 py-4 px-8 rounded-xl font-heading text-sm font-bold uppercase tracking-wider text-[#071A33] bg-gradient-to-r from-[#FFF1D6] via-[#D8B070] to-[#B88A4C] hover:from-white hover:via-[#E0C38A] hover:to-[#D8B070] shadow-[0_4px_25px_rgba(216,176,112,0.4)] hover:shadow-[0_6px_30px_rgba(216,176,112,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                  {!isSubmitting && <Send className="w-4 h-4" />}
                </button>

                {submitError && (
                  <p role="alert" className="text-center text-sm text-red-700">
                    {submitError} <a className="font-semibold underline" href="mailto:tensora26llp@gmail.com">Email us</a>.
                  </p>
                )}

                <p className="text-center text-[11px] text-gray-500 font-mono-tech pt-1">
                  🔒 Strictly confidential. Non-disclosure agreements respected.
                </p>

              </form>
            )}

          </div>

          {/* RIGHT: Elegant Contact Information Panel */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Primary Info Card */}
            <div className="rounded-3xl bg-[#071A33] p-6 sm:p-8 text-white border border-[#D8B070]/40 shadow-xl relative overflow-hidden">
              
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D8B070]/15 rounded-full blur-2xl pointer-events-none"></div>

              <div className="space-y-2 mb-6">
                <span className="font-mono-tech text-xs uppercase tracking-widest text-[#D8B070] font-bold">
                  DIRECT CHANNEL
                </span>
                <h3 className="font-heading text-2xl font-bold text-white">
                  Tensora Headquarters
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Connect directly with our creative directors and systems architects.
                </p>
              </div>

              {/* Official Email Display */}
              <div className="p-4 rounded-2xl bg-[#0D294A] border border-[#D8B070]/30 space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs text-gray-400 font-mono-tech">
                  <span>OFFICIAL INBOX</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    ACTIVE
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-tech text-xs sm:text-sm font-bold text-[#FFF1D6] truncate">
                    tensora26llp@gmail.com
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-[#071A33] hover:bg-[#D8B070]/20 text-[#D8B070] transition-colors flex-shrink-0"
                    title="Copy Email Address"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Response SLA */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0D294A] text-[#D8B070] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#FFF1D6]">
                      Response Guarantee
                    </h4>
                    <p className="text-xs text-gray-300">
                      All inquiries received during business hours receive technical feedback within &lt; 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0D294A] text-[#10B981] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#FFF1D6]">
                      Dedicated Account Manager
                    </h4>
                    <p className="text-xs text-gray-300">
                      Direct Slack/Discord/Email channel with your project lead from kickoff to deployment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0D294A] text-[#E0C38A] flex items-center justify-center flex-shrink-0">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#FFF1D6]">
                      Worldwide Remote Operations
                    </h4>
                    <p className="text-xs text-gray-300">
                      Serving visionary enterprises, founders, and creators across global timezones.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Tagline */}
              <div className="mt-8 pt-4 border-t border-white/10 text-center">
                <span className="font-serif-luxury text-xs font-bold tracking-[0.25em] text-[#D8B070]">
                  CREATE. CONNECT. GROW.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
