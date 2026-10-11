import React, { useState } from 'react';
import { X, Send, CheckCircle2, Info, Star } from 'lucide-react';
import { Guide } from '../data/kyrgyzstanData';
import { SafeImage } from './SafeImage';

interface GuideContactModalProps {
  guide: Guide | null;
  onClose: () => void;
}

export const GuideContactModal: React.FC<GuideContactModalProps> = ({ guide, onClose }) => {
  const [userName, setUserName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [dates, setDates] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!guide) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !contactInfo.trim()) return;
    setIsSent(true);
  };

  const handleClose = () => {
    setIsSent(false);
    setUserName('');
    setContactInfo('');
    setMessage('');
    setDates('');
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

          {isSent ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#0B8457] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                Сообщение для {guide.name} отправлено!
              </h3>
              <p className="text-xs text-stone-600">
                Гид ознакомится с вашим запросом и свяжется по указанным контактам ({contactInfo}).
              </p>
              <div className="p-3 bg-amber-50 rounded-xl text-amber-800 text-[11px] text-left flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>Демонстрационный режим: сообщение сохранено локально в сессии.</span>
              </div>
              <button
                onClick={handleClose}
                className="mt-2 px-5 py-2 bg-[#0B8457] hover:bg-[#065F46] text-white text-xs font-semibold rounded-lg"
              >
                Закрыть
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-4 pb-4 border-b border-stone-200">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#0B8457]/40 shrink-0">
                  <SafeImage src={guide.photo} alt={guide.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#0B8457] uppercase tracking-wider">
                    Связаться с гидом
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">{guide.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                    <span className="flex items-center text-amber-500 font-semibold">
                      <Star className="w-3 h-3 fill-current inline mr-0.5" />
                      {guide.rating}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>${guide.pricePerDayUSD} / день</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Как к вам обращаться?"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Телефон / WhatsApp или Email *
                </label>
                <input
                  type="text"
                  required
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="+996... или your@email.com"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Желаемые даты поездки
                </label>
                <input
                  type="text"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  placeholder="Например: 15–20 июля"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Ваш вопрос или пожелания по маршруту
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Интересует восхождение, фототур или конная прогулка..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                />
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
                  className="px-5 py-2.5 bg-[#0B8457] hover:bg-[#065F46] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Отправить гиду</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
