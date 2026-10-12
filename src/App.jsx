import React, { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Process from './components/Process';
import Projects from './components/Projects';
import AdminPortal from './components/AdminPortal';
import TechCreative from './components/TechCreative';
import CostEstimator from './components/CostEstimator';
import CTASection from './components/CTASection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';

export default function App() {
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [estimatorInitialService, setEstimatorInitialService] = useState('');
  const [appliedEstimate, setAppliedEstimate] = useState(null);
  const [activeToast, setActiveToast] = useState(null);

  if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
    return <AdminPortal />;
  }

  const showToast = (toastData) => {
    setActiveToast(toastData);
    setTimeout(() => {
      setActiveToast(null);
    }, 4500);
  };

  const handleOpenEstimator = (serviceName = '') => {
    setEstimatorInitialService(serviceName);
    setIsEstimatorOpen(true);
  };

  const handleApplyEstimate = (summary) => {
    setAppliedEstimate(summary);
    showToast({
      type: 'info',
      title: 'Scope Applied to Contact Form',
      message: `Configured: ${summary.services} (${summary.estimatedRange})`
    });

    // Scroll to contact form smoothly
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromHero = (serviceId) => {
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#071A33] relative selection:bg-[#D8B070] selection:text-[#071A33]">
      {/* Background Interactive Ambient Canvas */}
      <ParticleBackground />

      {/* Sticky Header / Navbar */}
      <Navbar onOpenEstimate={() => handleOpenEstimator()} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          onSelectService={handleSelectServiceFromHero}
          onOpenEstimate={() => handleOpenEstimator()}
        />

        <About onOpenEstimate={() => handleOpenEstimator()} />

        <Services onOpenEstimate={handleOpenEstimator} />

        <WhyUs />

        <Process />

        <Projects />

        <TechCreative />

        <CTASection onOpenEstimate={() => handleOpenEstimator()} />

        <Contact
          appliedEstimate={appliedEstimate}
          onShowToast={showToast}
        />
      </main>

      {/* Dark Navy Footer */}
      <Footer />

      {/* Interactive Scope & Cost Estimator Modal */}
      <CostEstimator
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onApplyToContact={handleApplyEstimate}
        initialService={estimatorInitialService}
      />

      {/* Global Toast Feedback */}
      <Toast toast={activeToast} onClose={() => setActiveToast(null)} />
    </div>
  );
}
