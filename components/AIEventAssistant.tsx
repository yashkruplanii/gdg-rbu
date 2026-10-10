'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, X, Send, User, ChevronDown, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  recommendations?: Array<{ id: string; title: string; category: string; date: string }>;
}

export function AIEventAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "👋 Hey there! I'm **Sparky**, your GDG RBU Event Assistant. Ask me about upcoming workshops, tech stacks, registration, or schedule recommendations!",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || "I'm having a little trouble connecting right now, but feel free to browse our upcoming events tab!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendations: data.recommendations || [],
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "Looks like I'm offline for a moment. You can check all active events directly in the Events page!",
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'What workshops are available?',
    'Tell me about the Hackathon',
    'How do I get a QR pass?',
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl border-3 border-neutral-900 dark:border-white bg-[#4285F4] text-white font-black text-sm shadow-[4px_4px_0px_0px_#1e1e1e] dark:shadow-[4px_4px_0px_0px_#FBBC05] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#1e1e1e] transition-all group"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-yellow-300 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#34A853] rounded-full border-2 border-white"></span>
            </div>
            <span>Ask GDG AI</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-white/20 rounded-md uppercase tracking-wider font-extrabold">
              Beta
            </span>
          </button>
        ) : null}
      </div>

      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[560px] bg-white dark:bg-neutral-900 border-3 border-neutral-900 dark:border-neutral-200 rounded-3xl shadow-[8px_8px_0px_0px_#1e1e1e] dark:shadow-[8px_8px_0px_0px_#4285F4] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          <div className="flex items-center justify-between px-5 py-4 border-b-2 border-neutral-900 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl border-2 border-neutral-900 bg-[#FBBC05] text-neutral-900 shadow-[2px_2px_0px_0px_#1e1e1e]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm text-neutral-900 dark:text-white flex items-center gap-1.5">
                  Sparky <span className="text-xs text-[#4285F4] font-bold">AI Assistant</span>
                </h3>
                <p className="text-[11px] text-neutral-500 font-semibold">GDG RBU Knowledge Bot</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg border-2 border-neutral-900 dark:border-neutral-600 bg-white dark:bg-neutral-700 hover:bg-neutral-200 text-neutral-900 dark:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg border border-neutral-900 bg-[#4285F4] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#4285F4] text-white border-2 border-neutral-900 shadow-[2px_2px_0px_0px_#1e1e1e]'
                      : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-2 border-neutral-900 dark:border-neutral-700 shadow-[2px_2px_0px_0px_#1e1e1e]'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  
                  {m.recommendations && m.recommendations.length > 0 && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                      <span className="text-[10px] font-black uppercase text-neutral-500 tracking-wider">
                        Matched Events:
                      </span>
                      {m.recommendations.map((rec) => (
                        <Link
                          key={rec.id}
                          href={`/events/${rec.id}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-[#4285F4] transition-colors"
                        >
                          <div>
                            <span className="font-bold text-xs text-neutral-900 dark:text-white block">
                              {rec.title}
                            </span>
                            <span className="text-[10px] text-neutral-500">
                              {rec.category} • {rec.date}
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#4285F4]" />
                        </Link>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] opacity-70 block text-right mt-1.5 font-bold">
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-xs font-bold text-neutral-500 p-2">
                <Sparkles className="w-4 h-4 animate-spin text-[#FBBC05]" />
                Sparky is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-3 py-2 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(qp);
                }}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] font-bold rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                {qp}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSend}
            className="p-3 border-t-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Sparky about any GDG event..."
              className="flex-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:border-[#4285F4] font-medium"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl border-2 border-neutral-900 dark:border-white bg-[#4285F4] text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-[2px_2px_0px_0px_#1e1e1e]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
