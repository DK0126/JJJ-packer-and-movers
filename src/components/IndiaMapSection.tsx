import React, { useState, useEffect, useRef } from 'react';
import { INDIA_ROUTES, RouteCity } from '../data/businessData';
import { MapPin, Navigation, Clock, ShieldCheck, ArrowRight, Info, Truck, CheckCircle2, EyeOff } from 'lucide-react';
import { useReducedMotion } from '../context/MotionContext';
import { StaticMapFallback } from './StaticMapFallback';

interface IndiaMapSectionProps {
  onRouteQuoteClick: (cityName: string) => void;
}

export const IndiaMapSection: React.FC<IndiaMapSectionProps> = ({ onRouteQuoteClick }) => {
  const { prefersReducedMotion, toggleReducedMotion } = useReducedMotion();
  const [activeCity, setActiveCity] = useState<RouteCity>(INDIA_ROUTES[0]);
  const [truckProgress, setTruckProgress] = useState<number>(0); // 0 to 100%
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Chennai Hub coordinates in the 0-100 SVG coordinate system
  const chennaiX = 52;
  const chennaiY = 78;

  // Animation timer for simulated transit between Chennai and activeCity
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    // If user prefers reduced motion, disable requestAnimationFrame loops
    if (prefersReducedMotion) {
      setTruckProgress(100);
      return;
    }

    // Reset progress when city changes
    setTruckProgress(0);
    let startTime: number | null = null;
    const duration = 4800; // 4.8 seconds cycle per city move

    const animateTruck = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const linearProgress = (elapsed % duration) / duration;

      // Smooth easing (accelerate -> cruise -> decelerate)
      const eased = linearProgress < 0.5
        ? 2 * linearProgress * linearProgress
        : -1 + (4 - 2 * linearProgress) * linearProgress;

      setTruckProgress(Math.min(100, Math.max(0, eased * 100)));
      animRef.current = requestAnimationFrame(animateTruck);
    };

    animRef.current = requestAnimationFrame(animateTruck);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [activeCity.id, prefersReducedMotion]);

  // Calculate current interpolated truck position on map curve
  const midX = (chennaiX + activeCity.x) / 2 + (activeCity.x > chennaiX ? 3 : -3);
  const midY = (chennaiY + activeCity.y) / 2;
  const t = truckProgress / 100;

  // Quadratic Bezier interpolation: B(t) = (1-t)^2 P0 + 2(1-t)t P1 + t^2 P2
  const truckX = (1 - t) * (1 - t) * chennaiX + 2 * (1 - t) * t * midX + t * t * activeCity.x;
  const truckY = (1 - t) * (1 - t) * chennaiY + 2 * (1 - t) * t * midY + t * t * activeCity.y;

  // Elapsed vs Remaining estimated transit calculations
  const coveredKm = Math.round((truckProgress / 100) * activeCity.distanceKm);
  const remainingKm = Math.max(0, activeCity.distanceKm - coveredKm);

  // Parse typical days into numerical hours estimate for dynamic counter
  const parseEstHours = (timeStr: string) => {
    if (timeStr.includes('6-7')) return 156;
    if (timeStr.includes('5-6')) return 132;
    if (timeStr.includes('4-5')) return 108;
    if (timeStr.includes('3-4')) return 84;
    if (timeStr.includes('2-3')) return 60;
    if (timeStr.includes('1-2')) return 36;
    if (timeStr.includes('2')) return 48;
    return 24;
  };

  const totalEstHours = parseEstHours(activeCity.typicalTime);
  const elapsedHours = Math.round((truckProgress / 100) * totalEstHours);
  const remainingHours = Math.max(0, totalEstHours - elapsedHours);

  // Checkpoint milestone label along route
  const getCheckpointStatus = (p: number) => {
    if (p < 15) return 'Departing Chennai (Guduvancheri Hub) • Container Loaded';
    if (p < 40) return 'Arterial Highway Corridor Transit • Speed: 65 km/h';
    if (p < 75) return 'Interstate Toll Border Cleared • Safe Night Cruise';
    if (p < 95) return `Entering ${activeCity.name} Metropolitan Ring Road`;
    return `Arrived at ${activeCity.name} Destination Hub • Unloading Scheduled`;
  };

  return (
    <section id="network" className="py-20 lg:py-24 bg-[#F1F5F9] border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#F47B20] mb-3 shadow-sm">
            <Navigation className="w-3.5 h-3.5" />
            <span>Pan-India Logistics Corridors</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102B4E] tracking-tight mb-4">
            Relocating Across India
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Originating from our central hub in Chennai (Guduvancheri), our closed container fleet relocates goods across India with continuous timeline monitoring.
          </p>

          <div className="inline-flex items-center gap-1.5 mt-3 text-xs text-slate-600 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <Info className="w-3.5 h-3.5 text-[#F47B20]" />
            <span>Visual corridor representation. Tap any city below to track simulated transit & timeline.</span>
          </div>
        </div>

        {/* If Reduced Motion is requested, display the high-quality static accessible map view */}
        {prefersReducedMotion ? (
          <StaticMapFallback onRouteQuoteClick={onRouteQuoteClick} />
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={toggleReducedMotion}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-600 text-xs border border-slate-200 shadow-sm transition-colors"
                title="Enable reduced motion static view"
              >
                <EyeOff className="w-3.5 h-3.5 text-[#F47B20]" />
                <span>Motion: ON (Switch to Static Map)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Interactive Map Canvas (7 cols on desktop) */}
              <div className="lg:col-span-7 bg-[#102B4E] rounded-2xl p-4 sm:p-6 border border-slate-700 relative overflow-hidden shadow-xl">
            {/* Ambient map glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

            {/* SVG India Map Representation */}
            <div className="relative aspect-[4/5] sm:aspect-[1/1] w-full max-w-[540px] mx-auto">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full filter drop-shadow-lg"
              >
                {/* Stylized geometric background polygon representing India outline */}
                <path
                  d="M 38 12 
                     L 46 14 L 54 22 L 52 28 L 60 30 L 68 34 L 76 34 L 84 36 L 86 42 
                     L 82 46 L 76 44 L 74 48 L 76 56 L 66 60 L 58 70 L 54 82 L 46 92 
                     L 40 86 L 36 78 L 30 70 L 26 58 L 22 50 L 20 40 L 26 34 L 32 30 
                     L 34 22 Z"
                  fill="#0e1b38"
                  stroke="#1e325c"
                  strokeWidth="0.8"
                />

                {/* Regional internal latitude & longitude grid lines */}
                <line x1="20" y1="35" x2="80" y2="35" stroke="#162544" strokeWidth="0.4" strokeDasharray="1 2" />
                <line x1="25" y1="55" x2="75" y2="55" stroke="#162544" strokeWidth="0.4" strokeDasharray="1 2" />
                <line x1="30" y1="75" x2="60" y2="75" stroke="#162544" strokeWidth="0.4" strokeDasharray="1 2" />
                <line x1="50" y1="15" x2="50" y2="90" stroke="#162544" strokeWidth="0.4" strokeDasharray="1 2" />

                {/* Animated Routes from Chennai to each destination */}
                {INDIA_ROUTES.map((route) => {
                  const isSelected = activeCity.id === route.id;
                  const curveMidX = (chennaiX + route.x) / 2 + (route.x > chennaiX ? 3 : -3);
                  const curveMidY = (chennaiY + route.y) / 2;
                  return (
                    <g key={route.id}>
                      {/* Base route path */}
                      <path
                        d={`M ${chennaiX} ${chennaiY} Q ${curveMidX} ${curveMidY} ${route.x} ${route.y}`}
                        fill="none"
                        stroke={isSelected ? '#F59E0B' : '#334D77'}
                        strokeWidth={isSelected ? '1.5' : '0.7'}
                        strokeDasharray={isSelected ? '3 3' : '2 3'}
                        className={isSelected ? 'animate-route' : ''}
                      />
                    </g>
                  );
                })}

                {/* Live Moving Truck Icon along the Active Route */}
                <g transform={`translate(${truckX}, ${truckY})`} className="pointer-events-none">
                  {/* Outer pulse */}
                  <circle cx="0" cy="0" r="3.6" fill="none" stroke="#F59E0B" strokeWidth="0.6" opacity="0.8" className="animate-ping" />
                  <circle cx="0" cy="0" r="2.8" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="0.6" />
                  {/* Mini truck glyph */}
                  <rect x="-1.4" y="-1.0" width="2.0" height="2.0" rx="0.3" fill="#0A1128" />
                  <rect x="0.6" y="-0.6" width="0.8" height="1.6" rx="0.2" fill="#0A1128" />
                  <circle cx="-0.6" cy="1.0" r="0.4" fill="#FFFFFF" />
                  <circle cx="0.8" cy="1.0" r="0.4" fill="#FFFFFF" />
                </g>

                {/* Chennai Primary Origin Marker */}
                <g>
                  <circle cx={chennaiX} cy={chennaiY} r="7" fill="none" stroke="#F59E0B" strokeWidth="0.5" opacity="0.3" className="animate-ping" />
                  <circle cx={chennaiX} cy={chennaiY} r="4" fill="none" stroke="#F59E0B" strokeWidth="0.8" opacity="0.6" />
                  <circle cx={chennaiX} cy={chennaiY} r="2.2" fill="#F59E0B" />
                  <circle cx={chennaiX} cy={chennaiY} r="1" fill="#FFFFFF" />

                  <rect x={chennaiX + 2.5} y={chennaiY - 3.5} width="22" height="7" rx="1.5" fill="#0A1128" stroke="#F59E0B" strokeWidth="0.6" />
                  <text x={chennaiX + 13.5} y={chennaiY + 1.2} fill="#FFFFFF" fontSize="3" fontWeight="bold" textAnchor="middle">
                    CHENNAI (HUB)
                  </text>
                </g>

                {/* Destination City Nodes */}
                {INDIA_ROUTES.map((route) => {
                  const isSelected = activeCity.id === route.id;
                  return (
                    <g
                      key={route.id}
                      onClick={() => setActiveCity(route)}
                      className="cursor-pointer transition-transform"
                    >
                      <circle
                        cx={route.x}
                        cy={route.y}
                        r={isSelected ? '3.2' : '2.2'}
                        fill={isSelected ? '#F59E0B' : '#1E293B'}
                        stroke={isSelected ? '#FFFFFF' : '#64748B'}
                        strokeWidth="0.8"
                      />
                      <circle cx={route.x} cy={route.y} r="1" fill="#FFFFFF" />

                      {/* Label */}
                      <text
                        x={route.x}
                        y={route.y - 3.5}
                        fill={isSelected ? '#FBBF24' : '#94A3B8'}
                        fontSize="2.6"
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

            {/* Quick helper tip */}
            <div className="text-center mt-3 text-xs text-slate-400">
              Watching live simulated container transit: <span className="text-amber-400 font-bold">Chennai ➔ {activeCity.name}</span>
            </div>
          </div>

          {/* Active Route Details Card (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md mb-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-xs font-bold text-[#F47B20] uppercase tracking-wider">
                    Selected Route Corridor
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-[#102B4E] mt-1">
                    Chennai ➔ {activeCity.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Total Distance</span>
                  <div className="text-[#F47B20] font-heading font-black text-lg">
                    ~{activeCity.distanceKm} KM
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#F47B20] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Est. Relocation Time</div>
                    <div className="font-semibold text-slate-800">{activeCity.typicalTime} (Covered Container Transit)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#F47B20] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Service Highlights</div>
                    <div className="text-slate-600">{activeCity.highlight}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#F47B20] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Doorstep Delivery Scope</div>
                    <div className="text-slate-600">
                      Covers {activeCity.name} municipal city zones, suburbs, and industrial technology parks.
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onRouteQuoteClick(activeCity.name)}
                className="w-full py-3.5 px-4 rounded-xl bg-[#F47B20] hover:bg-[#DE6811] active:scale-95 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#F47B20]/25 flex items-center justify-center gap-2"
              >
                <span>Get Free Quote For Chennai ➔ {activeCity.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick City Selector Pill List */}
            <div className="flex flex-wrap gap-2">
              {INDIA_ROUTES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCity(c)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeCity.id === c.id
                      ? 'bg-[#102B4E] text-white shadow-md'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* VISUAL TRANSIT PROGRESS BAR BENEATH THE MAP */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900/95 via-[#0c1630] to-slate-900/95 border border-slate-800 shadow-xl">
          {/* Header Row: Origin -> Destination & Estimated Relocation Time */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    Live Transit Tracker
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <h4 className="text-base font-bold text-white leading-tight">
                  Chennai Depot ➔ {activeCity.name}
                </h4>
              </div>
            </div>

            {/* Estimated Relocation Time Metric Counters */}
            <div className="flex items-center gap-4 text-xs bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 font-mono">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Est. Relocation Time</span>
                <span className="text-white font-bold text-sm">{activeCity.typicalTime} (~{totalEstHours} hrs)</span>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Simulated Distance</span>
                <span className="text-amber-400 font-bold text-sm">{coveredKm} / {activeCity.distanceKm} KM</span>
              </div>
              <div className="h-6 w-px bg-slate-800 hidden sm:block" />
              <div className="hidden sm:block">
                <span className="text-slate-400 block text-[10px] uppercase">Time Remaining</span>
                <span className="text-emerald-400 font-bold text-sm">~{remainingHours} hrs</span>
              </div>
            </div>
          </div>

          {/* Animated Visual Progress Track */}
          <div className="relative mb-3 pt-3">
            {/* Background Track */}
            <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden relative">
              {/* Fill bar */}
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-150 relative"
                style={{ width: `${truckProgress}%` }}
              >
                {/* Glow sheen */}
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>

            {/* Moving Truck Icon Marker on the Track */}
            <div
              className="absolute top-0 -translate-x-1/2 transition-all duration-150 flex flex-col items-center pointer-events-none"
              style={{ left: `${Math.min(97, Math.max(3, truckProgress))}%` }}
            >
              <div className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black font-mono shadow-md whitespace-nowrap flex items-center gap-1">
                <Truck className="w-3 h-3" />
                <span>{Math.round(truckProgress)}%</span>
              </div>
            </div>
          </div>

          {/* Subtext with Milestones & Current Checkpoint */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2 pt-1 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-slate-300 font-medium">
                {getCheckpointStatus(truckProgress)}
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-400 text-[11px]">
              <span>Speed: <strong>60-70 km/h</strong></span>
              <span>•</span>
              <span>Weather: <strong>Protected Closed Container</strong></span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Door-to-Door Tracked
              </span>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </section>
  );
};
