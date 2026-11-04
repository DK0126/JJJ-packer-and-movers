import React from 'react';
import { MessageSquareText, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ReviewsSectionProps {
  onAdminClick?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onAdminClick }) => {
  const testimonials = [
    {
      id: 1,
      name: 'Karthik Subramanian',
      role: 'Home Relocation',
      route: 'Guduvancheri to Velachery, Chennai',
      rating: 5,
      date: 'Recent Move',
      comment: 'Excellent team and very methodical packing. All our delicate glass cabinets, TV, and kitchen utensils were double-wrapped in bubble sheets and delivered without a single scratch. Highly recommended in South Chennai!',
    },
    {
      id: 2,
      name: 'Priya Sundaram',
      role: 'Intercity Household Shift',
      route: 'Chennai to Bengaluru, Karnataka',
      rating: 5,
      date: 'Recent Move',
      comment: 'JJJ Packers handled our 3 BHK transfer seamlessly. The truck arrived on time at our apartment in Guduvancheri, loading took just 3 hours, and our goods reached Bengaluru safely the next day. Very courteous crew.',
    },
    {
      id: 3,
      name: 'Anand Venkatesh',
      role: 'Two-Wheeler & Furniture Move',
      route: 'Chennai to Hyderabad, Telangana',
      rating: 5,
      date: 'Recent Move',
      comment: 'Shipped my Royal Enfield bike along with home furniture. The multi-layer packaging on the motorcycle with corrugated cardboard and film was incredible. Odometer and bike condition matched 100% on delivery.',
    }
  ];

  return (
    <section id="reviews" className="py-20 lg:py-24 bg-white relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold uppercase tracking-wider text-[#F47B20] mb-3">
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>Customer Testimonials</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102B4E] tracking-tight mb-4">
            Trusted by Households & Businesses
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Real feedback from families and organizations who trusted JJJ Packers & Movers with their precious belongings.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-7 rounded-2xl bg-[#F1F5F9] border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 text-[#F47B20] mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-slate-500 ml-1.5">5.0</span>
                </div>

                {/* Review text */}
                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  “{item.comment}”
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-heading font-bold text-sm text-[#102B4E]">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-[#F47B20] font-semibold mt-0.5">
                    {item.route}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verified Move</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
