import React from 'react';
import { Compass, Phone, Mail, MapPin, ArrowUp, Instagram, Send } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0B8457] flex items-center justify-center text-[#FFD700]">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Getaways <span className="text-[#FFD700] text-sm font-semibold">Кыргызстан</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Официальный туроператор авторских путешествий, горных трекингов и этно-туров
              по Кыргызстану. Откройте жемчужину Центральной Азии вместе с локальными экспертами.
            </p>

            <div className="text-xs text-stone-500 space-y-1">
              <div>Лицензия на туроператорскую деятельность: № KG-TOUR-2021-084</div>
              <div>Член Ассоциации туроператоров Кыргызской Республики (КАТО)</div>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Разделы сайта
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Главная</a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">Направления</a>
              </li>
              <li>
                <a href="#tours" className="hover:text-white transition-colors">Каталог туров</a>
              </li>
              <li>
                <a href="#guides" className="hover:text-white transition-colors">Местные гиды</a>
              </li>
              <li>
                <a href="#yurts" className="hover:text-white transition-colors">Юрточные лагеря</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">О компании</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Контакты</a>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Топ локаций
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><a href="#destinations" className="hover:text-white transition-colors">Озеро Иссык-Куль</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Ущелье Ала-Арча</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Высокогорный Сон-Куль</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Каньон Сказка</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Скалы Джети-Огуз</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Караван-сарай Таш-Рабат</a></li>
            </ul>
          </div>

          {/* Contacts & CTA */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Связь и бронирование
            </h4>

            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0B8457]" />
                <span className="font-mono text-stone-300">+996 (555) 12-34-56</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0B8457]" />
                <span>travel@getaways.kg</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0B8457]" />
                <span>Бишкек, ул. Токтогула, 125/1</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-3 bg-[#0B8457] hover:bg-[#065F46] text-white font-bold text-xs rounded-lg transition-colors text-center cursor-pointer shadow-sm"
            >
              Забронировать тур
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Getaways Kyrgyzstan. Все права защищены.
          </div>

          <div className="flex items-center gap-6">
            <span>Политика конфиденциальности</span>
            <span aria-hidden="true">·</span>
            <span>Условия бронирования</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors flex items-center gap-1.5"
              aria-label="Наверх"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Наверх</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
