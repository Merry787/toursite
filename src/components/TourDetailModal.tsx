import React, { useState } from 'react';
import { X, Clock, DollarSign, Users, ShieldCheck, MapPin, Check, AlertCircle, Calendar, ArrowRight, Bed, Car, Utensils } from 'lucide-react';
import { Tour } from '../data/kyrgyzstanData';
import { SafeImage } from './SafeImage';

interface TourDetailModalProps {
  tour: Tour | null;
  onClose: () => void;
  onBookTour: (tourId: string) => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({
  tour,
  onClose,
  onBookTour,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!tour) return null;

  const allImages = [tour.mainImage, ...(tour.gallery || [])];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        <div className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all relative animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-900/60 hover:bg-stone-900/90 text-white flex items-center justify-center backdrop-blur-sm transition-all"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Gallery Header */}
          <div className="relative bg-stone-950">
            <div className="h-72 sm:h-96 w-full overflow-hidden">
              <SafeImage
                src={allImages[activeImageIndex] || tour.mainImage}
                alt={tour.title}
                fallbackTitle={tour.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
            </div>

            {/* Thumbnail switcher */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 overflow-x-auto pb-1 z-10">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-[#FFD700] scale-105' : 'border-white/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <SafeImage src={img} alt="Превью" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Modal Header Bar */}
          <div className="p-6 sm:p-8 border-b border-stone-200/80 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B8457]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{tour.destinationName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-500">{tour.difficulty} уровень</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {tour.title}
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {tour.subtitle}
                </p>
              </div>

              {/* Price & Book Callout */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex flex-col items-end shrink-0">
                <span className="text-xs text-stone-500 font-medium">Стоимость за 1 человека</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0B8457] tabular-nums">
                  ${tour.priceUSD}
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onBookTour(tour.id);
                  }}
                  className="mt-2.5 px-5 py-2 bg-[#0B8457] hover:bg-[#065F46] active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>Забронировать тур</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200/70 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0B8457]" />
                <div>
                  <div className="text-[10px] text-stone-500">Длительность</div>
                  <div className="font-bold text-stone-900">{tour.durationText}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0B8457]" />
                <div>
                  <div className="text-[10px] text-stone-500">Сложность</div>
                  <div className="font-bold text-stone-900">{tour.difficulty}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0B8457]" />
                <div>
                  <div className="text-[10px] text-stone-500">Размер группы</div>
                  <div className="font-bold text-stone-900">{tour.groupSize}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#0B8457]" />
                <div>
                  <div className="text-[10px] text-stone-500">Предоплата</div>
                  <div className="font-bold text-stone-900">20% при бронировании</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content Details */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[50vh] overflow-y-auto">
            {/* Overview */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-2">
                Описание тура
              </h3>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {tour.description}
              </p>
            </div>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3">
                  Главные впечатления маршрута
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {tour.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800">
                      <div className="w-5 h-5 rounded-full bg-[#0B8457]/15 flex items-center justify-center text-[#0B8457] shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Day-by-day Itinerary */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0B8457]" />
                Программа по дням
              </h3>
              <div className="space-y-4">
                {tour.program.map((dayItem) => (
                  <div
                    key={dayItem.day}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded bg-[#0B8457] text-white font-bold text-xs">
                        День {dayItem.day}
                      </span>
                      <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                        {dayItem.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-3">
                      {dayItem.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-2 border-t border-stone-200/60">
                      <div className="flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-amber-600" />
                        <span>Питание: <strong className="text-stone-700">{dayItem.meals}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-[#0B8457]" />
                        <span>Ночлег: <strong className="text-stone-700">{dayItem.accommodation}</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Route, Accommodation & Transport */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-stone-100/70 border border-stone-200 text-xs">
              <div>
                <div className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0B8457]" />
                  Маршрут
                </div>
                <p className="text-stone-600">{tour.route}</p>
              </div>

              <div>
                <div className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-[#0B8457]" />
                  Условия проживания
                </div>
                <p className="text-stone-600">{tour.accommodation}</p>
              </div>

              <div>
                <div className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-[#0B8457]" />
                  Транспорт
                </div>
                <p className="text-stone-600">{tour.transport}</p>
              </div>
            </div>

            {/* Included & Excluded */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Включено в стоимость:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                  {tour.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-stone-500" />
                  Оплачивается дополнительно:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                  {tour.excluded.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5 shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors"
            >
              Закрыть
            </button>

            <button
              onClick={() => {
                onClose();
                onBookTour(tour.id);
              }}
              className="px-6 py-2.5 bg-[#0B8457] hover:bg-[#065F46] text-white font-semibold text-xs sm:text-sm rounded-lg shadow-md transition-all flex items-center gap-2"
            >
              <span>Забронировать тур (${tour.priceUSD})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
