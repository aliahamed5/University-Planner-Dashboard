import { useState, useEffect } from 'react';
import { Sparkles, X, Lightbulb, ChevronRight } from 'lucide-react';

const TIPS = [
  "Use the Pomodoro technique (25 min focus, 5 min break) to maximize retention without burnout.",
  "Start your day by tackling the most difficult assignment while your energy is high (Eat the Frog).",
  "Active recall is better than re-reading. Test yourself on the material frequently.",
  "Break down large projects into smaller, actionable 30-minute tasks.",
  "Stay hydrated and ensure you're getting 7-8 hours of sleep to consolidate memory.",
  "Use space repetition. Review material 1 day, 3 days, and 7 days after learning it."
];

export default function AIStudyTips() {
  const [isOpen, setIsOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Initial delay for the FAB to appear
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % TIPS.length);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-72 bg-[var(--bg-secondary)]/90 backdrop-blur-xl border border-indigo-500/30 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-4 relative">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={16} />
          </button>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <Lightbulb size={16} className="text-indigo-500" />
            </div>
            <h4 className="font-bold text-[var(--text-primary)] text-sm">AI Study Assistant</h4>
          </div>
          
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed min-h-[60px]">
            {TIPS[tipIndex]}
          </p>

          <button 
            onClick={nextTip}
            className="mt-4 w-full flex items-center justify-center gap-2 text-xs font-semibold text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 py-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg transition-colors"
          >
            Next Tip <ChevronRight size={14} />
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
          isOpen 
            ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900' 
            : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-indigo-500/50'
        }`}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </button>
    </div>
  );
}
