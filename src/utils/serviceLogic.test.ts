import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEstimate,
  filterWorkers,
  validateBookingForm,
  generateBookingReference,
  WorkerProfile
} from './serviceLogic';

test('calculateEstimate returns base pricing correctly for standard urgency', () => {
  const result = calculateEstimate({
    basePrice: 50,
    urgency: 'standard',
    partsNeeded: false
  });
  assert.equal(result.basePrice, 50);
  assert.equal(result.urgencyFee, 0);
  assert.equal(result.partsEstimated, 0);
  assert.equal(result.totalEstimateMin, 50);
  assert.ok(result.totalEstimateMax >= result.totalEstimateMin);
});

test('calculateEstimate applies emergency surcharges properly', () => {
  const result = calculateEstimate({
    basePrice: 60,
    urgency: 'emergency',
    partsNeeded: true
  });
  assert.equal(result.urgencyFee, 35);
  assert.equal(result.partsEstimated, 25);
  // subtotal = 60 * 1.35 (81) + 35 + 25 = 141
  assert.equal(result.totalEstimateMin, 141);
  assert.ok(result.totalEstimateMax > 141);
});

test('filterWorkers correctly filters by category and neighborhood', () => {
  const mockWorkers: WorkerProfile[] = [
    {
      id: 'w1',
      name: 'Marcus Vance',
      trade: 'Master Electrician',
      category: 'electrician',
      town: 'Oakridge',
      neighborhood: 'Oakridge Central',
      rating: 4.9,
      reviewCount: 142,
      jobsCompleted: 380,
      hourlyRate: 45,
      flatRateFrom: 35,
      experienceYears: 12,
      isAvailableToday: true,
      responseTimeMinutes: 25,
      badge: 'Certified Master Pro',
      skills: ['Circuit rewiring', 'Breaker fix'],
      bio: 'Licensed electrician with 12 years local experience.',
      verified: true
    },
    {
      id: 'w2',
      name: 'Samira Patel',
      trade: 'AC & Refrigeration Specialist',
      category: 'ac-repair',
      town: 'Midtown',
      neighborhood: 'Midtown',
      rating: 4.8,
      reviewCount: 98,
      jobsCompleted: 210,
      hourlyRate: 50,
      flatRateFrom: 40,
      experienceYears: 8,
      isAvailableToday: false,
      responseTimeMinutes: 45,
      badge: 'HVAC Certified',
      skills: ['AC gas refill', 'Compressor overhaul'],
      bio: 'Specialist in split AC and cooling maintenance.',
      verified: true
    }
  ];

  // Category filter
  const electricians = filterWorkers(mockWorkers, { category: 'electrician' });
  assert.equal(electricians.length, 1);
  assert.equal(electricians[0].id, 'w1');

  // Availability filter
  const availableToday = filterWorkers(mockWorkers, { onlyAvailableToday: true });
  assert.equal(availableToday.length, 1);
  assert.equal(availableToday[0].id, 'w1');

  // Search query filter
  const acSearch = filterWorkers(mockWorkers, { searchQuery: 'compressor' });
  assert.equal(acSearch.length, 1);
  assert.equal(acSearch[0].id, 'w2');
});

test('validateBookingForm validates mandatory fields and fails invalid inputs', () => {
  const emptyValidation = validateBookingForm({});
  assert.equal(emptyValidation.isValid, false);
  assert.ok(emptyValidation.errors.fullName);
  assert.ok(emptyValidation.errors.phone);
  assert.ok(emptyValidation.errors.serviceId);
  assert.ok(emptyValidation.errors.neighborhood);
  assert.ok(emptyValidation.errors.address);
  assert.ok(emptyValidation.errors.issueDescription);

  const validSubmission = validateBookingForm({
    fullName: 'Jane Doe',
    phone: '555-019-2834',
    serviceId: 'ac-repair',
    neighborhood: 'Oakridge',
    address: '42 Elm Street, Apt 2B',
    issueDescription: 'AC is blowing warm air and making a vibrating noise',
    urgency: 'same-day'
  });
  assert.equal(validSubmission.isValid, true);
  assert.equal(Object.keys(validSubmission.errors).length, 0);
});

test('generateBookingReference formats tracking code with neighborhood code', () => {
  const ref = generateBookingReference('Oakridge');
  assert.match(ref, /^SRV-\d{4}-OAK$/);
});
