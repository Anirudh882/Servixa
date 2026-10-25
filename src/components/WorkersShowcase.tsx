import React, { useState } from 'react';
import { WORKERS_PROFILES } from '../data/mockData';
import { WorkerProfile, filterWorkers } from '../utils/serviceLogic';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  Briefcase, 
  CheckCircle, 
  Calendar,
  ExternalLink,
  Filter
} from 'lucide-react';

interface WorkersShowcaseProps {
  selectedTown: string;
  onOpenWorkerModal: (worker: WorkerProfile) => void;
  onBookWorkerDirectly: (worker: WorkerProfile) => void;
}

export const WorkersShowcase: React.FC<WorkersShowcaseProps> = ({
  selectedTown,
  onOpenWorkerModal,
  onBookWorkerDirectly,
}) => {
  const [filterTrade, setFilterTrade] = useState<string>('all');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = filterWorkers(WORKERS_PROFILES, {
    category: filterTrade,
    neighborhood: selectedTown,
    onlyAvailableToday: onlyAvailable,
    searchQuery: searchQuery,
  });

  return (
    <section id="pros" className="py-16 sm:py-24 bg-[#FAFAFA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-2">
              02. Verified Craftsmen In Your Town
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
              Meet the real plumbers, bike mechanics, and technicians serving your neighborhood.
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Every professional on Servixa has passed identity verification, trade license validation, and police records vetting. You hire real local residents who take pride in their craft.
            </p>
          </div>

          {/* Quick Stats Counter */}
          <div className="shrink-0 p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1">
            <div className="text-xs text-slate-500 font-medium">Currently Available Today:</div>
            <div className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="tabular-nums">5 Specialists Ready</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Trade Filter Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Trade:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All Crafts' },
                { id: 'mechanic', label: 'Bike/Motor Mechanic' },
                { id: 'ac-repair', label: 'AC & Climate' },
                { id: 'electrician', label: 'Electrician' },
                { id: 'plumber', label: 'Plumber' },
                { id: 'appliance', label: 'Appliance' },
                { id: 'carpenter', label: 'Carpenter' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setFilterTrade(t.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    filterTrade === t.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle for Available Today */}
          <div className="flex items-center gap-4 shrink-0">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 bg-white border-slate-300 focus:ring-amber-500"
              />
              <span>Available Right Now</span>
            </label>
          </div>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((worker) => (
            <div
              key={worker.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-6 flex flex-col justify-between transition-all hover:shadow-sm"
            >
              <div>
                {/* Header: Avatar, Name, Rating */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Distinctive craftsman avatar */}
                  <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center font-bold text-slate-800 text-base shrink-0 shadow-2xs">
                    <span>{worker.name.split(' ').map(n => n[0]).join('')}</span>
                    <span className="text-[9px] font-mono text-slate-500 uppercase">{worker.category.substring(0, 3)}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-base font-bold text-slate-900 truncate">
                        {worker.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-800 tabular-nums shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{worker.rating}</span>
                        <span className="text-slate-400 font-normal">({worker.reviewCount})</span>
                      </div>
                    </div>

                    <div className="text-xs font-medium text-amber-800 truncate">
                      {worker.trade}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{worker.neighborhood}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Verification & License Badge - clean text */}
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 mb-3 text-xs text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{worker.badge}</span>
                  </span>
                  <span className="text-slate-500 font-mono text-[11px] tabular-nums">
                    {worker.experienceYears}y in trade
                  </span>
                </div>

                {/* Bio quote */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  "{worker.bio}"
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {worker.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Key Numbers Row */}
                <div className="grid grid-cols-2 gap-2 text-xs py-2.5 border-t border-slate-100 mb-4 font-mono text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-sans">Jobs Completed</span>
                    <span className="font-bold text-slate-900 tabular-nums">{worker.jobsCompleted}+ jobs</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-sans">Starting Rate</span>
                    <span className="font-bold text-slate-900 tabular-nums">${worker.flatRateFrom} visit</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenWorkerModal(worker)}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors text-center cursor-pointer"
                >
                  View Profile
                </button>
                <button
                  type="button"
                  onClick={() => onBookWorkerDirectly(worker)}
                  className="flex-1 py-2 px-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors text-center shadow-2xs cursor-pointer"
                >
                  Request {worker.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8">
            <p className="text-sm font-semibold text-slate-700">No technicians matched the current filters.</p>
            <p className="text-xs text-slate-500 mt-1">Try switching to "All Crafts" or select "All Neighborhoods".</p>
            <button
              onClick={() => {
                setFilterTrade('all');
                setOnlyAvailable(false);
              }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
