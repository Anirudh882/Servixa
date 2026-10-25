import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  MapPin, 
  ShieldCheck, 
  Wrench, 
  UserCheck, 
  Wallet, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
  onOpenProJoin: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  onOpenBooking,
  onOpenProJoin,
}) => {
  const [activeTab, setActiveTab] = useState<'customer' | 'worker'>('customer');

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-2">
            03. The Neighborhood Process
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Built around neighborhood trust, speed, and clean work.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            No distant call centers or untraceable contractors. Every request connects directly with a recognized craftsman in your town.
          </p>

          {/* Clean Segmented Tab Toggle */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl mt-6 border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('customer')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'customer'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For Town Residents
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('worker')}
              className={`px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'worker'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              For Skilled Tradespeople
            </button>
          </div>
        </div>

        {/* Resident Flow */}
        {activeTab === 'customer' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Step 1 */}
              <div className="bg-[#FAFAFA] rounded-2xl p-7 border border-slate-200 relative">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 border border-amber-500/20 flex items-center justify-center font-bold text-base mb-5">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Describe what needs repair
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Select your service (bike breakdown, leaking pipe, AC cooling, or tripping breaker), specify your neighborhood, and choose your arrival urgency.
                </p>
                <div className="space-y-1 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Instant benchmark pricing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Same-day or scheduled slots</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#FAFAFA] rounded-2xl p-7 border border-slate-200 relative">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 border border-amber-500/20 flex items-center justify-center font-bold text-base mb-5">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Match with closest verified pro
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  We assign a certified, background-cleared technician located within 15–30 minutes of you. You receive their name, photo, and license number.
                </p>
                <div className="space-y-1 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Fully equipped service vans</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Live dispatch tracking</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#FAFAFA] rounded-2xl p-7 border border-slate-200 relative">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 border border-amber-500/20 flex items-center justify-center font-bold text-base mb-5">
                  3
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Fixed pricing & 30-day warranty
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  The pro performs the job cleanly. You pay only after inspecting the work, protected by our 30-day workmanship guarantee.
                </p>
                <div className="space-y-1 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cash, card, or direct transfer</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Written digital invoice provided</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-sm transition-all hover:shadow cursor-pointer"
              >
                <span>Request a Local Technician Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tradesperson Flow */}
        {activeTab === 'worker' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-[#FAFAFA] rounded-2xl p-7 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-700 border border-sky-500/20 flex items-center justify-center font-bold text-base mb-5">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Apply with your trade & license
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Electricians, plumbers, mobile mechanics, AC technicians, and carpenters can submit credentials and government ID online in under 3 minutes.
                </p>
                <div className="space-y-1 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zero upfront registration fees</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Local town coordinator review</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAFAFA] rounded-2xl p-7 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-700 border border-sky-500/20 flex items-center justify-center font-bold text-base mb-5">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Get verified within 24 hours
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Our local town supervisor completes a quick phone and tool audit. Once approved, you gain verified status and appear on your neighborhood radar.
                </p>
                <div className="space-y-1 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Official Servixa badge</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Insurance support provided</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAFAFA] rounded-2xl p-7 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-700 border border-sky-500/20 flex items-center justify-center font-bold text-base mb-5">
                  3
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Accept nearby jobs & keep 90%+
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Get job requests within 3–5 miles of your residence. No wasteful cross-city commutes. Earn transparent payouts with zero surprise lead fees.
                </p>
                <div className="space-y-1 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Direct weekly deposits</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Flexible hours on your schedule</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onOpenProJoin}
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-all hover:shadow cursor-pointer"
              >
                <span>Join Servixa Network as a Skilled Worker</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
