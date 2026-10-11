import React, { useState, useMemo } from 'react';
import { Clock, Users, ArrowRight, ShieldCheck, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { TOURS, Tour, DESTINATIONS } from '../data/kyrgyzstanData';
import { SafeImage } from './SafeImage';

interface ToursSectionProps {
  onOpenTourDetail: (tour: Tour) => void;
  onOpenBooking: (tourId: string) => void;
  initialFilters?: { destination: string; duration: string; difficulty: string } | null;
}

export const ToursSection: React.FC<ToursSectionProps> = ({
  onOpenTourDetail,
  onOpenBooking,
  initialFilters,
}) => {
  const [selectedDestination, setSelectedDestination] = useState<string>(
    initialFilters?.destination || 'all'
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(
    initialFilters?.difficulty || 'all'
  );
  const [selectedDuration, setSelectedDuration] = useState<string>(
    initialFilters?.duration || 'all'
  );
  const [maxPrice, setMaxPrice] = useState<number>(850);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Update when initialFilters changes
  React.useEffect(() => {
    if (initialFilters) {
      if (initialFilters.destination) setSelectedDestination(initialFilters.destination);
      if (initialFilters.difficulty) setSelectedDifficulty(initialFilters.difficulty);
      if (initialFilters.duration) setSelectedDuration(initialFilters.duration);
    }
  }, [initialFilters]);

  const resetFilters = () => {
    setSelectedDestination('all');
    setSelectedDifficulty('all');
    setSelectedDuration('all');
    setMaxPrice(850);
    setSortBy('recommended');
    setSearchQuery('');
  };

  const filteredTours = useMemo(() => {
    return TOURS.filter((tour) => {
      // Destination filter
      if (selectedDestination !== 'all') {
        if (tour.destinationId !== selectedDestination && !tour.title.toLowerCase().includes(selectedDestination)) {
          return false;
        }
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && tour.difficulty !== selectedDifficulty) {
        return false;
      }

      // Duration filter
      if (selectedDuration !== 'all') {
        if (selectedDuration === '1' && tour.durationDays !== 1) return false;
        if (selectedDuration === '2-3' && (tour.durationDays < 2 || tour.durationDays > 3)) return false;
        if (selectedDuration === '7' && tour.durationDays < 4) return false;
      }

      // Price filter
      if (tour.priceUSD > maxPrice) {
        return false;
      }

      // Search text filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = tour.title.toLowerCase().includes(query);
        const matchesDesc = tour.description.toLowerCase().includes(query);
        const matchesDest = tour.destinationName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesDest) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
      if (sortBy === 'duration-asc') return a.durationDays - b.durationDays;
      if (sortBy === 'duration-desc') return b.durationDays - a.durationDays;
      return 0; // default recommendation
    });
  }, [selectedDestination, selectedDifficulty, selectedDuration, maxPrice, sortBy, searchQuery]);

  return (
    <section id="tours" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B8457] mb-2">
              <span>Готовые маршруты и экспедиции</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Каталог туров по Кыргызстану
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
              От легких однодневных походов до недельных экспедиций по Великому Шёлковому пути.
              Каждый маршрут проверен горными гидами и включает проверенные стоянки.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-stone-500">Найдено маршрутов:</span>
            <span className="px-2.5 py-1 bg-emerald-50 text-[#0B8457] font-bold text-xs rounded-lg border border-emerald-100 tabular-nums">
              {filteredTours.length} из {TOURS.length}
            </span>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="mb-10 bg-stone-50 rounded-2xl p-5 border border-stone-200/80 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#0B8457]" />
              <span>Параметры и фильтрация</span>
            </div>
            {(selectedDestination !== 'all' || selectedDifficulty !== 'all' || selectedDuration !== 'all' || maxPrice < 850 || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Сбросить фильтры</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Поиск по названию
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Сон-Куль, Ала-Арча..."
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#0B8457]"
              />
            </div>

            {/* Destination Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Направление
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#0B8457] cursor-pointer"
              >
                <option value="all">Все локации</option>
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Сложность
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#0B8457] cursor-pointer"
              >
                <option value="all">Любой уровень</option>
                <option value="Легкий">Легкий</option>
                <option value="Средний">Средний</option>
                <option value="Высокий">Высокий</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Продолжительность
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#0B8457] cursor-pointer"
              >
                <option value="all">Все варианты</option>
                <option value="1">1 день</option>
                <option value="2-3">2 – 3 дня</option>
                <option value="7">7 дней</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Сортировка
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#0B8457] cursor-pointer"
              >
                <option value="recommended">Рекомендуемые</option>
                <option value="price-asc">Цена: по возрастанию</option>
                <option value="price-desc">Цена: по убыванию</option>
                <option value="duration-asc">Длительность: короткие</option>
                <option value="duration-desc">Длительность: длинные</option>
              </select>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mt-4 pt-3 border-t border-stone-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-stone-700">Максимальная цена:</span>
              <span className="font-bold text-[#0B8457] tabular-nums text-sm">${maxPrice}</span>
              <input
                type="range"
                min="65"
                max="850"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-44 accent-[#0B8457] cursor-pointer"
              />
            </div>
            <div className="text-stone-500">
              Цены указаны в USD на 1 человека и включают проживание, транспорт и гида.
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        {filteredTours.length === 0 ? (
          <div className="py-16 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-300">
            <p className="text-base font-bold text-stone-700 mb-1">По вашему запросу ничего не найдено</p>
            <p className="text-xs text-stone-500 mb-4">Попробуйте изменить параметры фильтрации или сбросить их</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-[#0B8457] hover:bg-[#065F46] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Сбросить все фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <div
                key={tour.id}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-[#0B8457]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Tour Image */}
                  <div className="relative h-60 overflow-hidden bg-stone-100">
                    <SafeImage
                      src={tour.mainImage}
                      alt={tour.title}
                      fallbackTitle={tour.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-md text-white font-medium text-[11px]">
                        {tour.destinationName}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#0B8457] text-white font-bold text-[11px] shadow-sm">
                        {tour.difficulty}
                      </span>
                    </div>

                    {/* Bottom overlay with duration and price */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                      <div className="flex items-center gap-1.5 text-xs text-stone-200 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#FFD700]" />
                        <span>{tour.durationText}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-stone-300 block leading-tight">от</span>
                        <span className="text-xl font-extrabold text-[#FFD700] tabular-nums">
                          ${tour.priceUSD}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tour Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#0B8457] transition-colors leading-snug line-clamp-2">
                      {tour.title}
                    </h3>

                    <p className="mt-2 text-xs text-stone-500 font-medium line-clamp-1">
                      {tour.subtitle}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                      {tour.description}
                    </p>

                    {/* Metadata Strip */}
                    <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#0B8457]" />
                        <span>Группа: {tour.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#0B8457] font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Все включено</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onOpenTourDetail(tour)}
                    className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200/80 active:scale-95 text-stone-800 text-xs font-bold rounded-lg transition-colors text-center cursor-pointer"
                  >
                    Подробнее
                  </button>

                  <button
                    onClick={() => onOpenBooking(tour.id)}
                    className="py-2.5 px-3 bg-[#0B8457] hover:bg-[#065F46] active:scale-95 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Забронировать</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
