import React from 'react';
import { MapPin, CheckCircle2, Shield, HeartHandshake, Compass, Building, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-24 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Brand Positioning */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#F47B20] mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>About JJJ Packers & Movers</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102B4E] tracking-tight leading-tight mb-5">
              Moving with Utmost Care, Precision & Integrity.
            </h2>

            <blockquote className="border-l-4 border-[#F47B20] pl-4 py-1.5 text-base sm:text-lg text-slate-700 italic font-medium mb-6 bg-orange-50/50 rounded-r-xl">
              “Moving is more than transporting cargo. It is about relocating people’s lives, cherished memories, and businesses safely from one doorstep to another.”
            </blockquote>

            <p className="text-slate-600 leading-relaxed mb-4 text-sm sm:text-base">
              Headquartered at <strong>#16 GST Road, Guduvancheri (Chennai – 603202)</strong>, 
              JJJ Packers & Movers has developed into a premier logistics and shifting partner for residential households, 
              corporate enterprises, and vehicle owners across Tamil Nadu and all states in India.
            </p>

            <p className="text-slate-600 leading-relaxed mb-8 text-sm">
              We approach every assignment with meticulous packing standards, clean covered container vehicles, and 
              transparent communication. Rather than inflated claims, we concentrate on practical packaging discipline: 
              treating your household valuables and commercial assets with the exact protective care we would expect for our own.
            </p>

            {/* Core Values / Operational Standards Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F1F5F9] border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#F47B20] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-sm font-bold text-[#102B4E]">Export-Grade Packing</h4>
                  <p className="text-xs text-slate-600 mt-1">High-GSM 5-ply cartons, multi-layer air bubble sheets, and waterproof wrapping.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F1F5F9] border border-slate-200">
                <Shield className="w-5 h-5 text-[#F47B20] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-sm font-bold text-[#102B4E]">Weatherproof Transit</h4>
                  <p className="text-xs text-slate-600 mt-1">Enclosed container vehicles protecting goods from rain, dust, and highway vibrations.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F1F5F9] border border-slate-200">
                <MapPin className="w-5 h-5 text-[#F47B20] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-sm font-bold text-[#102B4E]">Strategic Chennai Hub</h4>
                  <p className="text-xs text-slate-600 mt-1">Direct access to GST Road and national highway corridors heading north, west, and south.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F1F5F9] border border-slate-200">
                <HeartHandshake className="w-5 h-5 text-[#F47B20] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-sm font-bold text-[#102B4E]">24/7 Dedicated Support</h4>
                  <p className="text-xs text-slate-600 mt-1">Direct phone and WhatsApp updates with assigned move supervisors throughout transit.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Base Operations Hub Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#102B4E] p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#F47B20]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <div className="text-xs font-bold text-[#F47B20] uppercase tracking-wider">Registered Operations Base</div>
                  <h3 className="font-heading text-xl font-bold text-white mt-1">JJJ Packers & Movers</h3>
                </div>
                <div className="px-3 py-1 rounded-lg bg-white/10 text-xs text-slate-200 font-mono font-semibold">
                  Chennai Base
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Head Office & Logistics Depot</div>
                  <div className="text-white font-semibold mt-1 leading-snug">
                    {BUSINESS_INFO.address}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-medium">Primary Highway Corridors</div>
                  <div className="text-white font-semibold mt-1">
                    GST Road (NH32) · NH48 (Chennai–Bengaluru) · NH16 (Chennai–Kolkata) · NH44 (Pan-India)
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-medium">24/7 Booking & Enquiry Helpline</div>
                  <div className="text-[#F47B20] font-heading font-black text-xl mt-1">
                    +91 {BUSINESS_INFO.phone}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-medium">Operating Schedule</div>
                  <div className="text-white font-semibold mt-1">
                    24 Hours / 7 Days a Week
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>Verified Physical Location</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Operations
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
