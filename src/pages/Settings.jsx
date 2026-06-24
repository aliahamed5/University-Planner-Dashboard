import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, User, Bell, Shield, Paintbrush } from 'lucide-react';

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'appearance', icon: Paintbrush, label: 'Appearance' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'privacy', icon: Shield, label: 'Privacy & Security' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Settings</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your account preferences and app settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="md:col-span-1 space-y-2">
          <nav className="flex flex-col gap-1 bg-[var(--bg-secondary)]/50 backdrop-blur-md border border-[var(--border-color)] p-2 rounded-2xl shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 transform scale-[1.02]' 
                    : 'text-[var(--text-secondary)] hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[var(--text-primary)]'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          
          {activeTab === 'appearance' && (
            <div className="bg-[var(--bg-secondary)]/80 backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-8 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3"><Paintbrush className="text-indigo-500"/> Appearance</h3>
              
              <div className="flex items-center justify-between p-5 border border-[var(--border-color)] rounded-2xl bg-[var(--bg-primary)] shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <p className="font-semibold text-[var(--text-primary)] text-base">Theme Preference</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">Toggle between Light and Dark mode globally.</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative w-16 h-8 rounded-full transition-colors duration-300 flex items-center px-1 shadow-inner ${isDark ? 'bg-indigo-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full flex items-center justify-center transition-transform duration-300 shadow-sm ${isDark ? 'translate-x-8' : 'translate-x-0'}`}>
                    {isDark ? <Moon size={14} className="text-indigo-600" /> : <Sun size={14} className="text-amber-500" />}
                  </div>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-[var(--bg-secondary)]/80 backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-8 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3"><User className="text-indigo-500"/> Profile Information</h3>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Alia Ahmed"
                    className="w-full px-5 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue="alia@university.edu"
                    className="w-full px-5 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
                  />
                </div>
                <div className="pt-4">
                  <button type="button" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/30 transform hover:-translate-y-0.5">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-[var(--bg-secondary)]/80 backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-8 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3"><Bell className="text-indigo-500"/> Notification Preferences</h3>
              
              <div className="space-y-4">
                {['Push Notifications', 'Email Reminders', 'Weekly Summary'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 border border-[var(--border-color)] rounded-2xl bg-[var(--bg-primary)]">
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] text-base">{item}</p>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">Receive alerts for {item.toLowerCase()}.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={i !== 2} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="bg-[var(--bg-secondary)]/80 backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-8 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3"><Shield className="text-indigo-500"/> Privacy & Security</h3>
              
              <div className="space-y-4">
                <div className="p-5 border border-red-200 dark:border-red-900/30 rounded-2xl bg-red-50 dark:bg-red-500/5">
                  <div>
                    <p className="font-bold text-red-600 dark:text-red-400 text-base">Danger Zone</p>
                    <p className="text-sm text-red-500/80 mt-1 mb-4">Permanently delete your account and all data. This action cannot be undone.</p>
                    <button className="px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-500/20 dark:hover:bg-red-500/30 text-red-600 dark:text-red-400 rounded-lg font-semibold transition-colors text-sm border border-red-200 dark:border-red-500/30">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
