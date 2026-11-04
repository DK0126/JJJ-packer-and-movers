import React from 'react';
import { 
  ShieldCheck, Truck, Home, Users, Sparkles, Globe, Clock, Headphones, CheckCircle2 
} from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/businessData';

export const WhyChooseSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#F47B20]" />;
      case 'Truck': return <Truck className="w-6 h-6 text-[#F47B20]" />;
      case 'Home': return <Home className="w-6 h-6 text-[#F47B20]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#F47B20]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#F47B20]" />;
      case 'Globe': return <Globe className="w-6 h-6 text-[#F47B20]" />;
      case 'Clock': return <Clock className="w-6 h-6 text-[#F47B20]" />;
      case 'Headphones': return <Headphones className="w-6 h-6 text-[#F47B20]" />;
      default: return <CheckCircle2 className="w-6 h-6 text-[#F47B20]" />;
    }
  };

  return (
    <section id="why-us" className="py-20 lg:py-24 bg-[#F1F5F9] relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#F47B20] mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The JJJ Assurance</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102B4E] tracking-tight mb-4">
            Why Choose JJJ Packers & Movers
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Professional moving standards built on physical packaging discipline, modern transport vehicles, transparent pricing, and genuine accountability.
          </p>
        </div>

        {/* 8 Modern Icon Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, index) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-[#F47B20]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-sm group flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-[#102B4E] transition-all">
                <span className="group-hover:text-white transition-colors">
                  {getIcon(item.icon)}
                </span>
              </div>

              <h3 className="font-heading text-lg font-bold text-[#102B4E] mb-2 group-hover:text-[#F47B20] transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-auto">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
