import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { REVIEWS } from '../data/kyrgyzstanData';
import { SafeImage } from './SafeImage';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 bg-stone-50 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B8457] mb-2">
            <span>Впечатления наших гостей</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Отзывы путешественников
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            Реальные истории людей, открывших для себя горы, озера и культуру кочевников вместе с нами.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-500 tabular-nums">{review.date}</span>
                </div>

                <div className="text-xs font-semibold text-[#0B8457] mb-2">
                  Тур: «{review.tourTitle}»
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  «{review.text}»
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-200 shrink-0">
                    <SafeImage src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900">{review.author}</h4>
                    <span className="text-[11px] text-stone-500">{review.city}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  <CheckCircle className="w-3 h-3" />
                  <span>Проверенный тур</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
