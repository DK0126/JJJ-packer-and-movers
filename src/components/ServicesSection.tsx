import React, { useState } from 'react';
import { 
  Home, Building2, MapPin, Truck, Car, Boxes, PackageCheck, Warehouse, Layers, 
  ArrowRight, MessageSquare, Check, X, ShieldCheck, ChevronRight, Sparkles 
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem, BUSINESS_INFO } from '../data/businessData';
import { MovingType } from '../types';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceName: MovingType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-5 h-5 text-[#F47B20]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#F47B20]" />;
      case 'MapPin': return <MapPin className="w-5 h-5 text-[#F47B20]" />;
      case 'Truck': return <Truck className="w-5 h-5 text-[#F47B20]" />;
      case 'Car': return <Car className="w-5 h-5 text-[#F47B20]" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-[#F47B20]" />;
      case 'PackageCheck': return <PackageCheck className="w-5 h-5 text-[#F47B20]" />;
      case 'Warehouse': return <Warehouse className="w-5 h-5 text-[#F47B20]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-[#F47B20]" />;
      default: return <Truck className="w-5 h-5 text-[#F47B20]" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-24 bg-[#F1F5F9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#F47B20] mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Relocation Solutions</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102B4E] tracking-tight mb-4">
            Our Professional Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Tailored packing, loading, and transit capabilities handled by trained personnel with modern enclosed vehicles and high-grade protective materials.
          </p>
        </div>

        {/* 9 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICES_DATA.map((service, index) => {
            const whatsappUrl = `https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(
              service.whatsappMessage
            )}`;

            return (
              <div
                key={service.id}
                className="group relative rounded-2xl bg-white border border-slate-200/90 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#F47B20]/40 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Service Photograph Banner with subtle hover zoom */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={`${service.name} - JJJ Packers & Movers`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    
                    {/* Badge top-left */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-lg bg-[#102B4E]/90 text-white text-[11px] font-bold tracking-wide backdrop-blur-md shadow-sm">
                        {service.badge}
                      </span>
                    </div>

                    {/* Service Number top-right */}
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/90 backdrop-blur-md flex items-center justify-center text-[11px] font-mono font-bold text-[#102B4E] shadow-sm">
                      0{index + 1}
                    </div>

                    {/* Category icon bottom-left */}
                    <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md">
                      {getServiceIcon(service.icon)}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-[#102B4E] mb-2 group-hover:text-[#F47B20] transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                      {service.shortDesc}
                    </p>

                    {/* Key Benefits Preview */}
                    <div className="space-y-2 mb-4">
                      {service.benefits.slice(0, 2).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-[#F47B20] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* View Details modal trigger */}
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-semibold text-[#102B4E] hover:text-[#F47B20] flex items-center gap-1 transition-colors"
                    >
                      <span>Explore moving process</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Actions Bottom Strip */}
                <div className="p-6 pt-0 mt-auto">
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
                    {/* Strong Orange CTA Button */}
                    <button
                      onClick={() => onSelectServiceForQuote(service.name)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#F47B20] hover:bg-[#DE6811] active:scale-95 text-white font-heading font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-[#F47B20]/20"
                    >
                      <span>Get Free Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* WhatsApp Button */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                      title="Chat about this service on WhatsApp"
                      aria-label={`WhatsApp for ${service.name}`}
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Service Process Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center">
                {getServiceIcon(selectedService.icon)}
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-[#F47B20] tracking-wider">
                  {selectedService.badge} Service
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#102B4E]">
                  {selectedService.name}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {selectedService.longDesc}
            </p>

            {/* Image in modal */}
            <div className="rounded-xl overflow-hidden mb-6 h-48 bg-slate-100">
              <img
                src={selectedService.image}
                alt={selectedService.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Benefits */}
            <div className="mb-6">
              <h4 className="font-heading text-sm font-bold text-[#102B4E] uppercase tracking-wider mb-3">
                Key Service Benefits
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Check className="w-3.5 h-3.5 text-[#F47B20] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Process */}
            <div className="mb-8">
              <h4 className="font-heading text-sm font-bold text-[#102B4E] uppercase tracking-wider mb-3">
                Operational Moving Process
              </h4>
              <div className="space-y-2">
                {selectedService.process.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="w-6 h-6 rounded-lg bg-[#102B4E] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                      0{idx + 1}
                    </div>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal CTA footer */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  const serviceName = selectedService.name;
                  setSelectedService(null);
                  onSelectServiceForQuote(serviceName);
                }}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#F47B20] hover:bg-[#DE6811] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#F47B20]/25"
              >
                <span>Request Free Quote for {selectedService.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(
                  selectedService.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
