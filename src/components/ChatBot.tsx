import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, RotateCcw, ChevronDown, Compass, Calendar, ArrowRight, MapPin } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface ChatBotProps {
  onOpenBooking: (tourId?: string) => void;
  onNavigateToSection: (sectionId: string) => void;
}

const QUICK_PROMPTS = [
  'Где находится ваш офис?',
  'Какой тур выбрать новичку?',
  'Когда лучше ехать на Сон-Куль?',
  'Что взять с собой в горы?',
  'Сколько стоит тур на Иссык-Куль?',
  'Какая погода и тепло ли в юртах?',
  'Что попробовать из национальной кухни?',
];

export const ChatBot: React.FC<ChatBotProps> = ({ onOpenBooking, onNavigateToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Салам! 👋 Я **Айгуль**, ваш персональный AI-гид Getaways по Кыргызстану.\n\n📍 Наш офис: **г. Бишкек, ул. Токтогула, 125/1** (БЦ «Ала-Тоо», 4 этаж, Пн–Сб 09:00–19:00).\n\nПодскажу лучшие маршруты по Тянь-Шаню, расскажу про проживание в юртах на Сон-Куле, пляжи Иссык-Куля, погоду, снаряжение и стоимость туров. О чем вам рассказать?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const botReply = data.reply || 'Спасибо за вопрос! Чем еще я могу вам помочь по путешествиям в Кыргызстане?';

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);

      if (!isOpen) {
        setUnreadCount((c) => c + 1);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMessage: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'model',
        text: 'Горы Кыргызстана ждут вас! 🏔️ Вы можете выбрать один из готовых туров в нашем каталоге или написать нам в WhatsApp по номеру **+996 (555) 12-34-56**.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        text: 'Диалог очищен. Чем я могу помочь вам в планировании путешествия по Кыргызстану?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Helper to render bold markdown and lists
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      // Bullet items
      if (line.startsWith('• ') || line.startsWith('- ')) {
        const content = line.substring(2);
        return (
          <div key={idx} className="flex items-start gap-1.5 my-0.5 pl-1">
            <span className="text-[#0B8457] font-bold select-none">•</span>
            <span>{renderInlineFormatting(content)}</span>
          </div>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-1.5" />;
      }
      return (
        <p key={idx} className="my-0.5 leading-relaxed">
          {renderInlineFormatting(line)}
        </p>
      );
    });
  };

  const renderInlineFormatting = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-stone-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
        {!isOpen && (
          <div className="relative group">
            {/* Pulsing glow ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#0B8457] to-[#FFD700] opacity-70 blur-sm group-hover:opacity-100 transition duration-300 animate-pulse" />

            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-3 px-4 py-3 bg-[#0B8457] hover:bg-[#065F46] text-white rounded-full shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer"
              aria-label="Открыть AI чат-бот"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-[#FFD700]">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#0B8457] rounded-full" />
              </div>

              <div className="text-left hidden sm:block pr-1">
                <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                  <span>Чат с гидом Айгуль</span>
                  <Sparkles className="w-3 h-3 text-[#FFD700]" />
                </div>
                <div className="text-[10px] text-stone-200 font-medium">
                  AI-консультант Getaways
                </div>
              </div>

              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-[#FFD700] text-stone-900 rounded-full shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[600px] max-h-[88vh] bg-white rounded-2xl shadow-2xl border border-stone-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-[#065F46] via-[#0B8457] to-[#044030] text-white flex items-center justify-between shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[#FFD700]">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#065F46] rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm leading-tight text-white">Айгуль</h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-[#FFD700] text-stone-900">
                    AI-гид
                  </span>
                </div>
                <p className="text-[11px] text-stone-200">Эксперт по турам в Кыргызстане</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                title="Очистить историю диалога"
                className="p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Свернуть окно чата"
                className="p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Office Address Banner */}
          <div className="bg-emerald-50/80 border-b border-emerald-100/90 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-stone-700 shrink-0">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#0B8457] shrink-0" />
              <span className="truncate">
                <strong className="text-stone-900 font-semibold">Офис:</strong> г. Бишкек, ул. Токтогула, 125/1 (БЦ «Ала-Тоо», 4 эт.)
              </span>
            </div>
            <button
              onClick={() => handleSendMessage('Где находится ваш офис и как добраться?')}
              className="text-[10px] font-bold text-[#0B8457] hover:underline shrink-0 ml-2 cursor-pointer"
            >
              Подробнее
            </button>
          </div>

          {/* Quick Prompts Strip */}
          <div className="bg-stone-50 border-b border-stone-200/70 p-2 overflow-x-auto flex items-center gap-1.5 text-xs shrink-0 no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-[#0B8457] hover:border-[#0B8457] whitespace-nowrap text-[11px] font-medium transition-all shadow-2xs active:scale-95 cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-stone-50/50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-7 h-7 rounded-full bg-[#0B8457]/15 flex items-center justify-center text-[#0B8457] shrink-0 mt-0.5 border border-[#0B8457]/20">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-2xs ${
                    msg.role === 'user'
                      ? 'bg-[#0B8457] text-white rounded-tr-xs'
                      : 'bg-white text-stone-800 border border-stone-200/80 rounded-tl-xs'
                  }`}
                >
                  <div className="text-xs">
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    ) : (
                      renderFormattedText(msg.text)
                    )}
                  </div>
                  <span
                    className={`text-[9px] block text-right mt-1.5 ${
                      msg.role === 'user' ? 'text-emerald-100' : 'text-stone-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-stone-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-full bg-[#0B8457]/15 flex items-center justify-center text-[#0B8457] shrink-0 border border-[#0B8457]/20">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-stone-200/80 rounded-2xl px-3.5 py-2.5 rounded-tl-xs shadow-2xs flex items-center gap-1.5 text-stone-500 text-xs">
                  <span className="w-1.5 h-1.5 bg-[#0B8457] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#0B8457] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#0B8457] rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px] text-stone-400">Айгуль печатает...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Bar for Booking */}
          <div className="px-3 py-2 bg-emerald-50/70 border-t border-emerald-100 flex items-center justify-between text-[11px] shrink-0">
            <span className="text-stone-600 font-medium">Готовы выбрать тур?</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onNavigateToSection('tours');
                }}
                className="text-[#0B8457] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Каталог</span>
                <Compass className="w-3 h-3" />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="px-2.5 py-1 bg-[#0B8457] hover:bg-[#065F46] text-white rounded-md font-bold text-[10px] shadow-2xs flex items-center gap-1 cursor-pointer"
              >
                <span>Забронировать</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Спросите о турах, Сон-Куле, юртах..."
              className="flex-1 px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#0B8457] focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 bg-[#0B8457] hover:bg-[#065F46] disabled:opacity-40 text-white rounded-xl shadow-sm transition-colors active:scale-95 cursor-pointer shrink-0"
              aria-label="Отправить сообщение"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
