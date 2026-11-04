import React from 'react';
import { Phone, MessageSquare, Mail, MapPin, Clock, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA, LOCATION_PAGES } from '../data/businessData';

interface FooterProps {
  onLegalClick: (type: 'privacy' | 'terms' | 'cookies') => void;
  onLocationClick: (slug: string) => void;
  onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onLegalClick, 
  onLocationClick, 
  onAdminClick 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A1C33] text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 text-white font-heading text-2xl font-bold tracking-tight mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#F47B20] flex items-center justify-center text-white shadow-md">
                <span className="font-extrabold text-sm text-[#102B4E]">JJJ</span>
              </div>
              <span>JJJ Packers & Movers</span>
            </div>

            <p className="text-[#F47B20] font-heading font-semibold text-sm mb-4">
              “{BUSINESS_INFO.tagline}”
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mb-6">
              Premier corporate & residential relocation and logistics partner based in Guduvancheri (Chennai), 
              safely transporting household goods, office assets, and vehicles across all Indian states.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F47B20] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#F47B20] shrink-0" />
                <span>Operating Hours: 24 Hours / 7 Days a Week</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F47B20] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-white font-bold transition-colors">
                  Helpline: +91 {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F47B20] shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#hero" className="hover:text-[#F47B20] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#F47B20] transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-[#F47B20] transition-colors">Relocation Services</a></li>
              <li><a href="#how-it-works" className="hover:text-[#F47B20] transition-colors">How It Works</a></li>
              <li><a href="#network" className="hover:text-[#F47B20] transition-colors">Highway Corridors</a></li>
              <li><a href="#why-us" className="hover:text-[#F47B20] transition-colors">Why Choose JJJ</a></li>
              <li><a href="#gallery" className="hover:text-[#F47B20] transition-colors">Packing Gallery</a></li>
              <li><a href="#faq" className="hover:text-[#F47B20] transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-[#F47B20] transition-colors">Contact Depot</a></li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {SERVICES_DATA.slice(0, 8).map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-[#F47B20] transition-colors">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Express Corridors & Admin */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Express Corridors
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 mb-6">
              {LOCATION_PAGES.slice(0, 6).map((loc) => (
                <li key={loc.slug}>
                  <button
                    onClick={() => onLocationClick(loc.slug)}
                    className="hover:text-[#F47B20] transition-colors text-left"
                  >
                    Chennai to {loc.name}
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-slate-200 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Legal, Verification & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} JJJ Packers & Movers. All rights reserved.</span>
            <span>•</span>
            <button
              onClick={() => onLegalClick('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onLegalClick('terms')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onLegalClick('cookies')}
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </button>
            <button
              onClick={onAdminClick}
              className="text-slate-500 hover:text-[#F47B20] transition-colors ml-2"
              title="Admin Portal Access"
            >
              [Admin Portal]
            </button>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Chennai Reg. Logistics Provider</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
