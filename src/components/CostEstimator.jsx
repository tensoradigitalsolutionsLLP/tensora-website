import React, { useState } from 'react';
import { X, Calculator, Check, ArrowRight, Sparkles, Sliders } from 'lucide-react';

export default function CostEstimator({ isOpen, onClose, onApplyToContact, initialService = '' }) {
  const [selectedServices, setSelectedServices] = useState(
    initialService ? [initialService] : ['Website Development']
  );
  const [platformTier, setPlatformTier] = useState('Standard');
  const [timelineSpeed, setTimelineSpeed] = useState('Standard');
  const [needsMaintenance, setNeedsMaintenance] = useState(true);

  if (!isOpen) return null;

  const servicesOptions = [
    { name: 'Website Development', base: 450 },
    { name: 'App Development', base: 850 },
    { name: 'Game Development', base: 950 },
    { name: 'Graphic Design', base: 250 },
    { name: '3D Modelling', base: 400 },
    { name: 'Video Editing', base: 300 },
    { name: 'UI/UX Design', base: 380 },
    { name: 'Custom Solutions', base: 700 }
  ];

  const toggleService = (name) => {
    if (selectedServices.includes(name)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== name));
      }
    } else {
      setSelectedServices([...selectedServices, name]);
    }
  };

  // Calculate rough estimate
  let baseSum = 0;
  servicesOptions.forEach((opt) => {
    if (selectedServices.includes(opt.name)) {
      baseSum += opt.base;
    }
  });

  const tierMultiplier = platformTier === 'Enterprise' ? 1.8 : platformTier === 'Pro Growth' ? 1.35 : 1.0;
  const speedMultiplier = timelineSpeed === 'Express Rush' ? 1.25 : 1.0;
  const maintenanceAddon = needsMaintenance ? 150 : 0;

  const estimatedTotal = Math.round(baseSum * tierMultiplier * speedMultiplier + maintenanceAddon);

  const handleApply = () => {
    const summary = {
      services: selectedServices.join(', '),
      tier: platformTier,
      timeline: timelineSpeed,
      estimatedRange: `₹${estimatedTotal} - ₹${Math.round(estimatedTotal * 1.3)}`,
      rawEstimate: estimatedTotal
    };
    onApplyToContact(summary);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#071A33]/90 backdrop-blur-xl animate-fade-in">
      
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0B1220] border border-[#D8B070]/60 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(216,176,112,0.3)] text-white p-6 sm:p-8 my-8 text-left overflow-hidden">
        
        {/* Top Glow */}
        <div className="absolute -top-10 right-10 w-72 h-40 bg-[#D8B070]/20 blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
          aria-label="Close estimator"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D8B070] to-[#B88A4C] p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#071A33] rounded-[10px] flex items-center justify-center">
              <Calculator className="w-5 h-5 text-[#E0C38A]" />
            </div>
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Project Scope & Cost Estimator
            </h3>
            <p className="text-xs font-mono-tech text-[#D8B070]">
              Instant scope builder for Tensora Digital Solutions
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="space-y-6 my-6 text-xs sm:text-sm">
          
          {/* Step 1: Select Services */}
          <div>
            <label className="block text-xs font-mono-tech uppercase font-bold text-gray-300 mb-2.5">
              1. Choose Needed Services (Multi-Select)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {servicesOptions.map((opt) => {
                const isSelected = selectedServices.includes(opt.name);
                return (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => toggleService(opt.name)}
                    className={`p-2.5 rounded-xl text-left text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-[#D8B070] text-[#071A33] border-[#FFF1D6] font-bold shadow-md'
                        : 'bg-[#071A33] text-gray-300 border-white/10 hover:border-[#D8B070]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="truncate">{opt.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Scale / Complexity Tier */}
          <div>
            <label className="block text-xs font-mono-tech uppercase font-bold text-gray-300 mb-2.5">
              2. Platform Scale & Complexity Tier
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {['Standard MVP', 'Pro Growth', 'Enterprise'].map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setPlatformTier(tier)}
                  className={`p-3 rounded-xl text-center text-xs font-semibold transition-all border ${
                    platformTier === tier
                      ? 'bg-gradient-to-r from-[#FFF1D6] to-[#D8B070] text-[#071A33] font-bold border-white'
                      : 'bg-[#071A33] text-gray-300 border-white/10 hover:border-[#D8B070]/40'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Timeline Delivery Speed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-tech uppercase font-bold text-gray-300 mb-2">
                3. Delivery Timeline
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Standard', 'Express Rush'].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => setTimelineSpeed(speed)}
                    className={`py-2 px-3 rounded-xl text-center text-xs font-semibold border ${
                      timelineSpeed === speed
                        ? 'bg-[#D8B070] text-[#071A33] font-bold border-white'
                        : 'bg-[#071A33] text-gray-300 border-white/10'
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-tech uppercase font-bold text-gray-300 mb-2">
                4. Post-Launch Maintenance & Support
              </label>
              <button
                type="button"
                onClick={() => setNeedsMaintenance(!needsMaintenance)}
                className={`w-full py-2 px-3 rounded-xl text-center text-xs font-semibold border ${
                  needsMaintenance
                    ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/60 font-bold'
                    : 'bg-[#071A33] text-gray-400 border-white/10'
                }`}
              >
                {needsMaintenance ? '✓ Include SLA Maintenance' : 'Self-Maintained'}
              </button>
            </div>
          </div>

        </div>

        {/* Estimate Result Box */}
        <div className="p-4 rounded-2xl bg-[#071A33] border border-[#D8B070]/40 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-mono-tech text-gray-400 uppercase tracking-wider block">
              Estimated Investment Range
            </span>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-gold-gradient">
              ₹${estimatedTotal} — ₹${Math.round(estimatedTotal * 1.35)}
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">
              *Approximate guideline. Final quote customized based on exact specs.
            </p>
          </div>

          <button
            onClick={handleApply}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-[#071A33] bg-gradient-to-r from-[#FFF1D6] via-[#D8B070] to-[#B88A4C] hover:shadow-lg transition-all"
          >
            <span>Apply To Contact Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
