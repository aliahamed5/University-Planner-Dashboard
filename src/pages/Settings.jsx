import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, User, Bell, Shield, Paintbrush } from 'lucide-react';

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Settings</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your account preferences and app settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-2">
          <nav className="flex flex-col gap-1">
            {[
              { id: 'profile', icon: User, label: 'Profile' },
              { id: 'appearance', icon: Paintbrush, label: 'Appearance' },
              { id: 'notifications', icon: Bell, label: 'Notifications' },
              { id: 'privacy', icon: Shield, label: 'Privacy & Security' },
            ].map((tab, i) => (
              <button
                key={tab.id}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  i === 1 
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400' 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="md:col-span-2 space-y-6">
          
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Appearance</h3>
            
            <div className="flex items-center justify-between p-4 border border-[var(--border-color)] rounded-xl">
              <div>
                <p className="font-medium text-[var(--text-primary)]">Theme Preference</p>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">Toggle between Light and Dark mode.</p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative w-14 h-7 rounded-full transition-colors flex items-center px-1 ${isDark ? 'bg-indigo-500' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full flex items-center justify-center transition-transform ${isDark ? 'translate-x-7' : 'translate-x-0'}`}>
                  {isDark ? <Moon size={12} className="text-indigo-500" /> : <Sun size={12} className="text-gray-400" />}
                </div>
              </button>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Profile Information</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="Alia Ahmed"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="alia@university.edu"
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="pt-2">
                <button type="button" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors text-sm shadow-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
