import React, { useState } from 'react';
import { Search, MapPin, Calendar, Compass, ShieldCheck, Star } from 'lucide-react';
import { DESTINATIONS } from '../data/kyrgyzstanData';

interface HeroProps {
  onSelectTourClick: () => void;
  onPlanTripClick: () => void;
  onQuickSearch: (filters: { destination: string; duration: string; difficulty: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectTourClick,
  onPlanTripClick,
  onQuickSearch,
}) => {
  const [destination, setDestination] = useState('all');
  const [duration, setDuration] = useState('all');
  const [difficulty, setDifficulty] = useState('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickSearch({ destination, duration, difficulty });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with High-Contrast Editorial Scrim */}
      <div className="absolute inset-0 -z-10 bg-stone-900">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85"
          alt="Горы Тянь-Шань Кыргызстан"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-[subtleZoom_20s_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
        {/* Scrim Gradient for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-stone-950/40 to-stone-950/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          {/* Editorial Tagline */}
          <div className="inline-flex items-center gap-2 text-xs md:text-sm text-stone-200">
            <span className="font-semibold text-[#FFD700]">Getaways</span>
            <span aria-hidden="true">·</span>
            <span>Тянь-Шань</span>
            <span aria-hidden="true">·</span>
            <span>Шёлковый путь</span>
            <span aria-hidden="true">·</span>
            <span>Кочевое гостеприимство</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] text-balance">
            Открой для себя удивительный{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#0B8457] to-amber-300">
              Кыргызстан
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-stone-200 max-w-2xl font-normal leading-relaxed text-balance">
            Величественные горы, кристально чистые озёра и незабываемые приключения.
            Подлинные впечатления от ночевок в юртах на высоте 3000 метров до трекинга среди ледников.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onSelectTourClick}
              className="px-6 py-3.5 bg-[#0B8457] hover:bg-[#065F46] active:scale-95 text-white font-semibold text-sm sm:text-base rounded-lg shadow-lg shadow-[#0B8457]/30 transition-all flex items-center gap-2"
            >
              <span>Выбрать тур</span>
              <Compass className="w-4 h-4 text-[#FFD700]" />
            </button>
            <button
              onClick={onPlanTripClick}
              className="px-6 py-3.5 bg-white/15 hover:bg-white/25 active:scale-95 text-white border border-white/25 backdrop-blur-md font-semibold text-sm sm:text-base rounded-lg transition-all"
            >
              Спланировать путешествие
            </button>
          </div>
        </div>

        {/* Quick Tour Search Card */}
        <div className="mt-12 w-full max-w-5xl bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-6 border border-stone-100 text-stone-900">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0B8457]" />
                Куда хотите поехать?
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0B8457] focus:border-transparent cursor-pointer"
              >
                <option value="all">Все направления</option>
                {DESTINATIONS.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0B8457]" />
                Длительность
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0B8457] focus:border-transparent cursor-pointer"
              >
                <option value="all">Любая продолжительность</option>
                <option value="1">1 день (однодневные)</option>
                <option value="2-3">2 – 3 дня (выходные)</option>
                <option value="7">7 дней (экспедиции)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0B8457]" />
                Уровень сложности
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0B8457] focus:border-transparent cursor-pointer"
              >
                <option value="all">Любая сложность</option>
                <option value="Легкий">Легкий (для каждого)</option>
                <option value="Средний">Средний (умеренный хайкинг)</option>
                <option value="Высокий">Высокий (горные перевалы)</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#0B8457] hover:bg-[#065F46] active:scale-95 text-white font-semibold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 h-[42px]"
              >
                <Search className="w-4 h-4" />
                <span>Найти тур</span>
              </button>
            </div>
          </form>

          {/* Quiet Trust Bar */}
          <div className="mt-4 pt-3 border-t border-stone-200/60 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
              </span>
              <span className="font-semibold text-stone-700">4.97 / 5.0</span>
              <span className="hidden sm:inline">по отзывам более 1200 путешественников</span>
            </div>
            <div className="flex items-center gap-4 text-stone-600">
              <span>94% горная территория</span>
              <span aria-hidden="true">·</span>
              <span>100% сертифицированные гиды</span>
              <span aria-hidden="true">·</span>
              <span>Без скрытых сборов</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
