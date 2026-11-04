import React from 'react';
import { MapPin, Phone, MessageSquare, Mail, Clock, Navigation, ExternalLink, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export const ContactSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(
    'Hi JJJ Packers & Movers, I would like to enquire about relocation services.'
  )}`;

  // OpenStreetMap embed for Guduvancheri GST Road
  const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=80.0400%2C12.8300%2C80.0800%2C12.8600&layer=mapnik&marker=12.8465%2C80.0615`;

  return (
    <section id="contact" className="py-20 lg:py-24 bg-[#F1F5F9] border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#F47B20] mb-3 shadow-sm">
            <Navigation className="w-3.5 h-3.5" />
            <span>Direct Communications Depot</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102B4E] tracking-tight mb-4">
            Contact JJJ Packers & Movers
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Reach out by phone, WhatsApp, email, or visit our central logistics depot on GST Road, Guduvancheri.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-start gap-4 shadow-sm hover:border-[#F47B20]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-[#F47B20]" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">24/7 Direct Phone Helpline</div>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="font-heading text-xl font-extrabold text-[#102B4E] hover:text-[#F47B20] transition-colors block mt-0.5"
                >
                  CALL {BUSINESS_INFO.phone}
                </a>
                <p className="text-xs text-slate-500 mt-1">
                  Immediate dispatch assistance & emergency moving support.
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-start gap-4 shadow-sm hover:border-emerald-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6 text-emerald-600 fill-current" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Official WhatsApp Helpline</div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-xl font-bold text-emerald-700 hover:text-emerald-600 transition-colors block mt-0.5"
                >
                  +91 {BUSINESS_INFO.whatsapp}
                </a>
                <p className="text-xs text-slate-500 mt-1">
                  Send photos or video walkthroughs of your premises for accurate price estimates.
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-start gap-4 shadow-sm hover:border-[#F47B20]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-[#F47B20]" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Official Email Enquiries</div>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="font-heading text-base font-bold text-[#102B4E] hover:text-[#F47B20] transition-colors block mt-0.5 break-all"
                >
                  {BUSINESS_INFO.email}
                </a>
                <p className="text-xs text-slate-500 mt-1">
                  Corporate tenders, quotation proposals, and billing inquiries.
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-start gap-4 shadow-sm hover:border-[#F47B20]/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#F47B20]" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Depot & Head Office</div>
                <p className="text-sm font-semibold text-[#102B4E] mt-0.5 leading-snug">
                  {BUSINESS_INFO.address}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                  <Clock className="w-3.5 h-3.5 text-[#F47B20]" />
                  <span>Open 24 Hours / 7 Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Depot Map Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-xs font-bold text-[#F47B20] uppercase tracking-wider">
                  Depot Map Location
                </span>
                <h3 className="font-heading text-lg font-bold text-[#102B4E]">
                  Guduvancheri Terminal, GST Road
                </h3>
              </div>
              <a
                href="https://maps.google.com/?q=16+GST+Road+Guduvancheri+Tamil+Nadu+603202"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#102B4E] hover:text-[#F47B20] flex items-center gap-1 transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <iframe
                title="JJJ Packers and Movers Office Location Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-2">
              <span>GPS Coordinates: 12.8465° N, 80.0615° E (GST Road Corridors)</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Direct Highway Vehicle Access
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
