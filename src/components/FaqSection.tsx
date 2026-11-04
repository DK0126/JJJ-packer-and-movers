import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Phone, MessageSquare } from 'lucide-react';
import { FAQ_DATA, BUSINESS_INFO } from '../data/businessData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-24 bg-[#F1F5F9] border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#F47B20] mb-3 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102B4E] tracking-tight mb-4">
            Answers to Common Queries
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Clear information about our relocation process, packing standards, transit timelines, and pricing policies.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-base sm:text-lg font-bold text-[#102B4E]">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#F47B20]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-center sm:text-left">
          <div>
            <h4 className="font-heading font-bold text-base text-[#102B4E]">
              Have a specific question not covered here?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Call or message our coordinators directly for personalized answers.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#102B4E] font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F47B20]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <a
              href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(
                'Hi JJJ Packers & Movers, I have an enquiry about relocation.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
