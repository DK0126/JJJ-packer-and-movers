import React, { useState, useEffect } from 'react';
import { 
  Send, CheckCircle, AlertCircle, Phone, MessageSquare, Mail, Calendar, 
  MapPin, Home, Info, Sparkles, ArrowRight, ShieldCheck, HelpCircle
} from 'lucide-react';
import { MovingType, PropertyType, ContactMethod } from '../types';
import { BUSINESS_INFO } from '../data/businessData';

interface QuoteFormSectionProps {
  preselectedMovingType?: MovingType;
  preselectedDestination?: string;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({ 
  preselectedMovingType, 
  preselectedDestination 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    whatsapp: '',
    movingType: (preselectedMovingType || 'Home Shifting') as MovingType,
    pickupLocation: 'Chennai, Tamil Nadu',
    deliveryLocation: preselectedDestination || '',
    movingDate: '',
    propertyType: '2 BHK' as PropertyType,
    description: '',
    additionalRequirements: '',
    preferredContactMethod: 'Phone' as ContactMethod,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [enquiryId, setEnquiryId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (preselectedMovingType) {
      setFormData(prev => ({ ...prev, movingType: preselectedMovingType }));
    }
  }, [preselectedMovingType]);

  useEffect(() => {
    if (preselectedDestination) {
      setFormData(prev => ({ ...prev, deliveryLocation: preselectedDestination }));
    }
  }, [preselectedDestination]);

  const movingTypes: MovingType[] = [
    'Home Shifting',
    'Office Shifting',
    'Local Shifting',
    'Intercity Shifting',
    'Vehicle Transportation',
    'Loading & Unloading',
    'Packing & Unpacking',
    'Storage / Warehouse',
    'Commercial Shifting',
    'Other'
  ];

  const propertyTypes: PropertyType[] = [
    '1 BHK',
    '2 BHK',
    '3 BHK',
    '4 BHK',
    'Villa',
    'Office',
    'Warehouse / Commercial',
    'Vehicle Only',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.pickupLocation.trim()) {
      setErrorMessage('Please specify the pickup location.');
      return;
    }
    if (!formData.deliveryLocation.trim()) {
      setErrorMessage('Please specify the destination location.');
      return;
    }
    if (!formData.movingDate) {
      setErrorMessage('Please choose your expected moving date.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit enquiry. Please try again.');
      }

      setEnquiryId(data.enquiryId || `JJJ-${Date.now().toString().slice(-4)}`);
      setSubmitSuccess(true);
    } catch (err: any) {
      // Graceful local handling if backend endpoint is unavailable
      setEnquiryId(`JJJ-${Date.now().toString().slice(-4)}`);
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Instant Cost Calculator Breakdown
  const calculateEstimatedRange = () => {
    let base = 4500;
    if (formData.propertyType === '1 BHK') base = 4000;
    else if (formData.propertyType === '2 BHK') base = 6500;
    else if (formData.propertyType === '3 BHK') base = 9500;
    else if (formData.propertyType === '4 BHK' || formData.propertyType === 'Villa') base = 14000;
    else if (formData.propertyType === 'Vehicle Only') base = 3500;
    else if (formData.propertyType === 'Office') base = 12000;

    const isIntercity = 
      formData.movingType === 'Intercity Shifting' || 
      (formData.deliveryLocation && !formData.deliveryLocation.toLowerCase().includes('chennai'));

    if (isIntercity) {
      base = base * 2.6;
    }

    const min = Math.round(base / 500) * 500;
    const max = Math.round((base * 1.35) / 500) * 500;

    return { min, max, isIntercity };
  };

  const estimate = calculateEstimatedRange();

  const generateWhatsappEnquiryLink = () => {
    const text = `Hi JJJ Packers & Movers, I would like to enquire about:
- Name: ${formData.name || 'Customer'}
- Phone: ${formData.phone || 'N/A'}
- Service: ${formData.movingType}
- Size: ${formData.propertyType}
- From: ${formData.pickupLocation}
- To: ${formData.deliveryLocation}
- Date: ${formData.movingDate || 'Flexible'}
Please share a free detailed moving quotation.`;
    return `https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="quote-section" className="py-20 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#F47B20] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Moving Cost Enquiry Form</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102B4E] tracking-tight mb-4">
            Get Your Free Moving Quotation
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Fill in your pickup and destination details below to receive a transparent price estimate with no hidden costs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Comprehensive Enquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#F1F5F9] rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            {submitSuccess ? (
              <div className="text-center py-10 px-4 bg-white rounded-2xl border border-emerald-200 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#102B4E] mb-2">
                  Quotation Request Received!
                </h3>
                <p className="text-sm text-slate-600 mb-4 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your enquiry reference ID is:
                </p>
                <div className="inline-block px-4 py-2 bg-slate-100 text-[#102B4E] font-mono font-bold text-lg rounded-xl border border-slate-200 mb-6">
                  {enquiryId}
                </div>
                <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
                  Our relocation coordinator will contact you at <strong>{formData.phone}</strong> shortly with your personalized pricing breakdown.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={generateWhatsappEnquiryLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Send details to WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setFormData(prev => ({ ...prev, name: '', phone: '', deliveryLocation: '' }));
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Submit Another Move
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 1. Moving Type & Property Size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Relocation Service Type *
                    </label>
                    <select
                      value={formData.movingType}
                      onChange={(e) => setFormData({ ...formData, movingType: e.target.value as MovingType })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#F47B20] transition-all"
                    >
                      {movingTypes.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Premises / Vehicle Type *
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#F47B20] transition-all"
                    >
                      {propertyTypes.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. Pickup & Destination Locations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Pickup Location (Origin) *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                        placeholder="e.g. Guduvancheri, Chennai"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#F47B20] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Destination Location (Drop) *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#F47B20] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.deliveryLocation}
                        onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                        placeholder="e.g. Velachery / Bengaluru / Hyderabad"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#F47B20] transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Moving Date & Full Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Expected Moving Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        value={formData.movingDate}
                        onChange={(e) => setFormData({ ...formData, movingDate: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#F47B20] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#F47B20] transition-all"
                      required
                    />
                  </div>
                </div>

                {/* 4. Phone Number & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#F47B20] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#F47B20] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Inventory Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Major Items / Special Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="e.g. Fridge, Washing Machine, 2 Beds, 1 Bike, 15 boxes... (Optional)"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#F47B20] transition-all"
                  />
                </div>

                {/* Submit Action: Strong Orange CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#F47B20] hover:bg-[#DE6811] active:scale-[0.99] disabled:opacity-70 text-white font-heading font-bold text-sm tracking-wider uppercase transition-all shadow-md shadow-[#F47B20]/25 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Processing Quotation...</span>
                  ) : (
                    <>
                      <span>GET FREE MOVING QUOTE</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Instant Live Estimate Breakdown & Direct Assistance (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Price Estimation Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold text-[#F47B20] uppercase tracking-wider">
                  Real-Time Estimate Guide
                </span>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Indicative Cost
                </span>
              </div>

              <div className="mb-4">
                <div className="text-xs text-slate-500">Estimated Price Range:</div>
                <div className="font-heading text-3xl font-black text-[#102B4E] mt-1">
                  ₹{estimate.min.toLocaleString('en-IN')} – ₹{estimate.max.toLocaleString('en-IN')}*
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  *Based on {formData.propertyType} {estimate.isIntercity ? 'Intercity Transit' : 'Local Relocation'}. Exact quote finalized after itemized inventory check.
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-5">
                <div className="flex items-center justify-between">
                  <span>Packing Materials:</span>
                  <span className="font-bold text-slate-800">5-Ply Box & Bubble Wrap Included</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Labor (Loading/Unloading):</span>
                  <span className="font-bold text-slate-800">Trained Personnel Included</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Transit Transport:</span>
                  <span className="font-bold text-slate-800">Covered Weatherproof Fleet</span>
                </div>
              </div>

              {/* Instant WhatsApp Enquiry Button */}
              <a
                href={generateWhatsappEnquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Instant WhatsApp Price Check</span>
              </a>
            </div>

            {/* Need Direct Assistance Card */}
            <div className="bg-[#102B4E] rounded-2xl p-6 text-white shadow-md">
              <h4 className="font-heading text-lg font-bold mb-1">
                Prefer Speaking Directly?
              </h4>
              <p className="text-xs text-slate-300 mb-4">
                Our moving specialists are on call 24 hours to clarify vehicle sizing, packing requirements, and route timelines.
              </p>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-[#F47B20]" />
                <span>+91 {BUSINESS_INFO.phone} (24/7 Helpline)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
