import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isPast } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePlanner } from '../context/PlannerContext';

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { assignments, exams } = usePlanner();

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Full Calendar</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Get a bird's-eye view of your month.</p>
        </div>
        <div className="flex items-center gap-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-1 shadow-sm">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-[var(--text-secondary)]">
            <ChevronLeft size={20} />
          </button>
          <span className="font-bold text-lg text-[var(--text-primary)] w-36 text-center">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-[var(--text-secondary)]">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="grid grid-cols-7 border-b border-[var(--border-color)] bg-gray-50/50 dark:bg-gray-800/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(dayName => (
            <div key={dayName} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {dayName}
            </div>
          ))}
        </div>
        
        <div className="flex-1 grid grid-cols-7 auto-rows-fr">
          {days.map((date, i) => {
            const isToday = isSameDay(date, new Date());
            const isCurrentMonth = isSameMonth(date, monthStart);
            
            const dayAssignments = assignments.filter(a => isSameDay(new Date(a.dueDate), date));
            const dayExams = exams.filter(e => isSameDay(new Date(e.date), date));

            return (
              <div 
                key={i} 
                className={`min-h-[100px] border-b border-r border-[var(--border-color)] p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${!isCurrentMonth ? 'bg-gray-50/30 dark:bg-gray-900/30' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium ${
                    isToday ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 
                    isCurrentMonth ? 'text-[var(--text-primary)]' : 'text-gray-400'
                  }`}>
                    {format(date, 'd')}
                  </span>
                </div>
                
                <div className="space-y-1 overflow-y-auto max-h-[80px] custom-scrollbar pr-1">
                  {dayExams.map(exam => (
                    <div key={exam.id} className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-[10px] font-semibold truncate border border-blue-200 dark:border-blue-500/30">
                      📝 {exam.subject}
                    </div>
                  ))}
                  {dayAssignments.map(assignment => {
                    const isDone = assignment.status === 'Completed';
                    return (
                      <div key={assignment.id} className={`px-2 py-1 rounded text-[10px] font-medium truncate border ${
                        isDone ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30 line-through opacity-70' : 
                        'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/30'
                      }`}>
                        • {assignment.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
