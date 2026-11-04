import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Shield, Lock, EyeOff, Truck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { useReducedMotion } from '../context/MotionContext';

interface NavbarProps {
  onQuoteClick: () => void;
  onAdminClick: () => void;
  isAdminOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onQuoteClick, onAdminClick }) => {
  const { prefersReducedMotion, toggleReducedMotion } = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Routes', href: '#network' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-md shadow-[#102B4E]/5'
          : 'py-3.5 bg-white/90 backdrop-blur-sm border-b border-slate-200/60 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brandmark */}
          <a
            href="#hero"
            className="flex items-center gap-3 group text-decoration-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#102B4E] flex items-center justify-center text-white shadow-md shadow-[#102B4E]/20 group-hover:bg-[#0A1C33] transition-colors shrink-0">
              <span className="font-heading font-black text-sm tracking-tight text-[#F47B20]">JJJ</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg sm:text-xl text-[#102B4E] tracking-tight leading-tight group-hover:text-[#F47B20] transition-colors">
                JJJ Packers & Movers
              </span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider hidden sm:block">
                Moving Your World, Safely & Smoothly
              </span>
            </div>
          </a>

          {/* Clean Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 hover:text-[#F47B20] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-[#F47B20] after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Call Button (Desktop) */}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="hidden md:flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#102B4E] hover:text-white bg-slate-100 hover:bg-[#102B4E] rounded-xl border border-slate-200 transition-all shadow-sm"
              title="Call 24/7 Helpline"
            >
              <Phone className="w-3.5 h-3.5 text-[#F47B20]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            {/* Primary Strong Orange CTA: Get Free Quote */}
            <button
              onClick={onQuoteClick}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold text-white bg-[#F47B20] hover:bg-[#DE6811] active:scale-95 rounded-xl shadow-md shadow-[#F47B20]/25 transition-all whitespace-nowrap uppercase tracking-wider"
            >
              Get a Quote
            </button>

            {/* Accessibility Reduced Motion Toggle */}
            <button
              onClick={toggleReducedMotion}
              title={prefersReducedMotion ? 'Motion: Reduced (Click for full animations)' : 'Motion: Standard (Click to reduce motion)'}
              className={`p-2 rounded-xl transition-colors border ${
                prefersReducedMotion
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'text-slate-500 hover:text-[#102B4E] hover:bg-slate-100 border-slate-200'
              }`}
              aria-label="Toggle reduced motion accessibility mode"
            >
              <EyeOff className="w-4 h-4" />
            </button>

            {/* Admin Portal Icon Link */}
            <button
              onClick={onAdminClick}
              title="Admin Portal"
              className="p-2 text-slate-400 hover:text-[#102B4E] hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200"
              aria-label="Open Admin Dashboard"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:text-[#102B4E] rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-5 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#F47B20] hover:bg-slate-50 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5 mt-2">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-sm font-bold text-[#102B4E]"
              >
                <Phone className="w-4 h-4 text-[#F47B20]" />
                <span>Call Helpline: {BUSINESS_INFO.phone}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onQuoteClick();
                }}
                className="w-full py-3 rounded-xl bg-[#F47B20] hover:bg-[#DE6811] text-white font-bold text-sm shadow-md shadow-[#F47B20]/25 transition-all"
              >
                GET FREE QUOTE
              </button>

              <button
                onClick={() => {
                  toggleReducedMotion();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600"
              >
                <span className="flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-[#F47B20]" />
                  <span>Reduced Motion (Accessibility)</span>
                </span>
                <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                  prefersReducedMotion ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {prefersReducedMotion ? 'ACTIVE' : 'OFF'}
                </span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
