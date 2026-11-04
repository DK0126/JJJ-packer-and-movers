import React, { useState } from 'react';
import { INDIA_ROUTES, RouteCity } from '../data/businessData';
import { MapPin, Clock, ShieldCheck, ArrowRight, Truck, CheckCircle2, Eye, Sparkles } from 'lucide-react';
import { useReducedMotion } from '../context/MotionContext';

interface StaticMapFallbackProps {
  onRouteQuoteClick: (cityName: string) => void;
}

export const StaticMapFallback: React.FC<StaticMapFallbackProps> = ({ onRouteQuoteClick }) => {
  const { toggleReducedMotion } = useReducedMotion();
  const [activeCity, setActiveCity] = useState<RouteCity>(INDIA_ROUTES[0]);

  // Chennai Hub coordinates in the 0-100 SVG coordinate system
  const chennaiX = 52;
  const chennaiY = 78;

  const totalEstHours = Math.round((activeCity.distanceKm / 55) * 1.3);

  return (
    <div className="relative">
      {/* Accessibility Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Static Accessible Map View
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
            Zero Motion • High Contrast
          </span>
        </div>

        <button
          onClick={toggleReducedMotion}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 text-xs font-semibold transition-colors"
          title="Switch to animated transit map"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Switch to Animated Map</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Static Map Graphic (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-700/80 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#091124] to-[#050A17]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Corridor Schematic
              </span>
              <span className="text-xs text-slate-400">· All-India Transit Network</span>
            </div>
            <div className="text-xs text-slate-400">
              Hub: <strong className="text-white">Guduvancheri, Chennai</strong>
            </div>
          </div>

          {/* High-Contrast Static SVG Map */}
          <div className="relative w-full aspect-[4/3] max-h-[460px] mx-auto">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full filter drop-shadow-lg"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label={`Static route map from Chennai to ${activeCity.name}`}
            >
              {/* Stylized High-Contrast India Landmass Outline */}
              <path
                d="M 35 12
                   L 46 12
                   L 55 20
                   L 58 25
                   L 68 28
                   L 80 30
                   L 86 35
                   L 80 42
                   L 72 45
                   L 72 52
                   L 62 62
                   L 56 75
                   L 53 88
                   L 48 95
                   L 46 95
                   L 44 88
                   L 38 78
                   L 32 68
                   L 30 55
                   L 26 48
                   L 22 42
                   L 25 35
                   L 32 26
                   Z"
                fill="#0A152E"
                stroke="#1E3A8A"
                strokeWidth="1.2"
              />

              {/* State Grid & Latitude / Longitude lines */}
              <line x1="20" y1="30" x2="85" y2="30" stroke="#172554" strokeWidth="0.4" strokeDasharray="1 3" />
              <line x1="20" y1="50" x2="85" y2="50" stroke="#172554" strokeWidth="0.4" strokeDasharray="1 3" />
              <line x1="20" y1="70" x2="85" y2="70" stroke="#172554" strokeWidth="0.4" strokeDasharray="1 3" />
              <line x1="40" y1="15" x2="40" y2="90" stroke="#172554" strokeWidth="0.4" strokeDasharray="1 3" />
              <line x1="60" y1="15" x2="60" y2="90" stroke="#172554" strokeWidth="0.4" strokeDasharray="1 3" />

              {/* Static Arterial Highways from Chennai (Stationary, Non-Pulsing) */}
              {INDIA_ROUTES.map((route) => {
                const isSelected = activeCity.id === route.id;
                const curveMidX = (chennaiX + route.x) / 2 + (route.x > chennaiX ? 3 : -3);
                const curveMidY = (chennaiY + route.y) / 2;
                return (
                  <g key={route.id}>
                    <path
                      d={`M ${chennaiX} ${chennaiY} Q ${curveMidX} ${curveMidY} ${route.x} ${route.y}`}
                      fill="none"
                      stroke={isSelected ? '#F59E0B' : '#1E293B'}
                      strokeWidth={isSelected ? '2.0' : '0.8'}
                      strokeDasharray={isSelected ? 'none' : '2 2'}
                    />
                  </g>
                );
              })}

              {/* Static Midpoint Route Indicator (Stationary truck glyph) */}
              {(() => {
                const curveMidX = (chennaiX + activeCity.x) / 2 + (activeCity.x > chennaiX ? 3 : -3);
                const curveMidY = (chennaiY + activeCity.y) / 2;
                return (
                  <g transform={`translate(${curveMidX}, ${curveMidY})`}>
                    <circle cx="0" cy="0" r="3.2" fill="#F59E0B" stroke="#0F172A" strokeWidth="0.6" />
                    <rect x="-1.2" y="-1.0" width="1.8" height="2.0" rx="0.3" fill="#0A1128" />
                    <rect x="0.6" y="-0.5" width="0.8" height="1.5" rx="0.2" fill="#0A1128" />
                  </g>
                );
              })()}

              {/* Chennai Origin Hub Marker (Stationary) */}
              <g>
                <circle cx={chennaiX} cy={chennaiY} r="3.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
                <rect x={chennaiX + 2.5} y={chennaiY - 3.5} width="22" height="7" rx="1.5" fill="#0A1128" stroke="#F59E0B" strokeWidth="0.6" />
                <text x={chennaiX + 13.5} y={chennaiY + 1.2} fill="#FFFFFF" fontSize="3" fontWeight="bold" textAnchor="middle">
                  CHENNAI (HUB)
                </text>
              </g>

              {/* Destination City Nodes (Stationary) */}
              {INDIA_ROUTES.map((route) => {
                const isSelected = activeCity.id === route.id;
                return (
                  <g
                    key={route.id}
                    onClick={() => setActiveCity(route)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={route.x}
                      cy={route.y}
                      r={isSelected ? '3.5' : '2.2'}
                      fill={isSelected ? '#F59E0B' : '#1E293B'}
                      stroke={isSelected ? '#FFFFFF' : '#64748B'}
                      strokeWidth="0.8"
                    />
                    <circle cx={route.x} cy={route.y} r="1" fill="#FFFFFF" />
                    <text
                      x={route.x}
                      y={route.y - 3.5}
                      fill={isSelected ? '#FBBF24' : '#94A3B8'}
                      fontSize="2.8"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      textAnchor="middle"
                    >
                      {route.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="text-center mt-3 text-xs text-slate-400">
            Selected Route: <span className="text-amber-400 font-bold">Chennai ➔ {activeCity.name}</span> (~{activeCity.distanceKm} KM)
          </div>
        </div>

        {/* Selected Route Info (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-700/80 shadow-xl mb-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Static Route Card
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Chennai ➔ {activeCity.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Highway Distance</span>
                <div className="text-amber-400 font-mono font-bold text-lg">
                  ~{activeCity.distanceKm} KM
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Estimated Transit Schedule</div>
                  <div className="text-sm font-semibold text-white">
                    {activeCity.typicalTime} (~{totalEstHours} hours door-to-door)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Transit Guarantees</div>
                  <div className="text-sm text-slate-300">{activeCity.highlight}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Delivery Coverage</div>
                  <div className="text-sm text-slate-300">
                    Full municipal area and adjacent tech corridors for {activeCity.name}.
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onRouteQuoteClick(activeCity.name)}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Get Quote For Chennai ➔ {activeCity.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick City Selector Pill List */}
          <div className="flex flex-wrap gap-2">
            {INDIA_ROUTES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCity(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeCity.id === c.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Static Visual Progress Bar (Non-Looping, Clear Mile-Marker Milestone) */}
      <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Route Schedule Summary
              </span>
              <h4 className="text-base font-bold text-white leading-tight">
                Chennai Central Depot ➔ {activeCity.name} Hub
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 font-mono">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Route Time</span>
              <span className="text-white font-bold text-sm">{activeCity.typicalTime}</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Total Distance</span>
              <span className="text-amber-400 font-bold text-sm">{activeCity.distanceKm} KM</span>
            </div>
          </div>
        </div>

        {/* Milestone Steps Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-2">
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] font-mono text-amber-400 uppercase font-bold">Stage 01</div>
            <div className="text-xs font-bold text-white mt-0.5">Chennai Hub Loading</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Guduvancheri dispatch & container seal</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] font-mono text-amber-400 uppercase font-bold">Stage 02</div>
            <div className="text-xs font-bold text-white mt-0.5">NH Interstate Transit</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Secure tollway cruise & border pass</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] font-mono text-amber-400 uppercase font-bold">Stage 03</div>
            <div className="text-xs font-bold text-white mt-0.5">Regional Ring Road</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Scheduled arrival at local hub</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Stage 04</div>
            <div className="text-xs font-bold text-white mt-0.5">{activeCity.name} Delivery</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Supervised doorstep unboxing</div>
          </div>
        </div>
      </div>
    </div>
  );
};
