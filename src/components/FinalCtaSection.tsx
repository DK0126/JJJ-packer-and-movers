import React from 'react';
import { ArrowRight, MessageSquare, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface FinalCtaSectionProps {
  onQuoteClick: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onQuoteClick }) => {
  const whatsappUrl = `https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(
    'Hi JJJ Packers & Movers, I am ready to plan my move and would like a free quotation.'
  )}`;

  return (
    <section className="py-20 lg:py-24 bg-[#102B4E] relative overflow-hidden text-white">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F47B20]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#F47B20]" />
          <span className="text-xs font-semibold text-white tracking-wide">
            Chennai Base · Nationwide Relocation Service
          </span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5">
          Ready for a Smooth, Worry-Free Move?
        </h2>

        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed mb-8">
          Tell us your origin, destination, and expected date. Our experienced relocation team will coordinate a comprehensive plan with multi-layer protective packaging and dedicated transport.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-8">
          {/* Strong Orange CTA */}
          <button
            onClick={onQuoteClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F47B20] hover:bg-[#DE6811] active:scale-95 text-white font-heading font-bold text-sm tracking-wide shadow-xl shadow-[#F47B20]/30 transition-all flex items-center justify-center gap-2 group"
          >
            <span>GET FREE QUOTE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>WhatsApp Us</span>
          </a>

          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#F47B20]" />
            <span>Call {BUSINESS_INFO.phone}</span>
          </a>
        </div>

        {/* Trust Badges bottom */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#F47B20]" />
            Zero Hidden Surcharges
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#F47B20]" />
            Free Pre-Move Survey
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#F47B20]" />
            24/7 Dedicated Coordinator
          </span>
        </div>
      </div>
    </section>
  );
};
