import React from 'react';
import { Compass, Users, Mountain, ShieldCheck, Heart, Leaf } from 'lucide-react';
import { COMPANY_ADVANTAGES } from '../data/kyrgyzstanData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-stone-50 border-t border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mission & Story */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B8457]">
              <span>О компании Getaways</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Мы открываем настоящий Кыргызстан с любовью к его людям и природе
            </h2>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Getaways родилась из искренней страсти к первозданным горам Тянь-Шаня и глубокого уважения
              к древним кочевым традициям. Наша миссия — создавать продуманные, комфортные и безопасные
              путешествия, сохраняя первозданную чистоту природы и поддерживая местные сельские сообщества.
            </p>

            <p className="text-stone-600 text-sm leading-relaxed">
              Мы не ведем туристов по банальным туристическим тропам с сувенирным пластиком. Каждый наш
              тур — это живое знакомство: чай в юрте у гостеприимных чабанов на Сон-Куле, неторопливый
              рассказ аксакала о Великом Шёлковом пути у стен Таш-Рабата и чистейший воздух высокогорья.
            </p>

            {/* Core Values Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200">
              <div className="p-3.5 bg-white rounded-xl border border-stone-200/80 shadow-2xs">
                <Leaf className="w-5 h-5 text-[#0B8457] mb-2" />
                <h4 className="font-bold text-stone-900 text-xs mb-1">Эко-туризм</h4>
                <p className="text-[11px] text-stone-500">Принцип «Не оставляй следов» на всех маршрутах</p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-stone-200/80 shadow-2xs">
                <Heart className="w-5 h-5 text-rose-500 mb-2" />
                <h4 className="font-bold text-stone-900 text-xs mb-1">Поддержка семей</h4>
                <p className="text-[11px] text-stone-500">Прямой доход чабанам, гидам и конюхам</p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-stone-200/80 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-amber-500 mb-2" />
                <h4 className="font-bold text-stone-900 text-xs mb-1">Безопасность</h4>
                <p className="text-[11px] text-stone-500">Спутниковая связь и аптечки на высоте</p>
              </div>
            </div>
          </div>

          {/* Numbers & Photo Collage */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0B8457] tabular-nums">
                  1 200+
                </div>
                <div className="text-xs text-stone-600 mt-1 font-medium">
                  Счастливых путешественников со всего мира
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0B8457] tabular-nums">
                  98%
                </div>
                <div className="text-xs text-stone-600 mt-1 font-medium">
                  Рекомендуют наши туры своим друзьям
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0B8457] tabular-nums">
                  45+
                </div>
                <div className="text-xs text-stone-600 mt-1 font-medium">
                  Проверенных юрточных лагерей и гидов
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0B8457] tabular-nums">
                  8+ лет
                </div>
                <div className="text-xs text-stone-600 mt-1 font-medium">
                  Опыта организации авторских экспедиций
                </div>
              </div>
            </div>

            {/* Advantages List */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                Почему путешествуют с Getaways:
              </h3>
              <div className="space-y-3">
                {COMPANY_ADVANTAGES.map((adv, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#0B8457] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900">{adv.title}</h4>
                      <p className="text-xs text-stone-600 mt-0.5">{adv.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
