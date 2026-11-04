import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Phone, Check, Copy } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface FloatingActionsProps {
  onQuoteClick: () => void;
}

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(
    'Hi JJJ Packers & Movers, I would like to get a free quotation for my move.'
  )}`;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with JJJ Packers and Movers on WhatsApp"
        className="group flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white pl-4 pr-3.5 py-3 rounded-full shadow-2xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
      >
        <span className="hidden md:inline text-xs font-bold tracking-wide">
          Chat on WhatsApp
        </span>
        <div className="w-6 h-6 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 fill-current" />
        </div>
      </a>
    </div>
  );
};

export const MobileQuickBar: React.FC<FloatingActionsProps> = ({ onQuoteClick }) => {
  const whatsappUrl = `https://wa.me/91${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(
    'Hi JJJ Packers & Movers, I would like to get a free quotation for my move.'
  )}`;

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [copiedRecently, setCopiedRecently] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef<boolean>(false);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const copyToClipboard = async () => {
    const phoneNumber = BUSINESS_INFO.phone;
    let success = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(phoneNumber);
        success = true;
      }
    } catch {
      // Fallback below
    }

    if (!success) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = phoneNumber;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        success = true;
      } catch (err) {
        console.error('Failed to copy to clipboard', err);
      }
    }

    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(60);
      } catch {
        // Ignore vibration errors
      }
    }

    setCopiedRecently(true);
    setToastMessage(`Phone number +91 ${phoneNumber} copied to clipboard!`);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
      setCopiedRecently(false);
    }, 3000);
  };

  const startHoldTimer = () => {
    isLongPressRef.current = false;
    setIsHolding(true);
    if (timerRef.current) clearTimeout(timerRef.current);

    // 700ms hold time is ideal for touch and mouse long-press
    timerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      setIsHolding(false);
      copyToClipboard();
    }, 700);
  };

  const cancelHoldTimer = () => {
    setIsHolding(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    startHoldTimer();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startPosRef.current) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - startPosRef.current.x);
    const dy = Math.abs(touch.clientY - startPosRef.current.y);
    // If finger moves more than 10px, treat as scroll and cancel hold
    if (dx > 10 || dy > 10) {
      cancelHoldTimer();
    }
  };

  const handleTouchEnd = () => {
    cancelHoldTimer();
    // Keep isLongPressRef flag intact until handleClick consumes it
    setTimeout(() => {
      isLongPressRef.current = false;
    }, 300);
  };

  const handleMouseDown = () => {
    startHoldTimer();
  };

  const handleMouseUp = () => {
    cancelHoldTimer();
    setTimeout(() => {
      isLongPressRef.current = false;
    }, 300);
  };

  const handleMouseLeave = () => {
    cancelHoldTimer();
  };

  const handleClick = (e: React.MouseEvent) => {
    // If long press triggered the copy action, prevent standard tel: link invocation
    if (isLongPressRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="sm:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm bg-[#102B4E] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#F47B20]/40 flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Check className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white leading-tight">
              Number Copied to Clipboard
            </p>
            <p className="text-[11px] text-slate-300 font-mono mt-0.5 font-medium tracking-wider">
              +91 {BUSINESS_INFO.phone}
            </p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1 text-xs"
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      )}

      {/* Quick Action Mobile Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={cancelHoldTimer}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          title="Tap to call, hold to copy number"
          className={`relative flex-1 py-2 px-1.5 rounded-xl border text-[#102B4E] font-bold text-xs flex flex-col items-center justify-center transition-all select-none overflow-hidden ${
            copiedRecently
              ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
              : isHolding
              ? 'bg-orange-50 border-[#F47B20] scale-95 shadow-inner'
              : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200'
          }`}
        >
          {/* Visual indicator during hold */}
          {isHolding && (
            <div
              className="absolute inset-0 bg-[#F47B20]/15 origin-left animate-pulse"
              style={{
                animationDuration: '700ms',
              }}
            />
          )}

          <div className="relative z-10 flex items-center gap-1.5">
            {copiedRecently ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : isHolding ? (
              <Copy className="w-3.5 h-3.5 text-[#F47B20]" />
            ) : (
              <Phone className="w-3.5 h-3.5 text-[#F47B20]" />
            )}
            <span>{copiedRecently ? 'Copied!' : isHolding ? 'Copying...' : 'Call Now'}</span>
          </div>
          <span className="relative z-10 text-[9px] text-slate-500 font-normal leading-none mt-0.5">
            {copiedRecently ? 'Ready to paste' : isHolding ? 'Release to copy' : 'Hold to copy'}
          </span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onQuoteClick}
          className="flex-1 py-2.5 px-2 rounded-xl bg-[#F47B20] hover:bg-[#d86613] text-white font-bold text-xs flex items-center justify-center transition-colors shadow-md shadow-[#F47B20]/25 uppercase tracking-wider"
        >
          Get Quote
        </button>
      </div>
    </>
  );
};
