import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, DollarSign, Mail, Phone, User, CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import { TOURS, Tour } from '../data/kyrgyzstanData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTourId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedTourId,
}) => {
  const [selectedTourId, setSelectedTourId] = useState<string>(preselectedTourId || TOURS[0].id);
  const [travelDate, setTravelDate] = useState<string>('');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Form states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedTourId) {
      setSelectedTourId(preselectedTourId);
    }
  }, [preselectedTourId]);

  // Set default min date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setTravelDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  if (!isOpen) return null;

  const currentTour: Tour | undefined = TOURS.find((t) => t.id === selectedTourId) || TOURS[0];
  const unitPrice = currentTour ? currentTour.priceUSD : 0;
  const totalPrice = unitPrice * travelersCount;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Пожалуйста, введите ваше имя и фамилию';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Пожалуйста, укажите корректный email (например, name@example.com)';
    }

    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Пожалуйста, укажите контактный телефон';
    }

    if (!travelDate) {
      newErrors.travelDate = 'Выберите предполагаемую дату начала поездки';
    }

    if (travelersCount < 1 || travelersCount > 30) {
      newErrors.travelersCount = 'Количество туристов должно быть от 1 до 30';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate brief processing for realistic UX
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm transition-opacity"
        onClick={handleResetAndClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        <div className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all relative animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-all"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>

          {isSubmitted ? (
            /* Success State */
            <div className="p-8 sm:p-10 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0B8457] mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                  Заявка на бронирование оформлена!
                </h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  Спасибо, <strong className="text-stone-800">{fullName}</strong>! Мы подготовили расчет для путешествия
                  «{currentTour?.title}».
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-left text-xs sm:text-sm space-y-2 max-w-lg mx-auto">
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Маршрут:</span>
                  <span className="font-semibold text-stone-900">{currentTour?.title}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Дата начала:</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{travelDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Количество участников:</span>
                  <span className="font-semibold text-stone-900">{travelersCount} чел.</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-200/60">
                  <span className="text-stone-500">Цена за участника:</span>
                  <span className="font-semibold text-stone-900 tabular-nums">${unitPrice}</span>
                </div>
                <div className="flex justify-between pt-2 text-base font-extrabold text-[#0B8457]">
                  <span>Предварительный итог:</span>
                  <span className="tabular-nums">${totalPrice} USD</span>
                </div>
              </div>

              {/* Mandatory Demo Notice */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-0.5">Демонстрационный режим платформы</strong>
                  <span>
                    Данная заявка является демонстрационной и не сохраняется на боевом сервере. Никакие платежные средства не списываются.
                    В коммерческой версии Getaways координатор связался бы с вами по номеру{' '}
                    <span className="font-mono">{phone}</span> или электронной почте <span className="font-mono">{email}</span> в течение 15 минут.
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 bg-[#0B8457] hover:bg-[#065F46] text-white font-semibold text-sm rounded-lg shadow-md transition-colors"
                >
                  Вернуться на сайт
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B8457] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Бронирование тура в Кыргызстан</span>
                </div>
                <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                  Оформить заявку на путешествие
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Заполните данные поездки, чтобы мгновенно рассчитать общую стоимость и забронировать даты.
                </p>
              </div>

              {/* Tour Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Выбранный тур *
                </label>
                <select
                  value={selectedTourId}
                  onChange={(e) => setSelectedTourId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#0B8457] cursor-pointer"
                >
                  {TOURS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} — ${t.priceUSD} / чел. ({t.durationText})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Travelers Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#0B8457]" />
                    Дата начала поездки *
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-lg text-sm text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#0B8457] ${
                      errors.travelDate ? 'border-rose-400 bg-rose-50/40' : 'border-stone-300'
                    }`}
                  />
                  {errors.travelDate && (
                    <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.travelDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#0B8457]" />
                    Количество туристов *
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTravelersCount((prev) => Math.max(1, prev - 1))}
                      className="w-10 h-10 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-lg flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className={`flex-1 text-center py-2 bg-stone-50 border rounded-lg text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0B8457] tabular-nums ${
                        errors.travelersCount ? 'border-rose-400' : 'border-stone-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setTravelersCount((prev) => Math.min(30, prev + 1))}
                      className="w-10 h-10 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-lg flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                  {errors.travelersCount && (
                    <p className="text-rose-600 text-[11px] mt-1">{errors.travelersCount}</p>
                  )}
                </div>
              </div>

              {/* Live Cost Calculation Bar */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-600 font-medium block">Предварительный расчет стоимости:</span>
                  <div className="text-xs text-stone-500 mt-0.5">
                    ${unitPrice} × {travelersCount} {travelersCount === 1 ? 'человек' : travelersCount < 5 ? 'человека' : 'человек'}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 block">Общая стоимость:</span>
                  <span className="text-2xl font-extrabold text-[#0B8457] tabular-nums">
                    ${totalPrice} USD
                  </span>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4 pt-2 border-t border-stone-200">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#0B8457]" />
                    Имя и фамилия *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Например: Алина Каримова"
                    className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-lg text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#0B8457] ${
                      errors.fullName ? 'border-rose-400 bg-rose-50/40' : 'border-stone-300'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-rose-600 text-[11px] mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#0B8457]" />
                      Электронная почта *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alina@example.com"
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-lg text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#0B8457] ${
                        errors.email ? 'border-rose-400 bg-rose-50/40' : 'border-stone-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-rose-600 text-[11px] mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#0B8457]" />
                      Номер телефона / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+996 555 12-34-56"
                      className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-lg text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#0B8457] ${
                        errors.phone ? 'border-rose-400 bg-rose-50/40' : 'border-stone-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-rose-600 text-[11px] mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Дополнительные пожелания (вегетарианское меню, трансфер из аэропорта Манас, аренда экипировки)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Напишите любые особые требования или вопросы..."
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#0B8457]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Отмена
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#0B8457] hover:bg-[#065F46] disabled:opacity-50 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Отправка заявки...</span>
                  ) : (
                    <span>Отправить заявку на бронирование</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
