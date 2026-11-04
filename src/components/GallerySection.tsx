import React, { useState, useEffect, useCallback } from 'react';
import { 
  GALLERY_ITEMS, 
  GalleryPhotoItem, 
  BUSINESS_INFO 
} from '../data/businessData';
import { 
  Camera, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  ShieldCheck, 
  MapPin, 
  LayoutGrid, 
  List, 
  Layers, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface GallerySectionProps {
  onQuoteClick?: (service?: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onQuoteClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [layoutMode, setLayoutMode] = useState<'rows' | 'grid' | 'grouped'>('rows');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Bike & Vehicle', 'Furniture & Antiques', 'Household & Cartons'];

  const filteredItems = activeCategory === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  // Grouped category subsets for "Grouped by Category" mode
  const bikeItems = GALLERY_ITEMS.filter(item => item.category === 'Bike & Vehicle');
  const furnitureItems = GALLERY_ITEMS.filter(item => item.category === 'Furniture & Antiques');
  const householdItems = GALLERY_ITEMS.filter(item => item.category === 'Household & Cartons');

  const openLightbox = (item: GalleryPhotoItem) => {
    const index = GALLERY_ITEMS.findIndex(i => i.id === item.id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
    }
  }, [lightboxIndex]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  }, [lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  const activePhoto = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section 
      id="gallery" 
      className="py-20 lg:py-24 bg-white border-t border-slate-200/80 relative scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[#F47B20] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Camera className="w-4 h-4 text-[#F47B20]" />
            <span>On-Site Packaging Operations</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102B4E] tracking-tight mb-4">
            Our Work in Action: <span className="text-[#F47B20]">Real Packing & Shifting</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Authentic photographs of two-wheelers, antique teakwood furniture, and household cartons safely packed and staged by the JJJ logistics crew.
          </p>

          {/* Genuine Workmanship Seal */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-700 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-[#102B4E]">100% Genuine Field Photos</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">Captured at JJJ Guduvancheri Hub & Client Residencies</span>
          </div>
        </div>

        {/* Controls & Filter Bar: Categories + Layout Selector */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800/80">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? GALLERY_ITEMS.length 
                : GALLERY_ITEMS.filter(i => i.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 scale-102'
                      : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeCategory === cat ? 'bg-slate-950/20 text-slate-950 font-mono font-bold' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Row / Grid Layout Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 text-[11px] px-2 font-medium hidden sm:inline">Layout:</span>
            
            <button
              onClick={() => setLayoutMode('rows')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                layoutMode === 'rows'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Wide Row Cards with full details"
            >
              <List className="w-3.5 h-3.5" />
              <span>Row Feed</span>
            </button>

            <button
              onClick={() => setLayoutMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                layoutMode === 'grid'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Multi-column rows grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid Rows</span>
            </button>

            <button
              onClick={() => setLayoutMode('grouped')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                layoutMode === 'grouped'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grouped by category rows"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Category Rows</span>
            </button>
          </div>
        </div>

        {/* 1. LAYOUT MODE: ROW FEED (Spacious horizontal rows with full photos & packaging details) */}
        {layoutMode === 'rows' && (
          <div className="space-y-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 p-4 sm:p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
                  
                  {/* Photo Container */}
                  <div 
                    onClick={() => openLightbox(item)}
                    className="md:col-span-5 relative overflow-hidden rounded-xl bg-slate-950 aspect-[4/3] sm:aspect-[16/10] cursor-pointer group-hover:ring-2 group-hover:ring-amber-500/50 transition-all"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
                        {item.badge}
                      </span>
                    </div>

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold">
                      <div className="p-2.5 rounded-full bg-amber-500 text-slate-950 shadow-lg">
                        <Eye className="w-5 h-5" />
                      </div>
                      <span className="bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700">
                        Click to Enlarge Full Photo
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-[10px] text-slate-300 font-mono">
                      Photo {idx + 1} of {filteredItems.length}
                    </div>
                  </div>

                  {/* Details & Specifications */}
                  <div className="md:col-span-7 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
                        <span className="text-amber-400 font-bold uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {item.location}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        {item.desc}
                      </p>

                      {/* Packaging Specifications Highlights */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                        <div>
                          <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Protection Type</span>
                          <span className="font-semibold text-slate-200">Multi-Layer Corrugated + Film</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Service Tag</span>
                          <span className="font-semibold text-amber-400">{item.tag}</span>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Transit Line</span>
                          <span className="font-semibold text-slate-200">Door-to-Door All India</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons in Row */}
                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800/60">
                      <button
                        onClick={() => openLightbox(item)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5 transition-colors border border-slate-700"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>Inspect Full Photo</span>
                      </button>

                      <a
                        href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(
                          `Hi JJJ Packers & Movers, I saw your gallery photo for "${item.title}". I would like to enquire about similar packing and moving services.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Enquiry</span>
                      </a>

                      {onQuoteClick && (
                        <button
                          onClick={() => onQuoteClick(item.category === 'Bike & Vehicle' ? 'Vehicle Transportation' : item.category === 'Furniture & Antiques' ? 'Home Shifting' : 'Packing & Unpacking')}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-colors ml-auto"
                        >
                          <span>Get Free Quote</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. LAYOUT MODE: MULTI-COLUMN ROWS (Grid in rows of 3 to 4) */}
        {layoutMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openLightbox(item)}
                className="group cursor-pointer rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/5 flex flex-col justify-between"
              >
                <div>
                  {/* Photo container */}
                  <div className="relative mb-3.5 overflow-hidden rounded-xl bg-slate-950 aspect-[4/3]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Tag badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
                        {item.badge}
                      </span>
                    </div>

                    {/* Hover Inspect Pill */}
                    <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold">
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>Inspect Photo</span>
                    </div>
                  </div>

                  {/* Category & Location */}
                  <div className="flex items-center justify-between text-[11px] text-amber-400 font-medium mb-1">
                    <span>{item.category}</span>
                    <span className="text-slate-400 flex items-center gap-1 text-[10px]">
                      <MapPin className="w-2.5 h-2.5 text-slate-500" />
                      {item.location.split(',')[0]}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {item.title}
                  </h4>

                  {/* Short Description */}
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] text-slate-400">{item.tag}</span>
                  <span className="text-amber-400 text-xs font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. LAYOUT MODE: GROUPED BY CATEGORY ROWS */}
        {layoutMode === 'grouped' && (
          <div className="space-y-12">
            
            {/* Category Row 1: Bike & Two-Wheeler Shifting */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <h3 className="text-xl font-bold text-white">
                    Two-Wheeler & Bike Packing Fleet ({bikeItems.length} Photos)
                  </h3>
                </div>
                <span className="text-xs text-slate-400">Corrugated Armor & Helmet Strapping</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {bikeItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => openLightbox(item)}
                    className="group cursor-pointer rounded-xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 p-3 transition-all hover:-translate-y-1"
                  >
                    <div className="relative mb-2 overflow-hidden rounded-lg bg-slate-950 aspect-[4/3]">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/80 text-amber-400">
                          {item.badge}
                        </span>
                      </div>
                    </div>
                    <h5 className="text-xs font-bold text-white group-hover:text-amber-400 line-clamp-1">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Row 2: Furniture & Antiques */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <h3 className="text-xl font-bold text-white">
                    Fine Woodwork, Sofas & Antiques ({furnitureItems.length} Photos)
                  </h3>
                </div>
                <span className="text-xs text-slate-400">Teakwood Chairs & Sofa Suite Encasement</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {furnitureItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => openLightbox(item)}
                    className="group cursor-pointer rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 p-4 transition-all hover:-translate-y-1 flex flex-col sm:flex-row gap-4"
                  >
                    <div className="sm:w-1/2 relative overflow-hidden rounded-xl bg-slate-950 aspect-[4/3]">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-amber-400">
                          {item.badge}
                        </span>
                      </div>
                    </div>
                    <div className="sm:w-1/2 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] text-amber-400 font-bold uppercase">{item.category}</span>
                        <h5 className="text-base font-bold text-white group-hover:text-amber-400 mt-1">
                          {item.title}
                        </h5>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                        <span>{item.location}</span>
                        <span className="text-amber-400 font-semibold flex items-center gap-1">
                          Inspect <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Row 3: Household Relocation & Cartons */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <h3 className="text-xl font-bold text-white">
                    Household Cartons & Appliance Relocation
                  </h3>
                </div>
                <span className="text-xs text-slate-400">Freudenberg micronAir High-GSM Cartons</span>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {householdItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => openLightbox(item)}
                    className="group cursor-pointer rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 p-4 sm:p-5 transition-all hover:-translate-y-1 grid grid-cols-1 md:grid-cols-12 gap-5 items-center"
                  >
                    <div className="md:col-span-5 relative overflow-hidden rounded-xl bg-slate-950 aspect-[16/10]">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded text-xs font-bold bg-black/80 text-amber-400 border border-amber-500/30">
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-7 flex flex-col justify-between">
                      <div>
                        <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">{item.category}</span>
                        <h4 className="text-xl font-bold text-white group-hover:text-amber-400 mt-1 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-slate-300 leading-relaxed mb-4">
                          {item.desc}
                        </p>
                        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                          Standard operating procedure for residential villa and apartment moves in Chennai: Heavy duty boxes with numbered color-coded labels, taped seams, and transit luggage separation.
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {item.location}
                        </span>
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                          Click to View Full Photo <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Bottom Banner: Ready to Move Your Items with This Care? */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-blue-900/20 border border-amber-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Professional Packaging Standard Guaranteed</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Want your vehicle, sofa or household packed with this level of protection?
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Contact our Chennai operations desk for a quick, customized estimate with zero hidden surprises.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(
                'Hi JJJ Packers & Movers, I reviewed your gallery photos and would like to get a quote for packing and moving.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-900/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>

            {onQuoteClick && (
              <button
                onClick={() => onQuoteClick()}
                className="flex-1 md:flex-initial px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/10"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {activePhoto && lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#0B132B] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {lightboxIndex + 1} / {GALLERY_ITEMS.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevImage}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Previous Photo (Left Arrow)"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Next Photo (Right Arrow)"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-1.5 ml-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Photo Viewport */}
            <div className="relative flex-1 bg-black/90 flex items-center justify-center min-h-[260px] sm:min-h-[420px] max-h-[60vh] overflow-hidden p-2">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-full max-w-full object-contain rounded-lg"
              />

              {/* Prev / Next floating overlay triggers on larger screens */}
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-amber-500 text-white hover:text-slate-950 transition-all border border-slate-700 shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-amber-500 text-white hover:text-slate-950 transition-all border border-slate-700 shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer / Description Panel */}
            <div className="p-5 bg-slate-900/95 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {activePhoto.title}
                </h3>
                <span className="flex items-center gap-1 text-xs text-slate-400 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {activePhoto.location}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {activePhoto.desc}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Real field photography • JJJ Logistics</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <a
                    href={`https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(
                      `Hi JJJ Packers & Movers, I am looking at photo #${lightboxIndex + 1} (${activePhoto.title}) in your gallery. Can you provide a quote for similar service?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp About This</span>
                  </a>

                  {onQuoteClick && (
                    <button
                      onClick={() => {
                        setLightboxIndex(null);
                        onQuoteClick(activePhoto.category === 'Bike & Vehicle' ? 'Vehicle Transportation' : 'Home Shifting');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-colors"
                    >
                      <span>Get Free Quote</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
