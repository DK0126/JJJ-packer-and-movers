import React from 'react';
import { X, MapPin, Truck, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { LOCATION_PAGES, BUSINESS_INFO } from '../data/businessData';

interface LocationModalProps {
  slug: string | null;
  onClose: () => void;
  onQuoteForLocation: (cityName: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ 
  slug, 
  onClose, 
  onQuoteForLocation 
}) => {
  if (!slug) return null;

  const location = LOCATION_PAGES.find(l => l.slug === slug);
  if (!location) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-[#091124] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close location modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
          <MapPin className="w-4 h-4" />
          <span>Logistics Corridor Hub</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">
          {location.title}
        </h3>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {location.summary}
        </p>

        {/* Popular Route Links */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Representative Route Connections
          </h4>
          <div className="flex flex-wrap gap-2">
            {location.popularRoutes.map((route, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                <span>{route}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 mb-6 space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>24/7 direct dispatch & tracking updates.</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Closed container trucks with heavy-duty weatherproofing.</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onQuoteForLocation(location.name);
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>Request Quote for {location.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
