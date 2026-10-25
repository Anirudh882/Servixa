import React, { useState } from 'react';
import { Wrench, MapPin, Menu, X, ShieldCheck, PhoneCall } from 'lucide-react';
import { NEIGHBORHOODS } from '../data/mockData';

interface HeaderProps {
  selectedTown: string;
  onSelectTown: (townId: string) => void;
  onOpenBooking: () => void;
  onOpenProJoin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedTown,
  onSelectTown,
  onOpenBooking,
  onOpenProJoin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Single text element wordmark with icon */}
          <a
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-amber-400 shadow-sm transition-transform group-hover:scale-105">
              <Wrench className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Servixa
            </span>
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Services
            </a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              How It Works
            </a>
            <a href="#pros" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Verified Pros
            </a>
            <a href="#testimonials" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Reviews
            </a>
            <a href="#contact" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Contact & Quote
            </a>
          </nav>

          {/* Zone 3: 1 primary action & town selector */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Town Filter Selector */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-lg text-xs font-medium text-slate-700 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <label htmlFor="top-town-select" className="sr-only">Choose Town Area</label>
              <select
                id="top-town-select"
                aria-label="Choose Town Area"
                value={selectedTown}
                onChange={(e) => onSelectTown(e.target.value)}
                className="bg-transparent border-none text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
              >
                {NEIGHBORHOODS.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onOpenProJoin}
              className="hidden sm:inline-flex text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
            >
              Join as a Pro
            </button>

            <button
              onClick={onOpenBooking}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all hover:shadow hover:-translate-y-0.5 whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Book a Service</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="pt-1 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Selected Location:</span>
            <select
              aria-label="Mobile Town Area"
              value={selectedTown}
              onChange={(e) => {
                onSelectTown(e.target.value);
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded"
            >
              {NEIGHBORHOODS.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:bg-slate-50 rounded-md"
            >
              Services & Repairs
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:bg-slate-50 rounded-md"
            >
              How It Works
            </a>
            <a
              href="#pros"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:bg-slate-50 rounded-md"
            >
              Verified Local Craftsmen
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:bg-slate-50 rounded-md"
            >
              Customer Reviews
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:bg-slate-50 rounded-md"
            >
              Emergency & Direct Request
            </a>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-slate-900 rounded-lg shadow-sm"
            >
              Book a Service
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProJoin();
              }}
              className="w-full py-2 text-center text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
            >
              Are you a skilled worker? Join Servixa
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
