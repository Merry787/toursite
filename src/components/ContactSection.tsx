import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, CheckCircle2, Clock, Globe, Shield } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Пожалуйста, заполните обязательные поля: имя, email и сообщение');
      return;
    }
    setError('');
    setIsSent(true);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details & Info */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B8457]">
              <span>Свяжитесь с нашей командой</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Готовы отправиться в путешествие мечты?
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Наши тревел-эксперты живут и работают в Кыргызстане. Мы с радостью ответим на любые вопросы
              о погоде на горных перевалах, необходимой одежде, визовых правилах и подберем удобные даты.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="w-10 h-10 rounded-lg bg-[#0B8457]/10 flex items-center justify-center text-[#0B8457] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Телефон и мессенджеры</h4>
                  <a
                    href="tel:+996555123456"
                    className="text-sm font-bold text-stone-800 hover:text-[#0B8457] block mt-0.5 transition-colors"
                  >
                    +996 (555) 12-34-56
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    WhatsApp и Telegram подключены 24/7
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="w-10 h-10 rounded-lg bg-[#0B8457]/10 flex items-center justify-center text-[#0B8457] shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Электронная почта</h4>
                  <a
                    href="mailto:travel@getaways.kg"
                    className="text-sm font-bold text-stone-800 hover:text-[#0B8457] block mt-0.5 transition-colors"
                  >
                    travel@getaways.kg
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Отвечаем в течение 30 минут в рабочее время
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="w-10 h-10 rounded-lg bg-[#0B8457]/10 flex items-center justify-center text-[#0B8457] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Главный офис в Бишкеке</h4>
                  <p className="text-sm font-bold text-stone-800 mt-0.5">
                    Кыргызстан, г. Бишкек, ул. Токтогула, 125/1
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    БЦ «Ала-Тоо», 4 этаж · Пн–Сб с 09:00 до 19:00
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Messengers Shortcuts */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/996555123456"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Написать в WhatsApp</span>
              </a>

              <a
                href="https://t.me/getaways_kg"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Чат в Telegram</span>
              </a>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
            {isSent ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0B8457] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900">
                  Сообщение успешно отправлено!
                </h3>
                <p className="text-sm text-stone-600 max-w-sm mx-auto">
                  Спасибо, {name}! Наш тревел-консультант свяжется с вами по адресу {email} в ближайшее время.
                </p>
                <div className="p-3 bg-amber-50 rounded-xl text-amber-900 text-xs text-left max-w-sm mx-auto">
                  Демонстрационный режим: сообщение зафиксировано локально в браузере.
                </div>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setMessage('');
                  }}
                  className="mt-4 px-5 py-2 bg-[#0B8457] text-white text-xs font-bold rounded-lg hover:bg-[#065F46]"
                >
                  Отправить еще одно сообщение
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-900">
                    Напишите нам сообщение
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Задайте любой вопрос или запросите индивидуальный расчет
                  </p>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Александр Иванов"
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Электронная почта *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Телефон (необязательно)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+996..."
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Текст сообщения или вопрос *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Здравствуйте! Планируем поездку на озеро Иссык-Куль и Сон-Куль на 5 человек..."
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 focus:ring-2 focus:ring-[#0B8457] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0B8457] hover:bg-[#065F46] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Отправить сообщение</span>
                </button>

                <p className="text-[11px] text-stone-500 text-center">
                  Нажимая кнопку, вы соглашаетесь на обработку контактных данных для связи по туру.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
