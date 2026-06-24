import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, X, Check, Clock } from 'lucide-react';
import { formatDate, getRelativeTimeText } from '../../utils/dateHelpers';
import { usePlanner } from '../../context/PlannerContext';
import { useNavigate } from 'react-router-dom';
import { isPast, differenceInDays } from 'date-fns';

export default function Navbar() {
  const today = new Date();
  const navigate = useNavigate();
  const { assignments, exams, courses } = usePlanner();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) setIsSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotifOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate mock notifications based on actual data
  const notifications = [];
  
  const dueSoon = assignments.filter(a => a.status !== 'Completed' && differenceInDays(new Date(a.dueDate), new Date()) <= 3 && differenceInDays(new Date(a.dueDate), new Date()) >= 0);
  dueSoon.forEach(a => notifications.push({ id: a.id, type: 'assignment', title: 'Upcoming Deadline', message: `${a.title} is due ${getRelativeTimeText(a.dueDate)}`, time: 'Just now' }));
  
  const examsSoon = exams.filter(e => !isPast(new Date(e.date)) && differenceInDays(new Date(e.date), new Date()) <= 7);
  examsSoon.forEach(e => notifications.push({ id: e.id, type: 'exam', title: 'Exam Reminder', message: `${e.subject} is in ${getRelativeTimeText(e.date)}`, time: '1h ago' }));

  if (notifications.length === 0) {
    notifications.push({ id: 'welcome', type: 'system', title: 'Welcome!', message: 'You have no upcoming deadlines right now.', time: 'Today' });
  }

  // Global search logic
  const searchResults = [];
  if (searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase();
    assignments.filter(a => a.title.toLowerCase().includes(q)).slice(0, 3).forEach(a => searchResults.push({ ...a, type: 'Assignment', link: '/assignments' }));
    courses.filter(c => c.name.toLowerCase().includes(q)).slice(0, 2).forEach(c => searchResults.push({ ...c, type: 'Course', link: '/courses' }));
    exams.filter(e => e.subject.toLowerCase().includes(q)).slice(0, 2).forEach(e => searchResults.push({ ...e, title: e.subject, type: 'Exam', link: '/exams' }));
  }

  const handleSearchClick = (link) => {
    navigate(link);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="h-[88px] bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-6 md:px-8 flex items-center justify-between transition-colors duration-300 flex-shrink-0 relative z-30">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gray-500 hover:text-[var(--text-primary)]">
          <Menu size={24} />
        </button>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">Good morning, Alia! ☀️</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Let's make today productive</p>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        {/* Global Search */}
        <div className="relative hidden lg:block" ref={searchRef}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="w-72 pl-11 pr-4 py-2.5 rounded-full bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 text-sm text-[var(--text-primary)] transition-colors placeholder-gray-400 dark:placeholder-gray-500 outline-none"
          />
          
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute top-full mt-2 left-0 w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2">
              {searchResults.length > 0 ? (
                <div className="py-2">
                  {searchResults.map(res => (
                    <div 
                      key={res.id} 
                      onClick={() => handleSearchClick(res.link)}
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-[var(--text-primary)] truncate">{res.title || res.name}</span>
                        <span className="text-[10px] uppercase tracking-wider text-indigo-500 font-semibold bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-md">{res.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">No results found for "{searchQuery}"</div>
              )}
            </div>
          )}
        </div>
        
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative text-gray-400 hover:text-indigo-500 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Bell size={22} />
            {notifications.length > 0 && notifications[0].id !== 'welcome' && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[var(--bg-secondary)]"></span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                <h3 className="font-semibold text-[var(--text-primary)] text-sm">Notifications</h3>
                <span className="text-xs text-indigo-500 cursor-pointer hover:underline">Mark all as read</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n, i) => (
                  <div key={i} className="p-4 border-b border-[var(--border-color)] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bell size={14} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--text-primary)]">{n.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5 leading-snug">{n.message}</p>
                      <span className="text-[10px] text-gray-400 mt-2 flex items-center gap-1"><Clock size={10}/> {n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-sm font-medium text-[var(--text-secondary)] hidden md:block border-l border-[var(--border-color)] pl-6">
          {formatDate(today, 'EEEE, d MMM yyyy')}
        </div>
      </div>
    </header>
  );
}
