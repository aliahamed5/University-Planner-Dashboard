import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, CheckSquare, CalendarDays, StickyNote, Calendar, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Sidebar() {
  const { isDark, toggleTheme } = useTheme();

  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/courses', icon: BookOpen, label: 'Courses' },
    { to: '/assignments', icon: CheckSquare, label: 'Assignments' },
    { to: '/exams', icon: CalendarDays, label: 'Exams' },
    { to: '/notes', icon: StickyNote, label: 'Notes' },
    { to: '#calendar', icon: Calendar, label: 'Calendar' },
    { to: '#settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-[var(--sidebar-bg)] text-white hidden md:flex flex-col h-full transition-colors duration-300 flex-shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center flex-shrink-0">
          <BookOpen size={20} className="text-white" />
        </div>
        <div className="overflow-hidden">
          <h1 className="font-bold text-xl tracking-wide truncate">UniPlanner</h1>
          <p className="text-[10px] text-gray-400 truncate uppercase tracking-wider">Your Study Companion</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive && !link.to.startsWith('#')
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <link.icon size={20} />
            <span className="font-medium text-sm">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
            <span>Dark Mode</span>
          </div>
          <button
            onClick={toggleTheme}
            className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 ${isDark ? 'bg-indigo-500' : 'bg-gray-600'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isDark ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-400 to-indigo-500 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold truncate">Hi, Alia 👋</h4>
            <p className="text-xs text-gray-400 truncate">Stay organized!</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
