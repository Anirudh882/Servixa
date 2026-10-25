import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Clock, MapPin, Wrench } from 'lucide-react';
import { NEIGHBORHOODS, SERVICES_CATALOG, ServiceItem } from '../data/mockData';
import { validateBookingForm, generateBookingReference, BookingFormData } from '../utils/serviceLogic';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ServiceItem | null;
  preselectedCategory?: string | null;
  selectedTown: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  preselectedCategory,
  selectedTown,
}) => {
  const [formData, setFormData] = useState<Partial<BookingFormData>>({
    fullName: '',
    phone: '',
    serviceId: preselectedService ? preselectedService.id : (preselectedCategory || 'ac-repair'),
    neighborhood: selectedTown !== 'all' ? selectedTown : 'midtown',
    address: '',
    issueDescription: '',
    urgency: 'same-day',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationRef, setConfirmationRef] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        serviceId: preselectedService.category,
        issueDescription: prev.issueDescription || `Request for: ${preselectedService.title}`,
      }));
    } else if (preselectedCategory) {
      setFormData((prev) => ({
        ...prev,
        serviceId: preselectedCategory,
      }));
    }
  }, [preselectedService, preselectedCategory]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmationRef(generateBookingReference(formData.neighborhood || 'TOWN'));
    }, 500);
  };

  const handleClose = () => {
    setConfirmationRef(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmationRef ? (
          <div className="text-center py-4 space-y-5">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <div className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wide">
                Booking Registered
              </div>
              <h3 id="booking-modal-title" className="text-xl font-bold text-slate-900 mt-1">
                Technician Dispatch Initiated
              </h3>
              <p className="text-xs text-slate-600 mt-2">
                Order Reference: <span className="font-mono font-bold text-slate-900">{confirmationRef}</span>
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-semibold">{formData.serviceId?.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact:</span>
                <span className="font-semibold">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment:</span>
                <span className="font-semibold text-emerald-700">Direct after inspection</span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              The assigned pro will call your phone number within a few minutes to confirm exact arrival details.
            </p>

            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                Servixa Fast Dispatch
              </div>
              <h3 id="booking-modal-title" className="text-xl font-bold text-slate-900">
                Book a Verified Local Pro
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Upfront rate guaranteed. 30-day workmanship guarantee included.
              </p>
            </div>

            {/* Service & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Repair Type *
                </label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="ac-repair">Air Conditioner & AC Gas</option>
                  <option value="mechanic">Bike & Motorcycle Mechanic</option>
                  <option value="plumber">Plumber & Pipe Drainage</option>
                  <option value="electrician">Electrician & Breakers</option>
                  <option value="carpenter">Carpenter & Door Locks</option>
                  <option value="appliance">Appliance / Washer / Fridge</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Urgency Level *
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="emergency">Emergency (Within 20–30 mins)</option>
                  <option value="same-day">Today (Same-day Priority)</option>
                  <option value="standard">Standard (Next Available)</option>
                </select>
              </div>
            </div>

            {/* Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Liam Miller"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3 py-2 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 ${
                    errors.fullName ? 'border-rose-500' : 'border-slate-300'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. (555) 789-2345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3 py-2 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 ${
                    errors.phone ? 'border-rose-500' : 'border-slate-300'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Neighborhood & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Town District *
                </label>
                <select
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
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
                  Street / Address *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 52 River Road"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3 py-2 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 ${
                    errors.address ? 'border-rose-500' : 'border-slate-300'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
              </div>
            </div>

            {/* Issue Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Describe the problem *
              </label>
              <textarea
                rows={3}
                placeholder="What is making noise, leaking, broken, or not turning on?"
                value={formData.issueDescription}
                onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                className={`w-full px-3 py-2 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 ${
                  errors.issueDescription ? 'border-rose-500' : 'border-slate-300'
                }`}
              />
              {errors.issueDescription && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.issueDescription}</p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-75"
              >
                <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{isSubmitting ? 'Routing Request...' : 'Confirm Dispatch'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
