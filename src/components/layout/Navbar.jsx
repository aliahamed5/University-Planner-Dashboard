import { Search, Bell, Menu } from 'lucide-react';
import { formatDate } from '../../utils/dateHelpers';

export default function Navbar() {
  const today = new Date();

  return (
    <header className="h-[88px] bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-6 md:px-8 flex items-center justify-between transition-colors duration-300 flex-shrink-0">
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
        <div className="relative hidden lg:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-72 pl-11 pr-4 py-2.5 rounded-full bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 text-sm text-[var(--text-primary)] transition-colors placeholder-gray-400 dark:placeholder-gray-500 outline-none"
          />
        </div>
        
        <button className="relative text-gray-400 hover:text-indigo-500 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell size={22} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[var(--bg-secondary)]"></span>
        </button>

        <div className="text-sm font-medium text-[var(--text-secondary)] hidden md:block border-l border-[var(--border-color)] pl-6">
          {formatDate(today, 'EEEE, d MMM yyyy')}
        </div>
      </div>
    </header>
  );
}
