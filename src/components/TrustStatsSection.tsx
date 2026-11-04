import React from 'react';
import { ShieldAlert, Edit3 } from 'lucide-react';

interface TrustStatsProps {
  stats: {
    movesCompleted: string;
    citiesCovered: string;
    happyCustomers: string;
    customerRating: string;
  };
  onEditClick?: () => void;
}

export const TrustStatsSection: React.FC<TrustStatsProps> = ({ stats, onEditClick }) => {
  const statItems = [
    {
      value: stats.movesCompleted || '[XX+]',
      label: 'Moves Completed',
      subtext: 'Local & Pan-India relocations'
    },
    {
      value: stats.citiesCovered || '[XX+]',
      label: 'Cities Covered',
      subtext: 'Express highway corridors'
    },
    {
      value: stats.happyCustomers || '[XX+]',
      label: 'Happy Customers',
      subtext: 'Households & corporate moves'
    },
    {
      value: stats.customerRating || '[XX/5]',
      label: 'Customer Rating',
      subtext: 'Direct verified reviews'
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#F1F5F9] border border-slate-200 text-center relative group hover:border-[#F47B20]/40 transition-all shadow-sm"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#102B4E] tracking-tight mb-2 group-hover:text-[#F47B20] transition-colors">
                {item.value}
              </div>
              <div className="text-sm font-bold text-[#102B4E] mb-1">
                {item.label}
              </div>
              <div className="text-xs text-slate-500">
                {item.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* Notice strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#F47B20] shrink-0" />
            <span>
              Operating figures and statistics are editable by authorized dispatch staff in the Admin Dashboard.
            </span>
          </div>
          {onEditClick && (
            <button
              onClick={onEditClick}
              className="text-[#102B4E] hover:text-[#F47B20] font-bold inline-flex items-center gap-1 shrink-0 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Admin: Update Figures</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
