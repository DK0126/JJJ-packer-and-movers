/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorks } from './components/HowItWorks';
import { IndiaMapSection } from './components/IndiaMapSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { TrustStatsSection } from './components/TrustStatsSection';
import { QuoteFormSection } from './components/QuoteFormSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp, MobileQuickBar } from './components/FloatingWhatsApp';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalModal } from './components/LegalModals';
import { LocationModal } from './components/LocationModal';
import { NotFound } from './components/NotFound';
import { BUSINESS_INFO } from './data/businessData';
import { MovingType, BusinessConfig } from './types';
import { MotionProvider } from './context/MotionContext';

export default function App() {
  const [businessConfig, setBusinessConfig] = useState<BusinessConfig>(BUSINESS_INFO);
  const [selectedMovingType, setSelectedMovingType] = useState<MovingType | undefined>(undefined);
  const [selectedDestination, setSelectedDestination] = useState<string | undefined>(undefined);

  // Modals & Panels
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'cookies' | null>(null);
  const [locationModalSlug, setLocationModalSlug] = useState<string | null>(null);
  const [is404, setIs404] = useState<boolean>(false);

  // Sync latest editable stats from backend
  useEffect(() => {
    fetch('/api/admin/config')
      .then(res => res.json())
      .then(data => {
        if (data.config) {
          setBusinessConfig(prev => ({
            ...prev,
            ...data.config,
            stats: {
              ...prev.stats,
              ...(data.config.stats || {})
            }
          }));
        }
      })
      .catch(err => {
        console.log('Using local fallback configuration');
      });
  }, []);

  const scrollToQuote = (service?: MovingType, destination?: string) => {
    if (service) setSelectedMovingType(service);
    if (destination) setSelectedDestination(destination);

    const quoteElement = document.getElementById('quote-section');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (is404) {
    return (
      <NotFound
        onBackHome={() => setIs404(false)}
        onQuoteClick={() => {
          setIs404(false);
          setTimeout(() => scrollToQuote(), 100);
        }}
      />
    );
  }

  return (
    <MotionProvider>
      <div className="min-h-screen bg-white text-[#0F172A] flex flex-col selection:bg-[#F47B20] selection:text-white">
        {/* Sticky Navigation Bar */}
      <Navbar
        onQuoteClick={() => scrollToQuote()}
        onAdminClick={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Cinematic 3D Truck Hero Section */}
        <HeroSection onQuoteClick={() => scrollToQuote()} />

        {/* 2. About Section */}
        <AboutSection />

        {/* 3. 9 Dedicated Interactive Services */}
        <ServicesSection
          onSelectServiceForQuote={(serviceName) => scrollToQuote(serviceName)}
        />

        {/* 4. How It Works 4-Step Animated Timeline */}
        <HowItWorks onQuoteClick={() => scrollToQuote()} />

        {/* 5. Interactive India Service Map */}
        <IndiaMapSection
          onRouteQuoteClick={(cityName) => scrollToQuote('Intercity Shifting', cityName)}
        />

        {/* 6. Why Choose JJJ */}
        <WhyChooseSection />

        {/* 7. Trust Statistics (Clearly marked editable placeholders) */}
        <TrustStatsSection
          stats={businessConfig.stats}
          onEditClick={() => setIsAdminOpen(true)}
        />

        {/* 8. Full Quotation Enquiry Form System */}
        <QuoteFormSection
          preselectedMovingType={selectedMovingType}
          preselectedDestination={selectedDestination}
        />

        {/* 9. Relocation & Packaging Gallery */}
        <GallerySection onQuoteClick={(type) => scrollToQuote(type as MovingType)} />

        {/* 10. Reviews & Testimonials Section */}
        <ReviewsSection onAdminClick={() => setIsAdminOpen(true)} />

        {/* 11. FAQ Section */}
        <FaqSection />

        {/* 12. Final Call-To-Action */}
        <FinalCtaSection onQuoteClick={() => scrollToQuote()} />

        {/* 13. Contact Depot & Interactive Map */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onLegalClick={(type) => setLegalModalType(type)}
        onLocationClick={(slug) => setLocationModalSlug(slug)}
        onAdminClick={() => setIsAdminOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileQuickBar onQuoteClick={() => scrollToQuote()} />

      {/* Admin Dashboard Console Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onConfigUpdated={(newConfig) => setBusinessConfig(newConfig)}
      />

      {/* Legal Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Location Modal */}
      <LocationModal
        slug={locationModalSlug}
        onClose={() => setLocationModalSlug(null)}
        onQuoteForLocation={(cityName) => scrollToQuote('Intercity Shifting', cityName)}
      />
      </div>
    </MotionProvider>
  );
}
