import React, { useState } from 'react';
import { TESTIMONIALS, Testimonial } from '../data/mockData';
import { Star, CheckCircle, MapPin, Quote, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');

  const categories = ['all', 'AC Repair', 'Bike Breakdown Assist', 'Plumbing Leak', 'Electrician'];

  const filteredTestimonials = filterType === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.serviceCategory.toLowerCase().includes(filterType.toLowerCase()));

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-[#FAFAFA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-2">
            04. Neighborhood Proof & Verified Reviews
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Real repair outcomes, verified town receipts, zero inflated claims.
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Every review below comes from a verified work order with the exact repair details and final cost paid by your neighbors.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilterType(c)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filterType === c
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {c === 'all' ? 'All Reviews' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between shadow-2xs space-y-6"
            >
              <div className="space-y-4">
                {/* Header: Customer, Town Location, Star Rating */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.customerName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{item.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-slate-700">{item.serviceCategory}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-slate-900 tabular-nums shrink-0">
                    <div className="flex">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Problem vs Outcome Box */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
                  <div>
                    <span className="font-bold text-rose-800 uppercase text-[10px] tracking-wider block mb-0.5">
                      The Emergency / Problem:
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      "{item.problem}"
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <span className="font-bold text-emerald-800 uppercase text-[10px] tracking-wider block mb-0.5">
                      Technician Resolution:
                    </span>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      "{item.outcome}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Info: Pro Name, Cost Paid, Verified Badge */}
              <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
                <div className="text-slate-500">
                  Serviced by: <span className="font-bold text-slate-900">{item.proName}</span>
                </div>

                <div className="text-right">
                  <div className="font-bold text-slate-900 tabular-nums">
                    {item.cost}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold justify-end">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Verified Receipt</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust banner underneath */}
        <div className="mt-12 bg-white rounded-xl p-6 border border-slate-200 text-center sm:flex sm:items-center sm:justify-between gap-6">
          <div className="text-left mb-4 sm:mb-0">
            <div className="text-sm font-bold text-slate-900">
              Need a repair performed today?
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              Over 94% of repair requests in your town are matched with an en-route technician within 3 minutes.
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs whitespace-nowrap"
          >
            Request Instant Dispatch
          </a>
        </div>

      </div>
    </section>
  );
};
