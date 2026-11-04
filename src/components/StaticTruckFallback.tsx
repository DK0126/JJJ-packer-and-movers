import React, { useState } from 'react';
import { Eye, ShieldCheck, Box, Truck, CheckCircle2, MapPin, Sparkles, Navigation, CloudRain } from 'lucide-react';
import { useReducedMotion } from '../context/MotionContext';

export const StaticTruckFallback: React.FC = () => {
  const { toggleReducedMotion } = useReducedMotion();
  const [selectedPhase, setSelectedPhase] = useState<number>(1);

  const staticSteps = [
    {
      step: 1,
      title: 'Boxes Loaded & Sealed',
      desc: 'Corrugated cartons and household goods loaded securely into the closed container, and heavy-duty doors sealed shut.',
      badge: 'Hub Loading Bay',
      icon: Box,
    },
    {
      step: 2,
      title: 'Journey Begins',
      desc: 'Container truck departs Chennai (Guduvancheri Hub) entering the National Highway arterial network.',
      badge: 'Depot Departure',
      icon: Truck,
    },
    {
      step: 3,
      title: 'All-Weather Protection',
      desc: 'Heavy-gauge weatherproof steel container safeguards items against monsoon rains, temperature shifts, and highway dust.',
      badge: 'Highway Transit',
      icon: CloudRain,
    },
    {
      step: 4,
      title: 'Pan-India Delivery & Unloading',
      desc: 'Safe arrival across long-haul corridors from Kanyakumari to Kashmir, terminal arrival, and supervised doorstep unloading.',
      badge: 'Destination Arrival',
      icon: MapPin,
    },
  ];

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#0B1528] via-[#070B19] to-[#040711] border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8">
      {/* Top Accessibility Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Reduced Motion Active
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                WCAG 2.1 Compliant
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              High-quality static presentation displayed to respect system motion preferences.
            </p>
          </div>
        </div>

        <button
          onClick={toggleReducedMotion}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 text-xs font-semibold transition-colors"
          title="Switch to 3D animated simulation"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Switch to 3D Simulation</span>
        </button>
      </div>

      {/* Main High-Quality Static Visual Illustration of JJJ Packers Truck */}
      <div className="relative w-full rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden shadow-inner mb-6">
        {/* Sky / Ambient gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1B38] via-[#091024] to-[#050914] pointer-events-none" />

        {/* Ambient subtle highway lights */}
        <div className="absolute top-1/4 left-1/3 w-96 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* High-Resolution Vector Artwork of JJJ Commercial Moving Truck */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] flex items-center justify-center p-4 sm:p-8">
          <svg
            viewBox="0 0 1000 450"
            className="w-full h-full max-h-[380px] drop-shadow-2xl"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="High-quality static view of JJJ Packers and Movers Container Truck parked at Chennai Hub"
          >
            <defs>
              {/* Truck Container Gradient */}
              <linearGradient id="containerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#132448" />
                <stop offset="45%" stopColor="#0B1630" />
                <stop offset="100%" stopColor="#060C1B" />
              </linearGradient>

              {/* Gold Ribbon Gradient */}
              <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              {/* Cabin Orange Gradient */}
              <linearGradient id="cabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EA580C" />
                <stop offset="50%" stopColor="#C2410C" />
                <stop offset="100%" stopColor="#9A3412" />
              </linearGradient>

              {/* Road Gradient */}
              <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>

              {/* Glass windshield */}
              <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Background Highway Road */}
            <rect x="0" y="320" width="1000" height="130" fill="url(#roadGrad)" />
            <line x1="0" y1="320" x2="1000" y2="320" stroke="#334155" strokeWidth="3" />
            
            {/* Road Markings */}
            <line x1="40" y1="385" x2="140" y2="385" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
            <line x1="220" y1="385" x2="320" y2="385" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
            <line x1="400" y1="385" x2="500" y2="385" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
            <line x1="580" y1="385" x2="680" y2="385" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
            <line x1="760" y1="385" x2="860" y2="385" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
            <line x1="940" y1="385" x2="1000" y2="385" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" opacity="0.8" />

            {/* Indian Highway Signboard (Static) */}
            <g transform="translate(40, 40)">
              <rect x="0" y="0" width="220" height="95" rx="8" fill="#064E3B" stroke="#FFFFFF" strokeWidth="3" />
              <rect x="8" y="8" width="204" height="22" rx="4" fill="#F59E0B" />
              <text x="110" y="24" fill="#0F172A" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                NATIONAL HIGHWAY · NH-44
              </text>
              <text x="110" y="52" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                KANYAKUMARI ➔ KASHMIR
              </text>
              <text x="110" y="74" fill="#A7F3D0" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                CHENNAI CENTRAL HUB: KM 0
              </text>
              {/* Sign Posts */}
              <line x1="30" y1="95" x2="30" y2="280" stroke="#475569" strokeWidth="6" />
              <line x1="190" y1="95" x2="190" y2="280" stroke="#475569" strokeWidth="6" />
            </g>

            {/* Packaging Cartons on Wooden Pallet at Hub Staging Area (Left) */}
            <g transform="translate(180, 260)">
              {/* Wooden Pallet */}
              <rect x="0" y="65" width="105" height="8" rx="2" fill="#78350F" />
              <rect x="10" y="73" width="15" height="10" fill="#451A03" />
              <rect x="45" y="73" width="15" height="10" fill="#451A03" />
              <rect x="80" y="73" width="15" height="10" fill="#451A03" />
              
              {/* Carton Box 1 */}
              <rect x="5" y="20" width="45" height="45" rx="3" fill="#D97706" stroke="#92400E" strokeWidth="2" />
              <line x1="5" y1="42" x2="50" y2="42" stroke="#78350F" strokeWidth="3" />
              <text x="27" y="36" fill="#451A03" fontSize="8" fontWeight="bold" textAnchor="middle">JJJ</text>

              {/* Carton Box 2 */}
              <rect x="55" y="15" width="45" height="50" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="2" />
              <line x1="55" y1="40" x2="100" y2="40" stroke="#451A03" strokeWidth="3" />
              <text x="77" y="32" fill="#FEF3C7" fontSize="8" fontWeight="bold" textAnchor="middle">FRAGILE</text>

              {/* Carton Box 3 (Top) */}
              <rect x="25" y="-18" width="40" height="38" rx="3" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
              <line x1="25" y1="0" x2="65" y2="0" stroke="#78350F" strokeWidth="3" />
              <text x="45" y="-4" fill="#78350F" fontSize="8" fontWeight="bold" textAnchor="middle">CARE</text>
            </g>

            {/* TRUCK SHADOW */}
            <ellipse cx="610" cy="355" rx="340" ry="18" fill="#020617" opacity="0.9" />

            {/* ========================================== */}
            {/* TRUCK BODY: CONTAINER & CABIN               */}
            {/* ========================================== */}
            <g transform="translate(300, 110)">
              {/* Chassis Frame */}
              <rect x="15" y="210" width="600" height="20" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="2" />
              {/* Fuel Tank */}
              <rect x="250" y="215" width="70" height="22" rx="4" fill="#475569" stroke="#64748B" strokeWidth="1.5" />
              {/* Tool Box */}
              <rect x="160" y="215" width="55" height="20" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="1" />

              {/* 1. CLOSED HEAVY-DUTY CARGO CONTAINER */}
              <rect x="20" y="10" width="410" height="200" rx="8" fill="url(#containerGrad)" stroke="#1E293B" strokeWidth="3" />

              {/* Container Vertical Corrugation Ribs */}
              {[45, 85, 125, 165, 205, 245, 285, 325, 365, 405].map((rx, idx) => (
                <line key={idx} x1={rx} y1="12" x2={rx} y2="208" stroke="#1E3A8A" strokeWidth="2.5" opacity="0.4" />
              ))}

              {/* Container Perimeter Accents & Corner Castings */}
              <rect x="20" y="10" width="410" height="8" fill="#F59E0B" />
              <rect x="20" y="202" width="410" height="8" fill="#F59E0B" />
              <rect x="20" y="10" width="12" height="200" fill="#D97706" />
              <rect x="418" y="10" width="12" height="200" fill="#D97706" />

              {/* Branding Gold Accent Stripe */}
              <rect x="32" y="145" width="386" height="14" fill="url(#goldRibbon)" />

              {/* MAIN BRANDING TEXT: JJJ PACKERS & MOVERS */}
              <text
                x="225"
                y="85"
                fill="#FFFFFF"
                fontSize="27"
                fontWeight="900"
                fontFamily="Outfit, sans-serif"
                letterSpacing="1.5"
                textAnchor="middle"
              >
                JJJ PACKERS & MOVERS
              </text>

              {/* Tagline */}
              <text
                x="225"
                y="112"
                fill="#FBBF24"
                fontSize="12.5"
                fontWeight="700"
                fontFamily="Plus Jakarta Sans, sans-serif"
                letterSpacing="3"
                textAnchor="middle"
              >
                SAFE • RELIABLE • ON TIME
              </text>

              {/* Sub-strip Phone & Location */}
              <text
                x="225"
                y="180"
                fill="#94A3B8"
                fontSize="10"
                fontWeight="600"
                fontFamily="Plus Jakarta Sans, sans-serif"
                letterSpacing="1"
                textAnchor="middle"
              >
                ALL INDIA PERMIT • CHENNAI ➔ NATIONWIDE • 24 HOURS: 7010033771
              </text>

              {/* Rear Door Hinges & Lock Bars (Left side of container) */}
              <rect x="23" y="30" width="6" height="160" fill="#475569" rx="2" />
              <rect x="20" y="50" width="12" height="8" fill="#94A3B8" rx="2" />
              <rect x="20" y="105" width="12" height="8" fill="#94A3B8" rx="2" />
              <rect x="20" y="160" width="12" height="8" fill="#94A3B8" rx="2" />

              {/* 2. MODERN INDIAN CABIN (Right) */}
              {/* Cab Main Body */}
              <path
                d="M 430,210 L 430,45 L 530,45 Q 570,55 585,100 L 610,165 Q 618,185 618,210 Z"
                fill="url(#cabGrad)"
                stroke="#7C2D12"
                strokeWidth="2.5"
              />

              {/* Windshield */}
              <path
                d="M 525,55 L 565,65 Q 580,95 595,145 L 525,145 Z"
                fill="url(#glassGrad)"
                stroke="#0284C7"
                strokeWidth="1.5"
              />

              {/* Side Door Window */}
              <path
                d="M 445,60 L 515,60 L 515,145 L 445,145 Z"
                fill="url(#glassGrad)"
                stroke="#0284C7"
                strokeWidth="1.5"
              />

              {/* Door Handle */}
              <rect x="455" y="155" width="20" height="5" rx="2" fill="#F8FAFC" />

              {/* Front Chrome Bumper & Grille */}
              <rect x="585" y="170" width="38" height="42" rx="4" fill="#334155" stroke="#64748B" strokeWidth="2" />
              <line x1="588" y1="180" x2="620" y2="180" stroke="#CBD5E1" strokeWidth="2" />
              <line x1="588" y1="190" x2="620" y2="190" stroke="#CBD5E1" strokeWidth="2" />
              <line x1="588" y1="200" x2="620" y2="200" stroke="#CBD5E1" strokeWidth="2" />

              {/* Headlights */}
              <rect x="612" y="174" width="10" height="12" rx="2" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
              <polygon points="622,176 740,150 740,225 622,185" fill="#FEF08A" opacity="0.12" />

              {/* Roof Fairing / Wind Deflector */}
              <path d="M 430,45 L 530,45 L 470,12 Z" fill="#9A3412" stroke="#7C2D12" strokeWidth="2" />

              {/* Side Mirror */}
              <rect x="535" y="110" width="8" height="24" rx="2" fill="#0F172A" />
              <line x1="525" y1="120" x2="535" y2="120" stroke="#0F172A" strokeWidth="3" />

              {/* 3. HEAVY-DUTY WHEELS */}
              {/* Rear Dual Axles */}
              <g transform="translate(100, 225)">
                <circle cx="0" cy="0" r="26" fill="#0F172A" stroke="#334155" strokeWidth="4" />
                <circle cx="0" cy="0" r="14" fill="#64748B" stroke="#94A3B8" strokeWidth="2" />
                <circle cx="0" cy="0" r="6" fill="#0F172A" />
              </g>
              <g transform="translate(165, 225)">
                <circle cx="0" cy="0" r="26" fill="#0F172A" stroke="#334155" strokeWidth="4" />
                <circle cx="0" cy="0" r="14" fill="#64748B" stroke="#94A3B8" strokeWidth="2" />
                <circle cx="0" cy="0" r="6" fill="#0F172A" />
              </g>

              {/* Front Steer Axle */}
              <g transform="translate(545, 225)">
                <circle cx="0" cy="0" r="26" fill="#0F172A" stroke="#334155" strokeWidth="4" />
                <circle cx="0" cy="0" r="14" fill="#64748B" stroke="#94A3B8" strokeWidth="2" />
                <circle cx="0" cy="0" r="6" fill="#0F172A" />
              </g>
            </g>
          </svg>
        </div>

        {/* Static Overlay Badge */}
        <div className="absolute bottom-4 right-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/60 shadow-lg text-xs flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-300 font-medium">Pan-India Fleet Vehicle #TN-01-JJJ-99</span>
        </div>
      </div>

      {/* Step Explorer Tabs (Static, Calm, Non-Flashing) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-200 uppercase tracking-wider">
            Operational Sequence (Static Overview)
          </span>
          <span>Click any phase to review step protocol</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {staticSteps.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedPhase === item.step;
            return (
              <button
                key={item.step}
                onClick={() => setSelectedPhase(item.step)}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/60 hover:bg-slate-800/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.step}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                      {item.badge}
                    </span>
                  </div>
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? 'text-amber-400' : 'text-slate-500'
                    }`}
                  />
                </div>
                <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Details Card */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-white">
              Phase {selectedPhase}: {staticSteps[selectedPhase - 1].title}
            </span>
            <p className="text-slate-300 mt-0.5">
              {staticSteps[selectedPhase - 1].desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
