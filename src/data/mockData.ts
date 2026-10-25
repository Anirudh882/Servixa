import { WorkerProfile } from '../utils/serviceLogic';

export interface ServiceItem {
  id: string;
  title: string;
  category: 'electrician' | 'plumber' | 'mechanic' | 'ac-repair' | 'carpenter' | 'appliance' | 'painter';
  categoryLabel: string;
  tagline: string;
  description: string;
  priceFrom: number;
  priceUnit: 'fixed' | 'hourly' | 'starting';
  avgDuration: string;
  responseWindow: string;
  commonIssues: string[];
  included: string[];
  popular?: boolean;
}

export interface TownNeighborhood {
  id: string;
  name: string;
  activeProsCount: number;
  avgArrivalMinutes: number;
}

export interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  serviceCategory: string;
  proName: string;
  rating: number;
  date: string;
  problem: string;
  outcome: string;
  cost: string;
  verifiedBooking: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const NEIGHBORHOODS: TownNeighborhood[] = [
  { id: 'all', name: 'All Neighborhoods', activeProsCount: 148, avgArrivalMinutes: 28 },
  { id: 'oakridge', name: 'Oakridge & Uptown', activeProsCount: 34, avgArrivalMinutes: 22 },
  { id: 'midtown', name: 'Midtown Central', activeProsCount: 42, avgArrivalMinutes: 18 },
  { id: 'river-north', name: 'River North', activeProsCount: 26, avgArrivalMinutes: 25 },
  { id: 'harbor-west', name: 'Harbor West & Bay', activeProsCount: 28, avgArrivalMinutes: 30 },
  { id: 'maplewood', name: 'Maplewood Valley', activeProsCount: 18, avgArrivalMinutes: 32 },
];

