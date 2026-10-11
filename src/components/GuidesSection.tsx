import React, { useState } from 'react';
import { Star, MessageSquare, Award, Globe, MapPin, Briefcase } from 'lucide-react';
import { GUIDES, Guide } from '../data/kyrgyzstanData';
import { SafeImage } from './SafeImage';
import { GuideContactModal } from './GuideContactModal';

export const GuidesSection: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  return (
    <section id="guides" className="py-20 bg-stone-50 border-t border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B8457] mb-2">
            <span>Эксперты горных троп</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Местные гиды и проводники
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            Люди, родившиеся среди гор Кыргызстана. Лицензированные инструкторы, историки и наездники,
            которые откроют для вас сокровенные уголки страны с максимальной заботой о безопасности.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUIDES.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-[#0B8457]/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Guide Photo & Badge */}
                <div className="relative h-64 overflow-hidden bg-stone-100">
                  <SafeImage
                    src={guide.photo}
                    alt={guide.name}
                    fallbackTitle={guide.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{guide.rating}</span>
                    <span className="text-[10px] text-stone-300 font-normal">({guide.reviewsCount})</span>
                  </div>

                  {/* Bottom details on image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[11px] text-[#FFD700] font-semibold flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{guide.location}</span>
                    </div>
                    <h3 className="text-lg font-bold leading-tight">{guide.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Experience & Tours */}
                  <div className="flex items-center justify-between text-xs text-stone-600 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Award className="w-3.5 h-3.5 text-[#0B8457]" />
                      <span>Опыт: <strong className="text-stone-900">{guide.experienceYears} лет</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Briefcase className="w-3.5 h-3.5 text-[#0B8457]" />
                      <span>Проведено туров: <strong className="text-stone-900 tabular-nums">{guide.toursCount}</strong></span>
                    </div>
                  </div>

                  {/* Specialization */}
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block mb-1">
                      Специализация:
                    </span>
                    <p className="text-xs text-stone-800 font-medium leading-relaxed">
                      {guide.specialization}
                    </p>
                  </div>

                  {/* Languages */}
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block mb-1 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-[#0B8457]" />
                      Языки общения:
                    </span>
                    <div className="text-xs text-stone-600 font-medium">
                      {guide.languages.join(' · ')}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed italic">
                    «{guide.bio}»
                  </p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 block">Стоимость:</span>
                    <span className="text-base font-extrabold text-[#0B8457] tabular-nums">
                      ${guide.pricePerDayUSD}
                      <span className="text-xs font-normal text-stone-500"> / день</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedGuide(guide)}
                    className="px-3.5 py-2 bg-stone-900 hover:bg-[#0B8457] active:scale-95 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Связаться</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Local Guides Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0B8457] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                100% честная оплата напрямую гидам
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Мы берем 0% комиссии с гонораров местных проводников — все средства идут на развитие местных семей.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#0B8457] whitespace-nowrap">
            Программа поддержки Getaways Community
          </span>
        </div>
      </div>

      <GuideContactModal guide={selectedGuide} onClose={() => setSelectedGuide(null)} />
    </section>
  );
};
