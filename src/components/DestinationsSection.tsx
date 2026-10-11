import React, { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { DESTINATIONS, Destination } from '../data/kyrgyzstanData';
import { SafeImage } from './SafeImage';
import { DestinationModal } from './DestinationModal';

interface DestinationsSectionProps {
  onSelectTour: (tourId: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({ onSelectTour }) => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  return (
    <section id="destinations" className="py-20 bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B8457] mb-2">
            <span>Локации и чудеса природы</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Популярные направления
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            От бирюзовых глубин Иссык-Куля до древних караван-сараев Шёлкового пути — выберите
            место, с которого начнется ваше путешествие по Кыргызстану.
          </p>
        </div>

        {/* 8 Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-[#0B8457]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Banner */}
              <div className="relative h-52 overflow-hidden bg-stone-100">
                <SafeImage
                  src={dest.image}
                  alt={dest.name}
                  fallbackTitle={dest.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[11px] font-semibold text-[#FFD700] flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{dest.location}</span>
                  </div>
                  <h3 className="text-lg font-bold leading-snug">{dest.name}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                  {dest.shortDescription}
                </p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-medium">
                    Высота: <strong className="text-stone-800 tabular-nums">{dest.altitude}</strong>
                  </span>
                  <button
                    onClick={() => setSelectedDestination(dest)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B8457] hover:text-[#065F46] group/btn transition-colors cursor-pointer"
                  >
                    <span>Подробнее</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onSelectTour={onSelectTour}
      />
    </section>
  );
};
