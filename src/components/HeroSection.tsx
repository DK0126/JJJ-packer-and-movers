import React, { useState } from 'react';
import { 
  Phone, MessageSquare, ArrowRight, ShieldCheck, Clock, MapPin, Truck, 
  Calendar, User, CheckCircle2, Play, Sparkles 
} from 'lucide-react';
import { ThreeTruckScene } from './ThreeTruckScene';
import { StaticTruckFallback } from './StaticTruckFallback';
import { useReducedMotion } from '../context/MotionContext';
import { BUSINESS_INFO } from '../data/businessData';

interface HeroSectionProps {
  onQuoteClick: (service?: any, destination?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onQuoteClick }) => {
  const { prefersReducedMotion } = useReducedMotion();
  const [showInteractive3D, setShowInteractive3D] = useState<boolean>(false);

  // Quick inquiry state inside hero
  const [quickForm, setQuickForm] = useState({
    pickup: 'Chennai (Guduvancheri)',
    destination: '',
    movingDate: '',
    name: '',
    phone: '',
  });

  const whatsappUrl = `https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(
    'Hi JJJ Packers & Movers, I would like to get a free quotation for my move.'
  )}`;

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuoteClick(undefined, quickForm.destination || undefined);
  };

  return (
    <section id="hero" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#102B4E]">
      {/* 1. Full-Width Moving Truck Hero Photographic Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2000&q=85"
          alt="JJJ Packers and Movers moving truck traveling across highway"
          className="w-full h-full object-cover object-center opacity-30 brightness-90 contrast-110"
        />
        {/* Navy corporate depth gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1C33] via-[#102B4E]/90 to-[#102B4E]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102B4E] via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Operational Announcement Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-md mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F47B20] animate-pulse" />
          <span className="text-xs font-semibold text-white tracking-wide">
            HQ: #16 GST Road, Guduvancheri (Chennai) · Pan-India Relocation
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Bold Typography & Main Call to Actions */}
          <div className="lg:col-span-7 text-left">
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-5">
              Moving Your World, <br />
              <span className="text-[#F47B20]">Safely & Smoothly.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 max-w-xl font-normal leading-relaxed mb-8">
              JJJ Packers & Movers delivers dependable residential shifting, corporate office relocation, 
              and specialized vehicle transportation across India with high-grade protective packaging and 24/7 dedicated assistance.
            </p>

            {/* Three Primary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-10">
              {/* Primary Strong Orange CTA */}
              <button
                onClick={() => onQuoteClick()}
                className="px-7 py-3.5 rounded-xl bg-[#F47B20] hover:bg-[#DE6811] active:scale-95 text-white font-heading font-bold text-sm tracking-wide shadow-lg shadow-[#F47B20]/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>GET FREE QUOTE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA: WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Us</span>
              </a>

              {/* Third CTA: Call Now */}
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#F47B20]" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>

            {/* Key Trust Highlights Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#F47B20]" />
                </div>
                <div className="text-xs">
                  <div className="text-slate-300">Base Depot</div>
                  <div className="text-white font-bold">Chennai Hub</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-[#F47B20]" />
                </div>
                <div className="text-xs">
                  <div className="text-slate-300">Coverage</div>
                  <div className="text-white font-bold">All Over India</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#F47B20]" />
                </div>
                <div className="text-xs">
                  <div className="text-slate-300">Operations</div>
                  <div className="text-white font-bold">24 Hours / 7 Days</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#F47B20]" />
                </div>
                <div className="text-xs">
                  <div className="text-slate-300">Materials</div>
                  <div className="text-white font-bold">5-Ply Packaging</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Moving Cost Enquiry Card (Requirement 5) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
              {/* Badge */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F47B20]" />
                  <span className="font-heading font-bold text-sm text-[#102B4E]">Instant Cost Enquiry</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Zero Obligation
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-[#102B4E] mb-1">
                Calculate Moving Cost
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Get an instant estimate for your home, office, or vehicle relocation.
              </p>

              <form onSubmit={handleQuickSubmit} className="space-y-3.5">
                {/* Pickup Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={quickForm.pickup}
                      onChange={(e) => setQuickForm({ ...quickForm, pickup: e.target.value })}
                      placeholder="e.g. Guduvancheri, Chennai"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F47B20] focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Destination Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Destination City / Address
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#F47B20] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={quickForm.destination}
                      onChange={(e) => setQuickForm({ ...quickForm, destination: e.target.value })}
                      placeholder="e.g. Bengaluru, Hyderabad, Delhi..."
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F47B20] focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Moving Date & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Moving Date
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        value={quickForm.movingDate}
                        onChange={(e) => setQuickForm({ ...quickForm, movingDate: e.target.value })}
                        className="w-full pl-10 pr-2.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F47B20] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={quickForm.phone}
                        onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                        placeholder="10-digit Mobile"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F47B20] focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={quickForm.name}
                      onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F47B20] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#F47B20] hover:bg-[#DE6811] active:scale-[0.99] text-white font-heading font-bold text-sm tracking-wide shadow-md shadow-[#F47B20]/30 transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <span>GET FREE MOVING ESTIMATE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5 text-[#102B4E] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Free Home Survey
                </span>
                <span className="flex items-center gap-1.5 text-[#102B4E] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Transparent Pricing
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Optional 3D Truck Simulation Journey Switcher */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#F47B20]/20 text-[#F47B20]">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Simulated Transit Experience (Kanyakumari to Kashmir)
              </span>
            </div>

            <button
              onClick={() => setShowInteractive3D(!showInteractive3D)}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 text-[#F47B20]" />
              <span>{showInteractive3D ? 'Hide 3D Journey Simulation' : 'View Interactive 3D Journey Animation'}</span>
            </button>
          </div>

          {showInteractive3D && (
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#070B19] p-4 animate-in fade-in zoom-in-95 duration-300">
              {prefersReducedMotion ? <StaticTruckFallback /> : <ThreeTruckScene />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
