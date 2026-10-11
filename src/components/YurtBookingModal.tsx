import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Users, Info, Sparkles } from 'lucide-react';
import { YurtCamp } from '../data/kyrgyzstanData';
import { SafeImage } from './SafeImage';

interface YurtBookingModalProps {
  camp: YurtCamp | null;
  onClose: () => void;
}

export const YurtBookingModal: React.FC<YurtBookingModalProps> = ({ camp, onClose }) => {
  const [checkIn, setCheckIn] = useState('');
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!camp) return null;

  const totalCost = camp.pricePerNightUSD * nights;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !checkIn) return;
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm" onClick={handleClose} />
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all relative animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-all"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>

          {isSubmitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#0B8457] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                Заявка на юрту в «{camp.name}» принята!
              </h3>
              <p className="text-xs text-stone-600">
                Спасибо, {name}! Заезд: {checkIn}, на {nights} ноч. Итоговая стоимость: ${totalCost} USD.
              </p>
              <div className="p-3 bg-amber-50 rounded-xl text-amber-900 text-[11px] text-left flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>
                  Это демонстрационная форма. Настоящая бронь в юрточном лагере не создана, данные не сохранены на сервере.
                </span>
              </div>
              <button
                onClick={handleClose}
                className="mt-2 px-5 py-2 bg-[#0B8457] hover:bg-[#065F46] text-white text-xs font-semibold rounded-lg"
              >
                Вернуться
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3.5 pb-4 border-b border-stone-200">
                <div className="w-16 h-14 rounded-xl overflow-hidden shrink-0">
                  <SafeImage src={camp.images[0]} alt={camp.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#0B8457] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Бронирование юрты</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 leading-snug">{camp.name}</h3>
                  <div className="text-xs text-stone-500 font-semibold mt-0.5">
                    ${camp.pricePerNightUSD} / ночь (с национальным завтраком)
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#0B8457]" />
                    Дата заезда *
                  </label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Количество ночей
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={nights}
                    onChange={(e) => setNights(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0B8457] focus:outline-none tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#0B8457]" />
                  Количество гостей
                </label>
                <input
                  type="number"
                  min="1"
                  max={camp.maxGuests}
                  value={guests}
                  onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0B8457] focus:outline-none tabular-nums"
                />
              </div>

              {/* Price preview */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
                <span className="text-stone-700 font-medium">Расчет: ${camp.pricePerNightUSD} × {nights} ноч.</span>
                <span className="font-extrabold text-[#0B8457] text-base tabular-nums">${totalCost} USD</span>
              </div>

              <div className="space-y-3 pt-2 border-t border-stone-200">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Аскар Асанов"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Телефон / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+996..."
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@mail.com"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0B8457] hover:bg-[#065F46] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                >
                  Забронировать юрту (${totalCost})
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
