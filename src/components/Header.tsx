import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, PhoneCall, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (tourId?: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Главная', href: '#hero', id: 'hero' },
    { label: 'Направления', href: '#destinations', id: 'destinations' },
    { label: 'Туры', href: '#tours', id: 'tours' },
    { label: 'Местные гиды', href: '#guides', id: 'guides' },
    { label: 'Юрты', href: '#yurts', id: 'yurts' },
    { label: 'О компании', href: '#about', id: 'about' },
    { label: 'Контакты', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/80 py-3 text-stone-900'
            : 'bg-gradient-to-b from-stone-950/80 via-stone-950/40 to-transparent py-4 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#hero"
              className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 text-xl md:text-2xl font-bold tracking-tight"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0B8457] flex items-center justify-center text-[#FFD700] shadow-sm transition-transform group-hover:scale-105">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className={`leading-none font-extrabold ${isScrolled ? 'text-stone-900' : 'text-white'}`}>
                  Getaways
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#0B8457] dark:text-[#FFD700]">
                  Кыргызстан
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[14px] font-medium">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                      isScrolled
                        ? isActive
                          ? 'text-[#0B8457] font-semibold'
                          : 'text-stone-600 hover:text-[#0B8457]'
                        : isActive
                        ? 'text-white font-semibold'
                        : 'text-stone-200 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0B8457] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action & Mobile Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:+996555123456"
                className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md transition-colors ${
                  isScrolled
                    ? 'text-stone-600 hover:text-[#0B8457] bg-stone-100/80'
                    : 'text-stone-200 hover:text-white bg-white/10'
                }`}
                title="Горячая линия"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#0B8457]" />
                <span className="tabular-nums">+996 (555) 12-34-56</span>
              </a>

              <button
                onClick={() => onOpenBooking()}
                className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0B8457] hover:bg-[#065F46] active:scale-95 transition-all shadow-md shadow-[#0B8457]/20 rounded-lg whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <span>Забронировать тур</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? 'text-stone-700 hover:bg-stone-100'
                    : 'text-white hover:bg-white/15'
                }`}
                aria-label="Открыть меню"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-[#0B8457] flex items-center justify-center text-[#FFD700]">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-stone-900 text-lg">Getaways</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center justify-between py-2 text-base font-medium text-stone-700 hover:text-[#0B8457] text-left transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-stone-100 space-y-3">
              <div className="text-xs text-stone-500">
                <p className="font-semibold text-stone-800">Служба заботы Getaways</p>
                <p className="mt-1">Ежедневно: 08:00 – 21:00 (GMT+6)</p>
                <p className="font-mono text-stone-900 font-medium mt-1">+996 (555) 12-34-56</p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 px-4 bg-[#0B8457] hover:bg-[#065F46] text-white font-semibold rounded-lg text-sm transition-colors text-center"
              >
                Забронировать тур
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
