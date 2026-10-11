import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Send, Info, Compass, Calendar, Users, DollarSign } from 'lucide-react';

interface PlanTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlanTripModal: React.FC<PlanTripModalProps> = ({ isOpen, onClose }) => {
  const [days, setDays] = useState('3-5');
  const [style, setStyle] = useState('mixed');
  const [travelers, setTravelers] = useState(2);
  const [budgetPerPerson, setBudgetPerPerson] = useState('300-600');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [wishes, setWishes] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setIsSent(true);
  };

  const handleClose = () => {
    setIsSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm" onClick={handleClose} />
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        <div className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all relative animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-all"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>

          {isSent ? (
            <div className="p-8 sm:p-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0B8457] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900">
                План путешествия принят в разработку!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                Спасибо, {name}! Мы подберем индивидуальный маршрут по Кыргызстану на {days} дн. с учетом ваших пожеланий.
              </p>
              <div className="p-3.5 bg-amber-50 rounded-xl text-amber-900 text-xs text-left flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Это демонстрационная форма. Реальные данные не отправляются на внешний сервер.
                </span>
              </div>
              <button
                onClick={handleClose}
                className="mt-2 px-6 py-2 bg-[#0B8457] hover:bg-[#065F46] text-white text-xs font-semibold rounded-lg"
              >
                Вернуться
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B8457] uppercase tracking-wider mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Индивидуальный маршрут</span>
                </div>
                <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                  Спланировать путешествие
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Расскажите, какой Кыргызстан вы хотите увидеть, и мы соберем тур под ваши даты и бюджет.
                </p>
              </div>

              {/* Preferences */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#0B8457]" />
                    Сколько дней планируете провести в Кыргызстане?
                  </label>
                  <select
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-semibold text-stone-800 focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                  >
                    <option value="1-2">1 – 2 дня (короткий уикэнд из Бишкека)</option>
                    <option value="3-5">3 – 5 дней (Иссык-Куль + Сон-Куль или Каракол)</option>
                    <option value="6-9">6 – 9 дней (классический кольцевой маршрут)</option>
                    <option value="10+">10+ дней (полная экспедиция: Тянь-Шань и Памир)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Желаемый формат и впечатления
                  </label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-semibold text-stone-800 focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                  >
                    <option value="mixed">Комбинированный (природа + юрты + комфорт)</option>
                    <option value="trekking">Активный горный трекинг и перевалы</option>
                    <option value="relax">Спокойный отдых на озерах и горячих источниках</option>
                    <option value="culture">Этно-погружение: традиции кочевников, юрты, ремесла</option>
                    <option value="horse">Конные переходы по высокогорным джайлоо</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#0B8457]" />
                      Участников
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={travelers}
                      onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-bold text-stone-800 focus:ring-2 focus:ring-[#0B8457] focus:outline-none tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-[#0B8457]" />
                      Бюджет на чел.
                    </label>
                    <select
                      value={budgetPerPerson}
                      onChange={(e) => setBudgetPerPerson(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-semibold text-stone-800 focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                    >
                      <option value="under-300">До $300 USD</option>
                      <option value="300-600">$300 – $600 USD</option>
                      <option value="600-1000">$600 – $1000 USD</option>
                      <option value="1000+">Премиум от $1000 USD</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Имя"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Телефон / WhatsApp / Telegram *
                    </label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+996..."
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Особые пожелания или примерные даты
                  </label>
                  <textarea
                    rows={2}
                    value={wishes}
                    onChange={(e) => setWishes(e.target.value)}
                    placeholder="Например: хотим поехать в июле с детьми, обязательна прогулка на лошадях..."
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                  />
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
                  className="px-5 py-2.5 bg-[#0B8457] hover:bg-[#065F46] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Получить индивидуальный план</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
