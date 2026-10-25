/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EmergencyBanner } from './components/EmergencyBanner';
import { ServicesSection } from './components/ServicesSection';
import { WorkersShowcase } from './components/WorkersShowcase';
import { HowItWorks } from './components/HowItWorks';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { WorkerModal } from './components/WorkerModal';
import { ProJoinModal } from './components/ProJoinModal';
import { ServiceItem, WORKERS_PROFILES } from './data/mockData';
import { WorkerProfile } from './utils/serviceLogic';

export default function App() {
  const [selectedTown, setSelectedTown] = useState<string>('all');
  
  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<ServiceItem | null>(null);
  const [preselectedCategory, setPreselectedCategory] = useState<string | null>(null);
  const [selectedWorkerForModal, setSelectedWorkerForModal] = useState<WorkerProfile | null>(null);
  const [isProJoinOpen, setIsProJoinOpen] = useState(false);

  // Trigger booking modal with specific service
  const handleSelectServiceForBooking = (service: ServiceItem) => {
    setPreselectedService(service);
    setPreselectedCategory(service.category);
    setIsBookingOpen(true);
  };

  // Trigger booking modal with category
  const handleOpenBookingForCategory = (category: string) => {
    setPreselectedService(null);
    setPreselectedCategory(category);
    setIsBookingOpen(true);
  };

  // Trigger booking for a specific worker
  const handleBookWorkerDirectly = (worker: WorkerProfile) => {
    setPreselectedService(null);
    setPreselectedCategory(worker.category);
    setIsBookingOpen(true);
  };

  // Open worker credentials modal
  const handleOpenWorkerModal = (worker: WorkerProfile) => {
    setSelectedWorkerForModal(worker);
  };

  // Search from hero
  const handleHeroSearch = (category: string, town: string) => {
    setSelectedTown(town);
    if (category !== 'all') {
      setPreselectedCategory(category);
    }
  };

  // Emergency banner action
  const handleTriggerEmergency = () => {
    setPreselectedCategory('plumber');
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 flex flex-col">
      {/* Top Header */}
      <Header
        selectedTown={selectedTown}
        onSelectTown={setSelectedTown}
        onOpenBooking={() => {
          setPreselectedService(null);
          setPreselectedCategory(null);
          setIsBookingOpen(true);
        }}
        onOpenProJoin={() => setIsProJoinOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          selectedTown={selectedTown}
          onSelectTown={setSelectedTown}
          onSearch={handleHeroSearch}
          onOpenBookingForService={handleOpenBookingForCategory}
          onOpenWorker={(workerId) => {
            const found = WORKERS_PROFILES.find((w) => w.id === workerId);
            if (found) setSelectedWorkerForModal(found);
          }}
        />

        {/* 24/7 Emergency Dispatch Banner */}
        <EmergencyBanner onTriggerEmergency={handleTriggerEmergency} />

        {/* Services & Repairs Catalog */}
        <ServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
          onOpenQuickBooking={() => {
            setPreselectedService(null);
            setPreselectedCategory(null);
            setIsBookingOpen(true);
          }}
        />

        {/* Verified Neighborhood Pros & Craftsmen */}
        <WorkersShowcase
          selectedTown={selectedTown}
          onOpenWorkerModal={handleOpenWorkerModal}
          onBookWorkerDirectly={handleBookWorkerDirectly}
        />

        {/* How It Works (Customer vs Pro) */}
        <HowItWorks
          onOpenBooking={() => {
            setPreselectedService(null);
            setPreselectedCategory(null);
            setIsBookingOpen(true);
          }}
          onOpenProJoin={() => setIsProJoinOpen(true)}
        />

        {/* Real Customer Testimonials & Verified Receipts */}
        <TestimonialsSection />

        {/* Contact & Urgent Booking Form */}
        <ContactSection
          initialCategory={preselectedCategory || 'ac-repair'}
          selectedTown={selectedTown}
        />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => {
          setPreselectedService(null);
          setPreselectedCategory(null);
          setIsBookingOpen(true);
        }}
        onOpenProJoin={() => setIsProJoinOpen(true)}
        onSelectTown={(townId) => {
          setSelectedTown(townId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={preselectedService}
        preselectedCategory={preselectedCategory}
        selectedTown={selectedTown}
      />

      <WorkerModal
        worker={selectedWorkerForModal}
        onClose={() => setSelectedWorkerForModal(null)}
        onBookWorker={handleBookWorkerDirectly}
      />

      <ProJoinModal
        isOpen={isProJoinOpen}
        onClose={() => setIsProJoinOpen(false)}
      />
    </div>
  );
}
