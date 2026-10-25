import React, { useState } from 'react';
import { 
  SERVICES_CATALOG, 
  SERVICE_CATEGORIES, 
  ServiceItem 
} from '../data/mockData';
import { calculateEstimate } from '../utils/serviceLogic';
import { 
  Wind, 
  Bike, 
  Droplet, 
  Zap, 
  Wrench, 
  Hammer, 
  Check, 
  Clock, 
  Calculator, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForBooking: (service: ServiceItem) => void;
  onOpenQuickBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  onOpenQuickBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Interactive Price Estimator State
  const [calcServiceId, setCalcServiceId] = useState('ac-tuneup');
  const [calcUrgency, setCalcUrgency] = useState<'standard' | 'same-day' | 'emergency'>('same-day');
  const [calcParts, setCalcParts] = useState(false);

  // Filtered services
  const filteredServices = activeCategory === 'all'
    ? SERVICES_CATALOG
    : SERVICES_CATALOG.filter((s) => s.category === activeCategory);

  // Selected service for calculator
  const selectedCalcService = SERVICES_CATALOG.find((s) => s.id === calcServiceId) || SERVICES_CATALOG[0];

  const estimate = calculateEstimate({
    basePrice: selectedCalcService.priceFrom,
    urgency: calcUrgency,
    partsNeeded: calcParts,
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ac-repair':
        return <Wind className="w-4 h-4 text-sky-600" />;
      case 'mechanic':
        return <Bike className="w-4 h-4 text-amber-600" />;
      case 'plumber':
        return <Droplet className="w-4 h-4 text-blue-600" />;
      case 'electrician':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'carpenter':
        return <Hammer className="w-4 h-4 text-orange-600" />;
      default:
        return <Wrench className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          {/* Anti-pill clean text metadata */}
          <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-2">
            01. Verified Local Trade Services
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            From bike breakdowns to AC cooling failure: your local crew has you covered.
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Every service is handled by background-checked neighborhood professionals equipped with proper diagnostic tools and factory-spec replacement parts.
          </p>
        </div>

        {/* Category Filter Tabs - clean segmented button bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {SERVICE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                  isActive ? 'bg-slate-800 text-amber-300' : 'bg-slate-200/80 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#FAFAFA] rounded-xl border border-slate-200 hover:border-slate-300 p-6 flex flex-col justify-between transition-all hover:shadow-sm"
            >
              <div>
                {/* Card Top: Category & Price */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <span className="p-1.5 bg-white rounded-md border border-slate-200 shadow-2xs">
                      {getCategoryIcon(service.category)}
                    </span>
                    <span>{service.categoryLabel}</span>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900 tabular-nums">
                      ${service.priceFrom}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {service.priceUnit === 'fixed' ? 'Fixed fee' : 'Starting from'}
                    </div>
                  </div>
                </div>

                {/* Title and Tagline */}
                <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Turnaround & Response Window - clean unboxed metadata */}
                <div className="flex items-center gap-3 text-xs text-slate-500 py-2 border-y border-slate-200/60 mb-4 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Est: {service.avgDuration}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Arrival: {service.responseWindow}</span>
                </div>

                {/* What's Included */}
                <div className="space-y-1.5 mb-5">
                  <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                    Service scope includes:
                  </div>
                  {service.included.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-200/70">
                <button
                  type="button"
                  onClick={() => onSelectServiceForBooking(service)}
                  className="w-full py-2.5 px-4 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-all hover:border-slate-400 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Instant Price Estimator Tool (High utility & engagement) */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <Calculator className="w-4 h-4" />
                <span>Transparent Cost Calculator</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Estimate your exact local repair cost before calling.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                No guessing games. Select your issue and urgency level below to preview verified local technician rates, inspection coverage, and spare parts benchmarks.
              </p>

              {/* Calculator Form Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label htmlFor="calc-service-select" className="block text-xs font-medium text-slate-400 mb-1.5">
                    Repair Service:
                  </label>
                  <select
                    id="calc-service-select"
                    value={calcServiceId}
                    onChange={(e) => setCalcServiceId(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
                  >
                    {SERVICES_CATALOG.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} (${s.priceFrom})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="calc-urgency-select" className="block text-xs font-medium text-slate-400 mb-1.5">
                    Arrival Urgency:
                  </label>
                  <select
                    id="calc-urgency-select"
                    value={calcUrgency}
                    onChange={(e) => setCalcUrgency(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="standard">Standard (Next Available / Scheduled)</option>
                    <option value="same-day">Same-Day Priority (+ $15 fee)</option>
                    <option value="emergency">Emergency 24/7 (Immediate Dispatch + $35)</option>
                  </select>
                </div>
              </div>

              {/* Checkbox for parts */}
              <div className="pt-1">
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={calcParts}
                    onChange={(e) => setCalcParts(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-700 focus:ring-amber-500"
                  />
                  <span>Include estimated hardware / replacement parts ($25–$65 typical)</span>
                </label>
              </div>
            </div>

            {/* Calculated Breakdown Card */}
            <div className="lg:col-span-5 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
              <div className="text-xs text-slate-400 font-medium">
                Estimated Price Range for {selectedCalcService.categoryLabel}:
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 tabular-nums">
                  ${estimate.totalEstimateMin} – ${estimate.totalEstimateMax}
                </span>
                <span className="text-xs text-slate-400 font-medium">all-in estimate</span>
              </div>

              <div className="space-y-1.5 text-xs border-t border-slate-800 pt-3 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Base Service Rate:</span>
                  <span className="tabular-nums font-semibold">${estimate.basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Urgency Dispatch Fee:</span>
                  <span className="tabular-nums font-semibold">
                    {estimate.urgencyFee > 0 ? `+$${estimate.urgencyFee}` : '$0 (Standard)'}
                  </span>
                </div>
                {calcParts && (
                  <div className="flex justify-between text-amber-300">
                    <span>Parts Benchmark (approx):</span>
                    <span className="tabular-nums font-semibold">+$25–$40</span>
                  </div>
                )}
                <div className="flex justify-between text-[11px] text-emerald-400 pt-1">
                  <span>Inspection Fee:</span>
                  <span>Waived upon service execution</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectServiceForBooking(selectedCalcService)}
                className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Book with This Estimate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
