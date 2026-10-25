import React from 'react';
import { AlertTriangle, PhoneCall, ArrowRight, Clock } from 'lucide-react';

interface EmergencyBannerProps {
  onTriggerEmergency: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onTriggerEmergency }) => {
  return (
    <div className="bg-amber-500 text-slate-950 py-4 px-4 sm:px-6 lg:px-8 border-y border-amber-600">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg bg-slate-950 text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-extrabold tracking-tight">
              Active Water Leak, Electrical Spark, or Roadside Bike Breakdown?
            </div>
            <div className="text-xs text-slate-900 font-medium">
              Priority mobile technicians on duty 24/7. Average town response in under 20 minutes.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:5557378492"
            className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-amber-400 text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 transition-transform hover:scale-102"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call (555) 737-8492</span>
          </a>
          <button
            type="button"
            onClick={onTriggerEmergency}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <span>Priority Form</span>
          </button>
        </div>

      </div>
    </div>
  );
};
