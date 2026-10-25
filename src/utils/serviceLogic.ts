export interface ServiceEstimateInput {
  basePrice: number;
  urgency: 'standard' | 'same-day' | 'emergency';
  laborHours?: number;
  partsNeeded?: boolean;
}

export interface ServiceEstimateResult {
  basePrice: number;
  urgencyFee: number;
  partsEstimated: number;
  inspectionFee: number;
  totalEstimateMin: number;
  totalEstimateMax: number;
}

export interface WorkerFilterParams {
  category?: string;
  neighborhood?: string;
  minRating?: number;
  onlyAvailableToday?: boolean;
  searchQuery?: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  trade: string;
  category: 'electrician' | 'plumber' | 'mechanic' | 'ac-repair' | 'carpenter' | 'appliance' | 'painter';
  town: string;
  neighborhood: string;
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  hourlyRate: number;
  flatRateFrom: number;
  experienceYears: number;
  isAvailableToday: boolean;
  responseTimeMinutes: number;
  badge: string;
  skills: string[];
  bio: string;
  verified: boolean;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  serviceId: string;
  neighborhood: string;
  address: string;
  issueDescription: string;
  urgency: 'standard' | 'same-day' | 'emergency';
  preferredDate?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Calculates price estimate range based on service parameters and urgency
 */
export function calculateEstimate(input: ServiceEstimateInput): ServiceEstimateResult {
  const base = Math.max(0, input.basePrice);
  
  let urgencyMultiplier = 1;
  let urgencyFee = 0;

  if (input.urgency === 'same-day') {
    urgencyFee = 15;
    urgencyMultiplier = 1.15;
  } else if (input.urgency === 'emergency') {
    urgencyFee = 35;
    urgencyMultiplier = 1.35;
  }

  const partsEstimated = input.partsNeeded ? 25 : 0;
  const inspectionFee = 19; // Waived if service is carried out

  const subtotal = (base * urgencyMultiplier) + urgencyFee + partsEstimated;
  const min = Math.round(subtotal);
  const max = Math.round(subtotal * 1.35 + (input.partsNeeded ? 40 : 0));

  return {
    basePrice: base,
    urgencyFee,
    partsEstimated,
    inspectionFee,
    totalEstimateMin: min,
    totalEstimateMax: max,
  };
}

/**
 * Filters a list of tradespeople by town, category, rating, and availability
 */
export function filterWorkers(workers: WorkerProfile[], params: WorkerFilterParams): WorkerProfile[] {
  return workers.filter((worker) => {
    if (params.category && params.category !== 'all' && worker.category !== params.category) {
      return false;
    }
    if (
      params.neighborhood &&
      params.neighborhood !== 'all' &&
      worker.neighborhood.toLowerCase() !== params.neighborhood.toLowerCase() &&
      worker.town.toLowerCase() !== params.neighborhood.toLowerCase()
    ) {
      return false;
    }
    if (params.minRating && worker.rating < params.minRating) {
      return false;
    }
    if (params.onlyAvailableToday && !worker.isAvailableToday) {
      return false;
    }
    if (params.searchQuery) {
      const q = params.searchQuery.toLowerCase().trim();
      const inName = worker.name.toLowerCase().includes(q);
      const inTrade = worker.trade.toLowerCase().includes(q);
      const inSkills = worker.skills.some((s) => s.toLowerCase().includes(q));
      const inTown = worker.neighborhood.toLowerCase().includes(q);
      if (!inName && !inTrade && !inSkills && !inTown) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Validates service request and booking forms
 */
export function validateBookingForm(data: Partial<BookingFormData>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  // Basic phone validation (allowing international or standard phone formats)
  const phoneClean = (data.phone || '').replace(/[\s\-()+.]/g, '');
  if (!phoneClean || phoneClean.length < 8 || !/^\d+$/.test(phoneClean)) {
    errors.phone = 'Please enter a valid phone number so the technician can contact you.';
  }

  if (!data.serviceId || data.serviceId.trim() === '') {
    errors.serviceId = 'Please select a service or repair type.';
  }

  if (!data.neighborhood || data.neighborhood.trim() === '') {
    errors.neighborhood = 'Please select or enter your town or neighborhood.';
  }

  if (!data.address || data.address.trim().length < 5) {
    errors.address = 'Please provide your street or landmark address.';
  }

  if (!data.issueDescription || data.issueDescription.trim().length < 8) {
    errors.issueDescription = 'Please describe the problem in a few words (at least 8 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates an authentic tracking reference code
 */
export function generateBookingReference(neighborhood: string = 'TOWN'): string {
  const prefix = 'SRV';
  const cleanHood = neighborhood.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, 'TWN');
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${randomNum}-${cleanHood}`;
}
