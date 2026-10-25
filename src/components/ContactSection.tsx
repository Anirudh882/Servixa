import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Wrench,
  Sparkles
} from 'lucide-react';
import { 
  NEIGHBORHOODS, 
  SERVICES_CATALOG 
} from '../data/mockData';
import { 
  validateBookingForm, 
  generateBookingReference, 
  BookingFormData 
} from '../utils/serviceLogic';

interface ContactSectionProps {
  initialCategory?: string;
  selectedTown: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialCategory = 'ac-repair',
  selectedTown,
}) => {
  const [formData, setFormData] = useState<Partial<BookingFormData>>({
    fullName: '',
    phone: '',
    serviceId: initialCategory,
    neighborhood: selectedTown !== 'all' ? selectedTown : 'midtown',
    address: '',
    issueDescription: '',
    urgency: 'same-day',
    preferredDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    reference: string;
    fullName: string;
    serviceName: string;
    urgency: string;
    estimatedArrival: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate reliable dispatch match
    setTimeout(() => {
      setIsSubmitting(false);
      const chosenService = SERVICES_CATALOG.find((s) => s.category === formData.serviceId || s.id === formData.serviceId);
      const serviceName = chosenService ? chosenService.title : 'General Repair Service';
      
      const arrival = formData.urgency === 'emergency' 
        ? 'Within 20–30 minutes' 
        : formData.urgency === 'same-day' 
          ? 'Today between 2:00 PM – 4:00 PM' 
          : 'Tomorrow morning';

      setConfirmation({
        reference: generateBookingReference(formData.neighborhood || 'TOWN'),
        fullName: formData.fullName || 'Neighbor',
        serviceName,
        urgency: formData.urgency || 'same-day',
        estimatedArrival: arrival,
      });
    }, 600);
  };

  const handleReset = () => {
    setConfirmation(null);
    setFormData({
      fullName: '',
      phone: '',
      serviceId: 'ac-repair',
      neighborhood: selectedTown !== 'all' ? selectedTown : 'midtown',
      address: '',
      issueDescription: '',
      urgency: 'same-day',
      preferredDate: '',
    });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-2">
            05. Request Service or Urgent Dispatch
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Book your repair in under 60 seconds.
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Fill in the details below or call our town dispatch line directly. A verified technician in your neighborhood will be assigned immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Direct Contact & Hotline Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 24/7 Hotline Card */}
            <div className="bg-slate-900 text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-md">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
                <Clock className="w-4 h-4" />
                <span>24/7 Emergency Dispatch</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Need emergency help right now?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                For sudden water pipe bursts, electrical sparking, or bike breakdown on the road, call our immediate dispatch hotline:
              </p>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 mb-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Town Dispatch Hotline</span>
                  <a href="tel:5557378492" className="text-xl font-extrabold text-amber-400 tracking-tight hover:underline">
                    (555) 737-8492
                  </a>
                </div>
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>On-duty mobile vans ready 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>No surcharge for initial phone diagnostic</span>
                </div>
              </div>
            </div>

            {/* Neighborhood Headquarters Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs text-slate-600">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Neighborhood Hub & Support
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Central Town Workshop:</span>
                  <span>402 Market Street, Suite 104, Central Town District</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Email Inquiries:</span>
                  <span>dispatch@servixa.town</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Guarantee Claims:</span>
                  <span>30-Day unconditional warranty on all authorized work orders.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Booking Form or Confirmation State */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAFAFA] rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              
              {confirmation ? (
                /* Success Confirmation State */
                <div className="text-center py-6 space-y-6">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <div className="text-xs font-mono font-semibold text-emerald-800 tracking-wide uppercase">
                      Dispatch Confirmed
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      Technician Alert Sent!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2">
                      Thank you, <span className="font-semibold text-slate-900">{confirmation.fullName}</span>. Your work order has been routed to the closest verified technician.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200 max-w-md mx-auto text-left space-y-3 text-xs">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Order Reference:</span>
                      <span className="font-mono font-bold text-slate-900">{confirmation.reference}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Requested Service:</span>
                      <span className="font-semibold text-slate-800">{confirmation.serviceName}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Estimated Arrival:</span>
                      <span className="font-bold text-emerald-700">{confirmation.estimatedArrival}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Payment:</span>
                      <span className="font-semibold text-slate-800">Direct after inspection (Cash / Card)</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500">
                    The assigned pro will call you within 5 minutes to confirm the exact parking and entry instructions.
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                /* Active Booking Request Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-200 pb-3 mb-4">
                    <h3 className="text-lg font-bold text-slate-900">
                      Service Request & Dispatch Form
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      No upfront credit card required. Upfront estimate confirmed before technician begins.
                    </p>
                  </div>

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="form-fullname" className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        id="form-fullname"
                        type="text"
                        placeholder="e.g. Rachel Adams"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full px-3 py-2 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 ${
                          errors.fullName ? 'border-rose-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="form-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number (for technician call) *
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        placeholder="e.g. (555) 234-8910"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-3 py-2 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 ${
                          errors.phone ? 'border-rose-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Service & Urgency */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="form-service" className="block text-xs font-semibold text-slate-700 mb-1">
                        Service Required *
                      </label>
                      <select
                        id="form-service"
                        value={formData.serviceId}
                        onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
                      >
                        <option value="ac-repair">Air Conditioner & AC Gas Refill</option>
                        <option value="mechanic">Bike & Motorcycle Mobile Repair</option>
                        <option value="plumber">Plumbing Leaks & Drain Clearing</option>
                        <option value="electrician">Electrician & Circuit Breakers</option>
                        <option value="carpenter">Carpenter & Locksmithing</option>
                        <option value="appliance">Washing Machine & Refrigerator</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="form-urgency" className="block text-xs font-semibold text-slate-700 mb-1">
                        Dispatch Urgency *
                      </label>
                      <select
                        id="form-urgency"
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
                      >
                        <option value="emergency">Emergency (Within 20–30 mins)</option>
                        <option value="same-day">Today (Priority Same-Day)</option>
                        <option value="standard">Standard (Next Available / Tomorrow)</option>
                      </select>
                    </div>
                  </div>

                  {/* Neighborhood and Street Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="form-neighborhood" className="block text-xs font-semibold text-slate-700 mb-1">
                        Town / Neighborhood *
                      </label>
                      <select
                        id="form-neighborhood"
                        value={formData.neighborhood}
                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
                      >
                        {NEIGHBORHOODS.filter(n => n.id !== 'all').map((n) => (
                          <option key={n.id} value={n.id}>
                            {n.name}
                          </option>
                        ))}
                      </select>
                      {errors.neighborhood && (
                        <p className="text-[11px] text-rose-600 mt-1">{errors.neighborhood}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="form-address" className="block text-xs font-semibold text-slate-700 mb-1">
                        Street Address / Landmark *
                      </label>
                      <input
                        id="form-address"
                        type="text"
                        placeholder="e.g. 744 Pinecrest Blvd, Apt 3A"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className={`w-full px-3 py-2 text-xs bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 ${
                          errors.address ? 'border-rose-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.address && (
                        <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>
                      )}
                    </div>
                  </div>

                  {/* Description of Issue */}
                  <div>
                    <label htmlFor="form-description" className="block text-xs font-semibold text-slate-700 mb-1">
                      Describe the problem in a few words *
                    </label>
                    <textarea
                      id="form-description"
                      rows={3}
                      placeholder="e.g. Split AC is blowing room-temperature air and making a vibrating hum; or bike chain slipped and derailleur is bent."
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

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <span>Matching Closest Neighborhood Pro...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 stroke-[2.5]" />
                          <span>Submit Request & Confirm Dispatch</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-slate-500 mt-2">
                      Protected by the Servixa 30-day workmanship guarantee. Zero payment upfront.
                    </p>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