export const SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Services', count: 24 },
  { id: 'ac-repair', label: 'AC & Climate', count: 5 },
  { id: 'mechanic', label: 'Bike & Auto Mechanic', count: 4 },
  { id: 'plumber', label: 'Plumbing & Pipes', count: 5 },
  { id: 'electrician', label: 'Electrician & Wiring', count: 4 },
  { id: 'carpenter', label: 'Carpentry & Handyman', count: 3 },
  { id: 'appliance', label: 'Appliance Repair', count: 3 },
];

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'ac-tuneup',
    title: 'AC Deep Clean & Cooling Tune-up',
    category: 'ac-repair',
    categoryLabel: 'AC & Climate',
    tagline: 'Restore ice-cold airflow and eliminate musty smells within 60 minutes.',
    description: 'Complete high-pressure coil wash, jet cleaning, blower fan cleansing, and drainage line flush for split and window AC units.',
    priceFrom: 39,
    priceUnit: 'fixed',
    avgDuration: '45–60 mins',
    responseWindow: 'Within 45 mins',
    commonIssues: ['Weak airflow', 'Musty odor', 'Water dripping inside', 'High electricity bill'],
    included: ['Indoor coil jet pump wash', 'Drain pipe flush', 'Gas pressure check', 'Filter sterilization'],
    popular: true,
  },
  {
    id: 'ac-gas-refill',
    title: 'AC Refrigerant Gas Leak & Refill',
    category: 'ac-repair',
    categoryLabel: 'AC & Climate',
    tagline: 'Certified refrigerant recovery and eco-friendly gas top-up.',
    description: 'Precision electronic leak detection, brazing/soldering of copper pipes, nitrogen pressure test, and certified R32/R410A refrigerant charge.',
    priceFrom: 49,
    priceUnit: 'starting',
    avgDuration: '60–90 mins',
    responseWindow: 'Within 30 mins',
    commonIssues: ['Unit runs but no cool air', 'Ice forming on copper pipes', 'Hissing sound'],
    included: ['Leak pinpointing', 'Nitrogen flush', 'Standard gas charge', 'Cooling differential test'],
  },
  {
    id: 'bike-doorstep-repair',
    title: 'Doorstep Bike & Motorcycle Repair',
    category: 'mechanic',
    categoryLabel: 'Bike & Auto Mechanic',
    tagline: 'Mobile workshop at your home, office, or roadside breakdown.',
    description: 'Full servicing for bicycles, e-bikes, scooters, and motorcycles right at your parking spot. Carburetor/EFI tuning, brake bleeding, and chain overhaul.',
    priceFrom: 29,
    priceUnit: 'starting',
    avgDuration: '40–75 mins',
    responseWindow: 'Within 25 mins',
    commonIssues: ['Flat tire / puncture', 'Brake screeching or loose cable', 'Engine sputtering', 'Chain slip'],
    included: ['Mobile mechanic travel', 'Multi-point safety check', 'Brake adjustment', 'Drive train lube & tune'],
    popular: true,
  },
  {
    id: 'bike-engine-tune',
    title: 'Motorcycle & Scooter Engine Diagnostic',
    category: 'mechanic',
    categoryLabel: 'Bike & Auto Mechanic',
    tagline: 'Experienced two-wheeler mechanics for starting trouble and electrical snags.',
    description: 'Full spark plug, battery charging check, starter motor overhaul, oil filter replacement, and carburetion balance.',
    priceFrom: 35,
    priceUnit: 'starting',
    avgDuration: '60 mins',
    responseWindow: 'Same-day',
    commonIssues: ['Self-start not working', 'Poor mileage', 'Engine overheating', 'Battery discharge'],
    included: ['Battery health load test', 'Spark plug cleaning', 'Clutch cable tune', 'Oil level verification'],
  },
  {
    id: 'plumber-leak-clog',
    title: 'Emergency Pipe Leak & Drain Unclogging',
    category: 'plumber',
    categoryLabel: 'Plumbing & Pipes',
    tagline: 'Stop water damage fast with licensed neighborhood plumbers.',
    description: 'Rapid dispatch for burst pipes, leaking under-sink traps, running toilets, clogged sewer lines, and low water pressure.',
    priceFrom: 35,
    priceUnit: 'fixed',
    avgDuration: '30–50 mins',
    responseWindow: 'Immediate (15–30 mins)',
    commonIssues: ['Flooding bathroom', 'Sink backing up', 'Leaking bibcock / shutoff valve', 'Running cistern'],
    included: ['High-speed snake auger', 'Sealant replacement', 'Pressure balancing', 'Post-repair leak test'],
    popular: true,
  },
  {
    id: 'plumber-fixtures',
    title: 'Bathroom & Kitchen Fixture Installation',
    category: 'plumber',
    categoryLabel: 'Plumbing & Pipes',
    tagline: 'Precision alignment for faucets, showerheads, heaters, and water purifiers.',
    description: 'Mounting of premium mixers, vanity sinks, thermostatic shower columns, and RO purification units with zero wall damage.',
    priceFrom: 30,
    priceUnit: 'fixed',
    avgDuration: '45 mins',
    responseWindow: 'Same-day',
    commonIssues: ['New mixer installation', 'Old tap rusted stuck', 'Water heater piping'],
    included: ['Teflon seal wrapping', 'Wall bracket mount', 'Flow test', 'Cleanup of work area'],
  },
  {
    id: 'electrician-emergency',
    title: 'Short-Circuit & Circuit Breaker Repair',
    category: 'electrician',
    categoryLabel: 'Electrician & Wiring',
    tagline: '24/7 emergency dispatch for tripping MCBs, sparks, and blackout isolation.',
    description: 'Master electricians armed with insulation testers and digital multimeters to trace ground faults, blown fuses, and dangerous sparks.',
    priceFrom: 40,
    priceUnit: 'fixed',
    avgDuration: '30–60 mins',
    responseWindow: 'Under 20 mins',
    commonIssues: ['Main breaker trips repeatedly', 'Burning smell from switchboard', 'Half the house has no power'],
    included: ['Insulation continuity check', 'Phase load balance', 'Safety breaker swap', 'Hazard report'],
    popular: true,
  },
  {
    id: 'electrician-installation',
    title: 'Ceiling Fan, Light & Inverter Wiring',
    category: 'electrician',
    categoryLabel: 'Electrician & Wiring',
    tagline: 'Safe electrical hookups, heavy appliance lines, and backup power wiring.',
    description: 'Professional wiring for high-load appliances (AC lines, electric vehicle chargers, power inverters, smart ceiling fans, and LED tracks).',
    priceFrom: 25,
    priceUnit: 'fixed',
    avgDuration: '45 mins',
    responseWindow: 'Same-day',
    commonIssues: ['Fan wobbling or noisy', 'Adding new 16A power socket', 'Inverter battery setup'],
    included: ['Concealed wiring check', 'Heavy-duty lugs', 'Earth leakage test', 'Clean ceiling mount'],
  },
  {
    id: 'carpenter-doors-locks',
    title: 'Door Lock, Hinge & Furniture Repair',
    category: 'carpenter',
    categoryLabel: 'Carpentry & Handyman',
    tagline: 'Fix squeaking doors, jammed security deadbolts, and sagging cabinets.',
    description: 'Carpenters with handheld planers and router tools to reshape sticking wooden doors, install mortise locks, and reinforce wobbly beds/chairs.',
    priceFrom: 28,
    priceUnit: 'starting',
    avgDuration: '45–90 mins',
    responseWindow: 'Within 60 mins',
    commonIssues: ['Door won’t latch properly', 'Broken drawer slider', 'Loose chair leg', 'Cylinder lock replacement'],
    included: ['Hardware realignment', 'Heavy duty screw anchors', 'Planer shaving', 'Lubrication'],
  },
  {
    id: 'appliance-washing-machine',
    title: 'Washing Machine & Refrigerator Servicing',
    category: 'appliance',
    categoryLabel: 'Appliance Repair',
    tagline: 'Factory-trained technicians for front-load, top-load, and double-door fridges.',
    description: 'Troubleshooting spin cycle failures, drainage pump blocks, inverter motherboard faults, and frost-free refrigeration cycles.',
    priceFrom: 45,
    priceUnit: 'fixed',
    avgDuration: '60 mins',
    responseWindow: 'Same-day',
    commonIssues: ['Machine vibrates excessively', 'Water not draining', 'Fridge not freezing ice', 'Error code on display'],
    included: ['Motor continuity test', 'Pump unclog', 'Thermostat inspection', '90-day parts warranty'],
  },
];

