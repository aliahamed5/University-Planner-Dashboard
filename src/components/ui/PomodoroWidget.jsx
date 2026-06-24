import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

export default function PomodoroWidget() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Switch modes when timer hits 0
      setIsActive(false);
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
      audio.play().catch(() => {});
      
      if (isBreak) {
        setIsBreak(false);
        setTimeLeft(25 * 60);
      } else {
        setIsBreak(true);
        setTimeLeft(5 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
  };
  
  const switchMode = (mode) => {
    setIsActive(false);
    setIsBreak(mode === 'break');
    setTimeLeft(mode === 'break' ? 5 * 60 : 25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors text-sm font-semibold border ${
          isActive 
            ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/30 animate-pulse' 
            : 'bg-gray-100 text-[var(--text-primary)] border-[var(--border-color)] dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        <Timer size={16} />
        <span className="w-10 text-center">{timeString}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-64 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 p-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[var(--text-primary)]">Focus Timer</h3>
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <button 
                onClick={() => switchMode('focus')}
                className={`text-[10px] font-bold px-2 py-1 rounded-md transition-colors ${!isBreak ? 'bg-white dark:bg-gray-600 shadow-sm text-[var(--text-primary)]' : 'text-gray-500'}`}
              >
                Focus
              </button>
              <button 
                onClick={() => switchMode('break')}
                className={`text-[10px] font-bold px-2 py-1 rounded-md transition-colors ${isBreak ? 'bg-white dark:bg-gray-600 shadow-sm text-[var(--text-primary)]' : 'text-gray-500'}`}
              >
                Break
              </button>
            </div>
          </div>

          <div className="text-center mb-6 mt-2">
            <div className="text-4xl font-black text-[var(--text-primary)] tabular-nums tracking-tighter">
              {timeString}
            </div>
            <p className="text-xs text-[var(--text-secondary)] font-medium mt-1 uppercase tracking-widest">
              {isBreak ? 'Time to relax' : 'Deep work session'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button 
              onClick={toggleTimer}
              className={`flex-1 py-2.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-95 ${
                isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20'
              }`}
            >
              {isActive ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button 
              onClick={resetTimer}
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-[var(--text-secondary)] transition-colors active:scale-95"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
