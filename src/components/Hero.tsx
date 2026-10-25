import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Wrench, 
  Flame, 
  Bike, 
  Wind, 
  Zap, 
  Droplet,
  CheckCircle2,
  ArrowRight,
  Star
} from 'lucide-react';
import { NEIGHBORHOODS, WORKERS_PROFILES } from '../data/mockData';

interface HeroProps {
  selectedTown: string;
  onSelectTown: (townId: string) => void;
  onSearch: (category: string, neighborhood: string) => void;
  onOpenBookingForService: (serviceCategory: string) => void;
  onOpenWorker: (workerId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedTown,
  onSelectTown,
  onSearch,
  onOpenBookingForService,
  onOpenWorker,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [liveActiveIndex, setLiveActiveIndex] = useState(0);

  const heroPros = WORKERS_PROFILES.slice(0, 3);
  const activePro = heroPros[liveActiveIndex];

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedCategory, selectedTown);
    const element = document.getElementById('pros');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80">
      
      {/* Subtle background ambient grid (clean, minimal) */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 -z-10 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Kicker - clean unboxed metadata (anti-pill compliant) */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-amber-700 uppercase mb-4">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
          <span>Hyperlocal Neighborhood Network</span>
          <span aria-hidden="true">·</span>
          <span>Verified Local Craftsmen & Technicians</span>
        </div>

        {/* 2-Column Balanced Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Core Value Proposition & Search Bar */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]" style={{ textWrap: 'balance' }}>
              Local skilled hands for your town's every repair.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Connect in minutes with vetted electricians, plumbers, mobile bike mechanics, and AC specialists living right in your neighborhood. Fixed transparent rates, guaranteed workmanship.
            </p>

            {/* Quick service category discovery buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-medium text-slate-600">
              <span className="text-slate-400 font-normal">Common requests:</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('ac-repair');
                  onOpenBookingForService('ac-repair');
                }}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Wind className="w-3.5 h-3.5 text-sky-600" />
                <span>AC Cooling & Gas</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('mechanic');
                  onOpenBookingForService('mechanic');
                }}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Bike className="w-3.5 h-3.5 text-amber-600" />
                <span>Bike & Scooter Tune-up</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('plumber');
                  onOpenBookingForService('plumber');
                }}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Droplet className="w-3.5 h-3.5 text-blue-600" />
                <span>Plumbing Leaks</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('electrician');
                  onOpenBookingForService('electrician');
                }}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Circuit Breaker Fix</span>
              </button>
            </div>

            {/* Live Interactive Search Bar Box */}
            <form 
              onSubmit={handleHeroSearchSubmit}
              className="p-3 bg-white border border-slate-300 rounded-xl shadow-md space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3"
            >
              {/* Category Select */}
              <div className="flex-1 min-w-0">
                <label htmlFor="hero-service-select" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
                  Need Repair For:
                </label>
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    id="hero-service-select"
                    aria-label="Need Repair For"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer truncate"
                  >
                    <option value="all">All Skilled Trades</option>
                    <option value="ac-repair">Air Conditioner & Cooling</option>
                    <option value="mechanic">Bike & Motorcycle Mechanic</option>
                    <option value="plumber">Plumber & Pipe Drainage</option>
                    <option value="electrician">Electrician & Wiring</option>
                    <option value="carpenter">Carpenter & Door Locks</option>
                    <option value="appliance">Washing Machine & Fridge</option>
                  </select>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-slate-200 shrink-0" />

              {/* Neighborhood Select */}
              <div className="flex-1 min-w-0">
                <label htmlFor="hero-neighborhood-select" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
                  Your Town / Area:
                </label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    id="hero-neighborhood-select"
                    aria-label="Your Town or Area"
                    value={selectedTown}
                    onChange={(e) => onSelectTown(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer truncate"
                  >
                    {NEIGHBORHOODS.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit CTA button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg shadow-sm transition-all hover:shadow flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Find Nearby Pro</span>
              </button>
            </form>

            {/* Quick Guarantees note */}
            <div className="flex items-center flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero upfront advance required</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Police & background cleared</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>30-day workmanship warranty</span>
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Live Dispatch Preview Console */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 relative">
              
              {/* Card Header with real status badge */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div>
                  <div className="text-[11px] font-mono tracking-wider text-amber-400 uppercase">
                    Neighborhood Radar
                  </div>
                  <div className="text-base font-bold text-white mt-0.5">
                    Live Active Technicians
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-slate-300">
                    Town: <span className="text-white font-semibold">{NEIGHBORHOODS.find(n => n.id === selectedTown)?.name || 'Local Town'}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 tabular-nums">
                    Avg arrival: <span className="text-emerald-400 font-bold">22 min</span>
                  </div>
                </div>
              </div>

              {/* Active Dispatch Radar Switcher */}
              <div className="space-y-3 mb-5">
                {heroPros.map((pro, index) => {
                  const isCurrent = index === liveActiveIndex;
                  return (
                    <button
                      key={pro.id}
                      type="button"
                      onClick={() => setLiveActiveIndex(index)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        isCurrent
                          ? 'bg-slate-800/90 border-amber-500/70 shadow-sm'
                          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Avatar initials with trade color */}
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                          pro.category === 'mechanic' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          pro.category === 'ac-repair' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                          'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {pro.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white truncate flex items-center gap-1.5">
                            <span>{pro.name}</span>
                            <span className="text-[11px] font-normal text-slate-400">({pro.experienceYears}y exp)</span>
                          </div>
                          <div className="text-xs text-slate-400 truncate">
                            {pro.trade}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold justify-end">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{pro.rating}</span>
                        </div>
                        <div className="text-[11px] text-emerald-400 font-medium">
                          {pro.responseTimeMinutes} min dispatch
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Selected Pro Detail Box */}
              {activePro && (
                <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{activePro.badge}</span>
                    </span>
                    <span className="font-semibold text-white tabular-nums">
                      ${activePro.flatRateFrom} starting visit
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{activePro.bio}"
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onOpenWorker(activePro.id)}
                      className="flex-1 py-2 px-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-center"
                    >
                      View Verified Credentials
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenBookingForService(activePro.category)}
                      className="flex-1 py-2 px-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors text-center shadow-xs"
                    >
                      Request {activePro.name.split(' ')[0]} Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Transparency Row (Full-width below hero split per frontend guidelines) */}
        <div className="mt-14 pt-10 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              850+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800">
              Verified Craftsmen
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              Licensed plumbers, bike mechanics, electricians in town.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              24 Mins
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800">
              Avg. Response Arrival
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              Stationed in your immediate neighborhood for fast dispatch.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              $0 Surprise
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800">
              Fixed Upfront Quotes
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              Written quote before work begins. No hidden overtime fees.
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              30-Day
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-800">
              Workmanship Guarantee
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              If an issue returns within 30 days, pro re-services for free.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
