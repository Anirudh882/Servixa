import React from 'react';
import { Wrench, ShieldCheck, Heart } from 'lucide-react';
import { NEIGHBORHOODS, SERVICE_CATEGORIES } from '../data/mockData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenProJoin: () => void;
  onSelectTown: (townId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenProJoin,
  onSelectTown,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950">
                <Wrench className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">Servixa</span>
            </a>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Hyperlocal neighborhood network connecting town residents with vetted, background-checked plumbers, mobile bike mechanics, AC repair technicians, and electricians.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>30-Day Workmanship Guarantee on all completed work</span>
            </div>
          </div>

          {/* Quick Services */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Repair Services
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">AC Repair & Gas Refill</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Doorstep Bike & Motorcycle Repair</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Pipe Burst & Plumbing Leaks</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Circuit Breakers & Electrician</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Appliance & Washing Machines</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Door Locks & Woodworking</a>
              </li>
            </ul>
          </div>

          {/* Neighborhood Hubs */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Town Districts
            </div>
            <ul className="space-y-2 text-slate-400">
              {NEIGHBORHOODS.filter(n => n.id !== 'all').map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => onSelectTown(n.id)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {n.name} ({n.activeProsCount} pros)
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* For Craftsmen & Community */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Local Network
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={onOpenProJoin}
                  className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                >
                  Join as a Local Pro
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Book Instant Service
                </button>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  Vetting & Verification Standards
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Customer Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  24/7 Emergency Dispatch
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Quiet Notices */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Servixa Inc. All rights reserved. Connecting local tradespeople and town communities.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 transition-colors">Terms of Workmanship</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 transition-colors">Worker Safety Code</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
