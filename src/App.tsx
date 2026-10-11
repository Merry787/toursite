import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DestinationsSection } from './components/DestinationsSection';
import { ToursSection } from './components/ToursSection';
import { TourDetailModal } from './components/TourDetailModal';
import { BookingModal } from './components/BookingModal';
import { GuidesSection } from './components/GuidesSection';
import { YurtsSection } from './components/YurtsSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { PlanTripModal } from './components/PlanTripModal';
import { ChatBot } from './components/ChatBot';
import { Footer } from './components/Footer';
import { TOURS, Tour } from './data/kyrgyzstanData';

export default function App() {
  // Modal states
  const [selectedTourForDetail, setSelectedTourForDetail] = useState<Tour | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTourId, setBookingTourId] = useState<string | undefined>(undefined);
  const [isPlanTripOpen, setIsPlanTripOpen] = useState(false);

  // Filter state passed from Hero quick search into Tours section
  const [tourFilters, setTourFilters] = useState<{
    destination: string;
    duration: string;
    difficulty: string;
  } | null>(null);

  // Active section for header highlighting
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'destinations', 'tours', 'guides', 'yurts', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = (tourId?: string) => {
    setBookingTourId(tourId || (TOURS.length > 0 ? TOURS[0].id : undefined));
    setIsBookingOpen(true);
  };

  const handleSelectTourFromDestination = (tourId: string) => {
    const found = TOURS.find((t) => t.id === tourId);
    if (found) {
      setSelectedTourForDetail(found);
    }
  };

  const handleQuickSearch = (filters: { destination: string; duration: string; difficulty: string }) => {
    setTourFilters(filters);
    const toursEl = document.getElementById('tours');
    if (toursEl) {
      toursEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTourClick = () => {
    const toursEl = document.getElementById('tours');
    if (toursEl) {
      toursEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-[#0B8457] selection:text-white">
      {/* Top Navigation */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        activeSection={activeSection}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1. Hero with Big Mountain Photo & Search Bar */}
        <Hero
          onSelectTourClick={handleSelectTourClick}
          onPlanTripClick={() => setIsPlanTripOpen(true)}
          onQuickSearch={handleQuickSearch}
        />

        {/* 2. Popular Destinations (8 Kyrgyz Highlights) */}
        <DestinationsSection
          onSelectTour={handleSelectTourFromDestination}
        />

        {/* 3. Catalog of Tours with Filters & Booking */}
        <ToursSection
          onOpenTourDetail={(tour) => setSelectedTourForDetail(tour)}
          onOpenBooking={(id) => handleOpenBooking(id)}
          initialFilters={tourFilters}
        />

        {/* 4. Local Guides */}
        <GuidesSection />

        {/* 5. Yurts & Ethno-Stays */}
        <YurtsSection />

        {/* 6. About Company & Mission */}
        <AboutSection />

        {/* 7. Travel Gallery */}
        <GallerySection />

        {/* 8. Tourist Reviews */}
        <ReviewsSection />

        {/* 9. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Modals */}
      <TourDetailModal
        tour={selectedTourForDetail}
        onClose={() => setSelectedTourForDetail(null)}
        onBookTour={(tourId) => {
          setSelectedTourForDetail(null);
          handleOpenBooking(tourId);
        }}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedTourId={bookingTourId}
      />

      <PlanTripModal
        isOpen={isPlanTripOpen}
        onClose={() => setIsPlanTripOpen(false)}
      />

      {/* AI Tour Consultant Chatbot */}
      <ChatBot
        onOpenBooking={(tourId) => handleOpenBooking(tourId)}
        onNavigateToSection={(sectionId) => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
