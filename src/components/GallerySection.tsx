import React, { useState } from 'react';
import { X, MapPin, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/kyrgyzstanData';
import { SafeImage } from './SafeImage';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Все');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = ['Все', 'Горы', 'Озёра', 'Культура', 'Юрты', 'Природа'];

  const filteredPhotos = activeCategory === 'Все'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B8457] mb-2">
              <span>Визуальный архив экспедиций</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Галерея путешествий
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
              Моменты истинной свободы: золотые рассветы над Сон-Кулем, марсианские лабиринты
              Сказки и величественные ледниковые каньоны.
            </p>
          </div>

          {/* Category Tabs (Segmented Controls) */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredPhotos.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-stone-100 border border-stone-200/70 shadow-xs hover:shadow-lg transition-all duration-300 ${
                idx % 3 === 0 ? 'md:col-span-2 md:row-span-2 h-72 md:h-96' : 'h-44 md:h-46'
              }`}
            >
              <SafeImage
                src={item.image}
                alt={item.title}
                fallbackTitle={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <div className="text-[11px] font-semibold text-[#FFD700] flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
                <h4 className="font-bold text-sm leading-tight mt-0.5">{item.title}</h4>
              </div>
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-stone-900/60 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="max-h-[75vh] flex items-center justify-center bg-black">
              <SafeImage
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="p-4 sm:p-6 bg-stone-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-[#FFD700] font-semibold flex items-center gap-1 mb-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {activePhoto.location} · {activePhoto.category}
                </span>
                <h3 className="text-lg font-bold">{activePhoto.title}</h3>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
