import React, { useState } from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/businessData';
import { ClipboardList, Calculator, Truck, PackageOpen, ArrowRight, Sparkles } from 'lucide-react';

interface HowItWorksProps {
  onQuoteClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onQuoteClick }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const icons = [
    <ClipboardList className="w-6 h-6 text-[#F47B20]" />,
    <Calculator className="w-6 h-6 text-[#F47B20]" />,
    <Truck className="w-6 h-6 text-[#F47B20]" />,
    <PackageOpen className="w-6 h-6 text-[#F47B20]" />
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-24 bg-white border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#F47B20] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seamless 4-Step Journey</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102B4E] tracking-tight mb-4">
            How JJJ Movers Operates
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            From your initial quotation to final room-wise delivery, our systematic process ensures zero hassle.
          </p>
        </div>

        {/* Timeline Desktop & Tablet */}
        <div className="relative mb-12">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-200 via-[#F47B20] to-orange-200 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div
                key={step.step}
                onMouseEnter={() => setActiveStep(idx)}
                className={`rounded-2xl p-6 transition-all duration-300 cursor-pointer border ${
                  activeStep === idx
                    ? 'bg-white border-[#F47B20] shadow-xl shadow-[#F47B20]/10 -translate-y-1.5'
                    : 'bg-[#F1F5F9] border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Step badge & icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                    {icons[idx]}
                  </div>
                  <span className="text-2xl font-black font-heading text-[#102B4E]/30">
                    {step.step}
                  </span>
                </div>

                <div className="text-xs font-bold text-[#F47B20] mb-1 uppercase tracking-wider">
                  Step 0{idx + 1}
                </div>

                <h3 className="font-heading text-lg font-bold text-[#102B4E] mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {step.desc}
                </p>

                <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-[#102B4E] flex items-center gap-1">
                  <span>{step.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#102B4E] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="font-heading text-xl font-bold mb-1">
              Ready to schedule your relocation?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Get an instant quotation or speak with our shifting coordinators immediately.
            </p>
          </div>

          <button
            onClick={onQuoteClick}
            className="px-6 py-3 rounded-xl bg-[#F47B20] hover:bg-[#DE6811] active:scale-95 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#F47B20]/25 flex items-center gap-2 shrink-0"
          >
            <span>GET FREE QUOTE NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
