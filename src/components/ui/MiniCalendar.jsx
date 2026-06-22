import { useState } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePlanner } from '../../context/PlannerContext';

export default function MiniCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { assignments, exams } = usePlanner();

  const startDate = startOfWeek(currentDate, { weekStartsOn: 0 }); // Sunday start
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const nextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const prevWeek = () => setCurrentDate(addDays(currentDate, -7));

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-[var(--text-primary)]">Calendar (This Week)</h3>
        <span className="text-xs text-indigo-500 hover:underline cursor-pointer">View full calendar</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button onClick={prevWeek} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-[var(--text-secondary)]">
          <ChevronLeft size={16} />
        </button>
        <span className="font-semibold text-sm text-[var(--text-primary)]">
          {format(currentDate, 'MMMM yyyy')}
        </span>
        <button onClick={nextWeek} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-[var(--text-secondary)]">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-xs font-medium text-gray-500">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, i) => {
          const isToday = isSameDay(day, new Date());
          
          // Check for events
          const hasAssignment = assignments.some(a => isSameDay(new Date(a.dueDate), day));
          const hasExam = exams.some(e => isSameDay(new Date(e.date), day));

          return (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors ${
                isToday ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20' : 'text-[var(--text-primary)] hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
              }`}>
                {format(day, 'd')}
              </div>
              <div className="flex gap-1 mt-1 h-1">
                {hasAssignment && <div className="w-1 h-1 rounded-full bg-orange-400" />}
                {hasExam && <div className="w-1 h-1 rounded-full bg-blue-500" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
