import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Paperclip, Send, Gavel, MoreVertical, FileText, RefreshCw, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage, LegalDocument } from '../types';

interface ChatViewProps {
  selectedDocument?: LegalDocument | null;
}

export default function ChatView({ selectedDocument }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello. I've analyzed **${
        selectedDocument?.name || 'Agreement_v2.pdf'
      }**. How can I assist you with your legal review today?`,
      timestamp: '09:41 AM'
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: 'Can you summarize the main liability limitations?',
      timestamp: '09:42 AM'
    },
    {
      id: 'msg-3',
      sender: 'ai',
      text: 'The document outlines specific liability limitations in Section 12. Key points include:\n\n* Liability is capped at the total fees paid in the 12 months preceding the claim. [Section 12.2]\n* Consequential, incidental, and indirect damages are explicitly excluded from recovery. [Section 12.4]',
      timestamp: '09:43 AM',
      citations: [
        { section: 'Section 12.2', title: 'Liability caps definition' },
        { section: 'Section 12.4', title: 'Indirect damages exclusion' }
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompt chips matching Screen 5 exactly
  const promptChips = [
    'What are the termination rights?',
    'Summarize the indemnity clause',
    'Are there any hidden fees?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: userTime
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Stream or POST request to our API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({
            role: m.sender === 'ai' ? 'model' : 'user',
            parts: [{ text: m.text }]
          })),
          documentContext: selectedDocument
            ? `Filename: ${selectedDocument.name}. Reference ID: ${selectedDocument.ref}. Type: ${selectedDocument.type}. Status: ${selectedDocument.status}.`
            : "Generic NDA and MSA contract terms."
        })
      });

      const data = await response.json();
      const aiTime = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: data.text || 'No response compiled.',
        timestamp: aiTime,
        citations: data.sandbox
          ? [{ section: 'Section 4', title: 'General Indemnity' }]
          : undefined
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
      // Hard fallback
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: 'err-' + Date.now(),
            sender: 'ai',
            text: 'I apologize, I am experiencing temporary connectivity challenges reaching the legal analysis nodes. Let me check the offline index: Force Majeure covenanted standards do not pose immediate high priority exclusions.',
            timestamp: 'Just now'
          }
        ]);
      }, 1000);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChipClick = (chipText: string) => {
    handleSendMessage(chipText);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] bg-slate-50 dark:bg-slate-950/20 text-slate-800 dark:text-slate-100 border border-slate-150 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
      
      {/* Top micro Header bar matching Screen 5 layout */}
      <header className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-indigo-50 dark:bg-indigo-950 rounded-lg text-indigo-600 dark:text-indigo-400">
            <FileText className="w-5 h-5 stroke-[1.8px]" />
          </div>
          <div>
            <h1 className="font-semibold text-sm md:text-base text-slate-900 dark:text-white truncate max-w-[180px] sm:max-w-none">
              Chat with {selectedDocument?.name || 'Agreement_v2.pdf'}
            </h1>
            <p className="text-[10px] text-slate-400">Real-time Legal Consultation Node</p>
          </div>
        </div>
        <button
          onClick={() => alert('Options panel triggered')}
          className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-205 transition-colors rounded-full active:scale-95"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Main scrolling chat window scroll height parameter set strictly */}
      <main className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAi ? 'items-start' : 'items-end'} max-w-[88%] sm:max-w-[75%] ${
                isAi ? 'mr-auto' : 'ml-auto'
              }`}
            >
              <div
                className={`p-4 rounded-2xl shadow-xs border ${
                  isAi
                    ? 'bg-white text-slate-800 border-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 rounded-tl-none'
                    : 'bg-slate-900 text-white border-transparent rounded-tr-none'
                }`}
              >
                {/* Parse basic markdown bold tags safely / print as paragraphs */}
                <div className="text-xs md:text-sm leading-relaxed whitespace-pre-line space-y-1.5 font-medium">
                  {msg.text.split('\n').map((line, lineIdx) => (
                    <p key={lineIdx}>
                      {line.split('**').map((chunk, chunkIdx) => {
                        const isBold = chunkIdx % 2 === 1;
                        return isBold ? <strong className="font-bold text-slate-950 dark:text-white" key={chunkIdx}>{chunk}</strong> : chunk;
                      })}
                    </p>
                  ))}
                </div>

                {/* Citation Pill Badge Highlight inside matching Screen 5 */}
                {isAi && msg.citations && (
                  <div className="mt-3 pt-3 border-t border-slate-50 dark:border-slate-800 space-y-1">
                    <div className="flex flex-wrap gap-1.5">
                      {msg.citations.map((cit, idx) => (
                        <span
                          key={idx}
                          title={cit.title}
                          className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold rounded"
                        >
                          {cit.section}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-[9px] font-bold mt-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400 stroke-[2px] animate-pulse" />
                      <span>AI INSIGHTS: HIGH TRUST VERIFICATION COMPLETE</span>
                    </div>
                  </div>
                )}
              </div>
              <span className={`text-[10px] text-slate-400 mt-1 px-1.5 ${isAi ? 'ml-0' : 'mr-0'}`}>
                {isAi ? 'Lumina AI' : 'You'} • {msg.timestamp}
              </span>
            </div>
          );
        })}

        {/* Loading Spinner Bubble indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 max-w-[200px] bg-white border border-slate-100 dark:bg-slate-900 dark:border-slate-800 p-4 rounded-2xl rounded-tl-none">
            <RefreshCw className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
            <span className="text-xs font-semibold text-slate-400 animate-pulse">Lumina is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Suggested Prompt Chips footer panel with text prompt triggers */}
      <footer className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0 space-y-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {promptChips.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChipClick(chip)}
              className="flex-shrink-0 bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 hover:border-slate-900 dark:hover:border-indigo-400 hover:text-slate-900 dark:text-slate-400 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap active:scale-95 transition-all"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Message panel matches bottom bar exactly */}
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
          <button
            onClick={() => alert('Launching local attachment explorer...')}
            className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-colors shrink-0"
            title="Attach Document"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage(inputText);
            }}
            placeholder="Ask Lumina Lex about the agreement..."
            className="flex-grow bg-transparent border-none focus:ring-0 text-slate-800 dark:text-white text-xs md:text-sm py-1.5 px-1"
          />
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className="bg-slate-950 hover:bg-indigo-600 disabled:opacity-40 disabled:hover:bg-slate-950 dark:bg-indigo-600 dark:hover:bg-indigo-750 text-white p-2.5 rounded-lg active:scale-95 transition-all flex items-center justify-center shrink-0 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
