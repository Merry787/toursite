import React, { useState } from 'react';
import { Flame, Coffee, Moon, Check, ArrowRight, MapPin, Mountain } from 'lucide-react';
import { YURT_CAMPS, YurtCamp } from '../data/kyrgyzstanData';
import { SafeImage } from './SafeImage';
import { YurtBookingModal } from './YurtBookingModal';

export const YurtsSection: React.FC = () => {
  const [selectedCamp, setSelectedCamp] = useState<YurtCamp | null>(null);

  return (
    <section id="yurts" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B8457] mb-2">
            <span>Традиционный кочевой быт</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Проживание в юртах
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            Погрузитесь в гармонию кочевой цивилизации. Белоснежные войлочные юрты, согретые теплом
            чугунной дровяной печи, запах чая с горными травами и открывающийся звездный тундук.
          </p>
        </div>

        {/* Yurt Camps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {YURT_CAMPS.map((camp) => (
            <div
              key={camp.id}
              className="group bg-stone-50 rounded-2xl overflow-hidden border border-stone-200/80 hover:border-[#0B8457]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-100">
                  <SafeImage
                    src={camp.images[0]}
                    alt={camp.name}
                    fallbackTitle={camp.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-md text-white font-medium text-[11px] flex items-center gap-1">
                      <Mountain className="w-3 h-3 text-[#FFD700]" />
                      <span>{camp.altitude}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#0B8457] text-white font-bold text-[11px]">
                      {camp.season}
                    </span>
                  </div>

                  {/* Title on Image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="text-[11px] font-semibold text-[#FFD700] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{camp.location}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight mt-0.5">{camp.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {camp.description}
                  </p>

                  {/* Cultural Experience Highlight */}
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2.5">
                    <Moon className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold mb-0.5">Культурный опыт:</strong>
                      <span className="text-stone-700">{camp.culturalExperience}</span>
                    </div>
                  </div>

                  {/* Amenities List */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
                      Удобства и сервис в лагере:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                      {camp.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#0B8457] shrink-0" />
                          <span className="line-clamp-1">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Booking Button */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 block">Стоимость проживания:</span>
                    <span className="text-xl font-extrabold text-[#0B8457] tabular-nums">
                      ${camp.pricePerNightUSD}
                      <span className="text-xs font-normal text-stone-500"> / ночь за юрту</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedCamp(camp)}
                    className="px-4 py-2.5 bg-[#0B8457] hover:bg-[#065F46] active:scale-95 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Забронировать юрту</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <YurtBookingModal camp={selectedCamp} onClose={() => setSelectedCamp(null)} />
    </section>
  );
};
