import React from 'react';
import { X, MapPin, Calendar, Mountain, CheckCircle2, Compass, ArrowRight } from 'lucide-react';
import { Destination, TOURS } from '../data/kyrgyzstanData';
import { SafeImage } from './SafeImage';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onSelectTour: (tourId: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onSelectTour,
}) => {
  if (!destination) return null;

  const linkedTours = TOURS.filter((t) => destination.linkedTourIds.includes(t.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        <div className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all relative animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-900/60 hover:bg-stone-900/90 text-white flex items-center justify-center backdrop-blur-sm transition-all"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Banner in modal */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <SafeImage
              src={destination.image}
              alt={destination.name}
              fallbackTitle={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFD700] mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{destination.location}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {destination.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-xl">
                {destination.title}
              </p>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0B8457]/10 flex items-center justify-center text-[#0B8457]">
                  <Mountain className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-stone-500 font-medium">Высота над уровнем моря</div>
                  <div className="text-xs sm:text-sm font-bold text-stone-900 tabular-nums">{destination.altitude}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0B8457]/10 flex items-center justify-center text-[#0B8457]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-stone-500 font-medium">Лучший сезон</div>
                  <div className="text-xs sm:text-sm font-bold text-stone-900">{destination.bestSeason}</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0B8457]/10 flex items-center justify-center text-[#0B8457]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-stone-500 font-medium">Регион</div>
                  <div className="text-xs sm:text-sm font-bold text-stone-900">{destination.location}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">
                Об этой локации
              </h3>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {destination.fullDescription}
              </p>
            </div>

            {/* Highlights & Activities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B8457]" />
                  Главные особенности
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                  {destination.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B8457] mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#0B8457]" />
                  Чем заняться
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                  {destination.activities.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Linked Tours */}
            {linkedTours.length > 0 && (
              <div className="pt-4 border-t border-stone-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3">
                  Туры, включающие {destination.name}
                </h3>
                <div className="space-y-2.5">
                  {linkedTours.map((tour) => (
                    <div
                      key={tour.id}
                      className="p-3 sm:p-4 rounded-xl border border-stone-200 hover:border-[#0B8457] hover:bg-emerald-50/30 transition-all flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-stone-900 text-sm truncate">
                          {tour.title}
                        </div>
                        <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                          <span>{tour.durationText}</span>
                          <span aria-hidden="true">·</span>
                          <span>{tour.difficulty}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-[#0B8457]">${tour.priceUSD}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectTour(tour.id);
                        }}
                        className="px-3.5 py-1.5 bg-[#0B8457] hover:bg-[#065F46] text-white text-xs font-semibold rounded-lg shrink-0 flex items-center gap-1 transition-colors"
                      >
                        <span>Посмотреть тур</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
