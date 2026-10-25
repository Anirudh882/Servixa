import React from 'react';
import { X, ShieldCheck, Star, MapPin, Clock, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { WorkerProfile } from '../utils/serviceLogic';

interface WorkerModalProps {
  worker: WorkerProfile | null;
  onClose: () => void;
  onBookWorker: (worker: WorkerProfile) => void;
}

export const WorkerModal: React.FC<WorkerModalProps> = ({
  worker,
  onClose,
  onBookWorker,
}) => {
  if (!worker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="worker-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Header Profile */}
          <div className="flex items-start gap-4 pr-8">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-amber-400 font-bold text-xl flex items-center justify-center shrink-0 shadow-md">
              {worker.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Servixa Craftsman</span>
              </div>
              <h3 id="worker-modal-title" className="text-xl font-bold text-slate-900">
                {worker.name}
              </h3>
              <div className="text-xs font-medium text-amber-800">
                {worker.trade}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Stationed in {worker.neighborhood}</span>
              </div>
            </div>
          </div>

          {/* Metrics bar */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Rating</span>
              <span className="font-bold text-slate-900 flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {worker.rating}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Town Jobs</span>
              <span className="font-bold text-slate-900">{worker.jobsCompleted}+</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Experience</span>
              <span className="font-bold text-slate-900">{worker.experienceYears} Years</span>
            </div>
          </div>

          {/* Bio & Background */}
          <div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              About & Experience
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {worker.bio}
            </p>
          </div>

          {/* Credentials Audit */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Verification Audit & Badges
            </div>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Trade Credential: {worker.badge}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Municipal & Police Background Clearance: Passed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Commercial General Liability Insurance: Active</span>
              </div>
            </div>
          </div>

          {/* Specialties / Kit */}
          <div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Primary Specialties
            </div>
            <div className="flex flex-wrap gap-2">
              {worker.skills.map((skill, idx) => (
                <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing Info */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900 text-white rounded-xl">
            <div>
              <span className="text-[11px] text-slate-400 block">Initial Diagnostic Visit</span>
              <span className="text-lg font-bold text-amber-400 tabular-nums">${worker.flatRateFrom} flat rate</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Avg. Town Arrival</span>
              <span className="text-xs font-semibold text-emerald-400">Within {worker.responseTimeMinutes} mins</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookWorker(worker);
              }}
              className="flex-2 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Book {worker.name.split(' ')[0]} Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