export const WORKERS_PROFILES: WorkerProfile[] = [
  {
    id: 'w-1',
    name: 'David Rodriguez',
    trade: 'Master Electrician & Wiring Pro',
    category: 'electrician',
    town: 'Oakridge',
    neighborhood: 'Oakridge & Uptown',
    rating: 4.96,
    reviewCount: 312,
    jobsCompleted: 840,
    hourlyRate: 45,
    flatRateFrom: 35,
    experienceYears: 14,
    isAvailableToday: true,
    responseTimeMinutes: 18,
    badge: 'Master License #4489',
    skills: ['Circuit Tripping', 'Concealed Wiring', 'Panel Upgrades', 'Inverters'],
    bio: '14 years servicing residential and commercial electrical systems in Oakridge. Arrives with fully stocked service van.',
    verified: true,
  },
  {
    id: 'w-2',
    name: 'Aiden Cooper',
    trade: 'Mobile Bike & Motorcycle Mechanic',
    category: 'mechanic',
    town: 'Midtown',
    neighborhood: 'Midtown Central',
    rating: 4.98,
    reviewCount: 420,
    jobsCompleted: 1120,
    hourlyRate: 38,
    flatRateFrom: 29,
    experienceYears: 11,
    isAvailableToday: true,
    responseTimeMinutes: 15,
    badge: 'ASE Master Certified',
    skills: ['Roadside Assistance', 'Hydraulic Brakes', 'E-Bike Motors', 'Carb Tuning'],
    bio: 'Mobile workshop van equipped with tire changers, OBD diagnostic gear, and parts for all major commuter bikes and motorcycles.',
    verified: true,
  },
  {
    id: 'w-3',
    name: 'Mateo Sanchez',
    trade: 'Certified HVAC & AC Specialist',
    category: 'ac-repair',
    town: 'Oakridge',
    neighborhood: 'Oakridge & Uptown',
    rating: 4.92,
    reviewCount: 265,
    jobsCompleted: 670,
    hourlyRate: 50,
    flatRateFrom: 39,
    experienceYears: 9,
    isAvailableToday: true,
    responseTimeMinutes: 24,
    badge: 'EPA Universal Certified',
    skills: ['Gas Refill R32/R410', 'Coil Jet Wash', 'PCB Diagnostics', 'Compressors'],
    bio: 'Specialist in split AC cooling performance, energy efficiency optimization, and quick summer breakdown rescues.',
    verified: true,
  },
  {
    id: 'w-4',
    name: 'Elena Rostova',
    trade: 'Licensed Plumber & Pipe Engineer',
    category: 'plumber',
    town: 'River North',
    neighborhood: 'River North',
    rating: 4.95,
    reviewCount: 198,
    jobsCompleted: 530,
    hourlyRate: 42,
    flatRateFrom: 35,
    experienceYears: 12,
    isAvailableToday: true,
    responseTimeMinutes: 20,
    badge: 'State Plumbing Board #812',
    skills: ['Burst Pipe Repair', 'Motor Pumps', 'Drain Snaking', 'Water Heaters'],
    bio: 'Second-generation plumber known for prompt dispatch, honest fixed pricing, and clean, respectful home visits.',
    verified: true,
  },
  {
    id: 'w-5',
    name: 'Tariq Al-Mansoor',
    trade: 'Senior Appliance & Washing Machine Tech',
    category: 'appliance',
    town: 'Harbor West',
    neighborhood: 'Harbor West & Bay',
    rating: 4.89,
    reviewCount: 174,
    jobsCompleted: 440,
    hourlyRate: 40,
    flatRateFrom: 45,
    experienceYears: 8,
    isAvailableToday: false,
    responseTimeMinutes: 35,
    badge: 'OEM Certified Technician',
    skills: ['Inverter Motors', 'Fridge Compressors', 'Dishwashers', 'Drum Bearing Fix'],
    bio: 'Factory certified for Bosch, Whirlpool, LG, and Samsung major residential home appliances.',
    verified: true,
  },
  {
    id: 'w-6',
    name: 'Gregory Scott',
    trade: 'Master Carpenter & Door Specialist',
    category: 'carpenter',
    town: 'Maplewood',
    neighborhood: 'Maplewood Valley',
    rating: 4.93,
    reviewCount: 142,
    jobsCompleted: 390,
    hourlyRate: 42,
    flatRateFrom: 30,
    experienceYears: 16,
    isAvailableToday: true,
    responseTimeMinutes: 30,
    badge: 'Guild Craftsman',
    skills: ['Locksmithing', 'Door Re-alignment', 'Custom Shelves', 'Cabinet Hinges'],
    bio: 'Precision woodworker and repair handyman with 16 years handling local home repairs and fine woodwork.',
    verified: true,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    customerName: 'Sarah Jenkins',
    location: 'Oakridge Uptown Resident',
    serviceCategory: 'AC Repair',
    proName: 'Mateo Sanchez',
    rating: 5,
    date: '3 days ago',
    problem: 'Our living room split AC started blowing lukewarm air during the hottest afternoon of the month with a guest arriving.',
    outcome: 'Mateo arrived in 25 minutes, pinpointed a small flare-nut gas leak, recharged the system, and cleaned the filters. Temperature dropped to 68°F in 15 minutes!',
    cost: '$54 (exact upfront quote)',
    verifiedBooking: true,
  },
  {
    id: 't-2',
    customerName: 'Daniel Kim',
    location: 'Midtown Commuter',
    serviceCategory: 'Bike Breakdown Assist',
    proName: 'Aiden Cooper',
    rating: 5,
    date: '1 week ago',
    problem: 'Snapped my commuter bike chain and bent rear derailleur 4 miles from work at 8:15 AM.',
    outcome: 'Used Servixa live dispatch. Aiden pulled up on his mobile moto-service unit in 14 minutes, had the exact replacement link, and tuned my gears before 9:00 AM.',
    cost: '$32 all-inclusive',
    verifiedBooking: true,
  },
  {
    id: 't-3',
    customerName: 'Miriam & Arthur Vance',
    location: 'River North Homeowners',
    serviceCategory: 'Plumbing Leak',
    proName: 'Elena Rostova',
    rating: 5,
    date: '2 weeks ago',
    problem: 'Major pipe joint failure under the kitchen floorboards at 10 PM. Water was beginning to seep toward the living room.',
    outcome: 'Elena accepted the emergency request immediately, arrived with pipe crimping gear, stopped the flood, and replaced the faulty copper elbow cleanly.',
    cost: '$75 emergency rate',
    verifiedBooking: true,
  },
  {
    id: 't-4',
    customerName: 'Rachel Thorne',
    location: 'Harbor West Resident',
    serviceCategory: 'Electrician',
    proName: 'David Rodriguez',
    rating: 5,
    date: 'Last month',
    problem: 'Our breaker kept tripping every time the refrigerator and microwave ran at once. Worried about house wiring.',
    outcome: 'David inspected the consumer panel, identified an overloaded shared phase line, and installed a dedicated safety breaker with clear labeling.',
    cost: '$60 fixed rate',
    verifiedBooking: true,
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Trust & Safety',
    question: 'How are local workers and technicians verified on Servixa?',
    answer: 'Every tradesperson undergoes a 4-step vetting process: government photo ID verification, local trade license/certification audit, municipal background check, and a practical workmanship evaluation before being approved to accept service calls.',
  },
  {
    id: 'faq-2',
    category: 'Pricing',
    question: 'Are the prices fixed upfront or will there be surprise charges?',
    answer: 'Servixa enforces transparent, upfront pricing. Standard jobs have fixed catalog pricing. For custom or complex repairs, the technician provides a written quote before picking up a tool. If you choose not to proceed after on-site inspection, only the minimal inspection fee applies.',
  },
  {
    id: 'faq-3',
    category: 'Urgency & Speed',
    question: 'How fast can a bike mechanic or AC technician arrive at my location?',
    answer: 'Because Servixa connects you exclusively with technicians stationed in your immediate town or neighborhood, average arrival times range from 18 to 35 minutes for urgent bookings. You can also schedule for a specific date and hour.',
  },
  {
    id: 'faq-4',
    category: 'Warranty & Protection',
    question: 'What if the repair fails or the same problem comes back?',
    answer: 'All jobs booked through Servixa come with our 30-Day Workmanship Guarantee. If the serviced unit or part leaks, fails, or misbehaves within 30 days of service, the pro will return and rectify it at zero additional cost.',
  },
  {
    id: 'faq-5',
    category: 'For Pros',
    question: 'I am a skilled plumber, mechanic, or electrician. How do I join?',
    answer: 'Local skilled workers can click "Join as a Pro" in the navigation. Submit your credentials and photo ID. Our local town coordinator will schedule a quick verification interview within 24 hours, and you can begin taking neighborhood jobs immediately with zero commission on your first 10 bookings.',
  },
];
