import React from 'react';
import { Truck, Home, Phone, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface NotFoundProps {
  onBackHome: () => void;
  onQuoteClick: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onBackHome, onQuoteClick }) => {
  return (
    <div className="min-h-screen bg-[#070B19] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-slate-800 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4 text-amber-400">
          <Truck className="w-8 h-8" />
        </div>

        <div className="text-4xl font-black font-mono text-amber-400 mb-2">404</div>

        <h2 className="text-2xl font-bold text-white mb-2">
          Looks like this move took a wrong turn.
        </h2>

        <p className="text-slate-400 text-sm mb-6">
          The relocation route or page you are searching for doesn’t exist or has moved to a new destination.
        </p>

        <div className="space-y-3">
          <button
            onClick={onBackHome}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <button
            onClick={onQuoteClick}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-4 h-4 text-amber-400" />
            <span>Get a Free Moving Quote</span>
          </button>

          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Call JJJ: {BUSINESS_INFO.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
