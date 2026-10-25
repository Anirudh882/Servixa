import React, { useState } from 'react';
import { X, Wrench, CheckCircle2, ShieldCheck, Send } from 'lucide-react';
import { NEIGHBORHOODS } from '../data/mockData';

interface ProJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProJoinModal: React.FC<ProJoinModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [trade, setTrade] = useState('mechanic');
  const [neighborhood, setNeighborhood] = useState('oakridge');
  const [experience, setExperience] = useState('5');
  const [licenseInfo, setLicenseInfo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setLicenseInfo('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pro-modal-title"
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 id="pro-modal-title" className="text-xl font-bold text-slate-900">
              Welcome to the Servixa Guild!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
              Thanks <span className="font-semibold text-slate-900">{name}</span>. Your application for <span className="font-semibold text-slate-900">{trade}</span> in <span className="font-semibold text-slate-900">{neighborhood}</span> has been received.
            </p>
            <p className="text-xs text-slate-500">
              Our local town coordinator will call you within 24 hours to verify your credentials and send your starter onboarding kit.
            </p>

            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                <Wrench className="w-3.5 h-3.5" />
                <span>Craftsmen Guild Registration</span>
              </div>
              <h3 id="pro-modal-title" className="text-xl font-bold text-slate-900">
                Join Servixa as a Verified Local Pro
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Get steady customer repair requests in your immediate town. Zero commission on your first 10 completed jobs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Leo Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. (555) 345-6789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Trade / Skill *
                </label>
                <select
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="mechanic">Bike & Motorcycle Mechanic</option>
                  <option value="ac-repair">AC & Climate HVAC Specialist</option>
                  <option value="plumber">Plumber & Pipe Drainage</option>
                  <option value="electrician">Electrician & Wiring Pro</option>
                  <option value="carpenter">Carpenter & Door Locks</option>
                  <option value="appliance">Appliance / Washer / Fridge</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Years in Trade *
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="1">1–3 Years</option>
                  <option value="5">4–7 Years</option>
                  <option value="10">8–12 Years</option>
                  <option value="15">13+ Years (Master)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Primary Neighborhood in Town *
              </label>
              <select
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                {NEIGHBORHOODS.filter(n => n.id !== 'all').map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                License or Certification Number (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Master License #8491, EPA HVAC, or ASE certified"
                value={licenseInfo}
                onChange={(e) => setLicenseInfo(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                All pros must present government ID and undergo a standard municipal police background clearance.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Pro Application</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
