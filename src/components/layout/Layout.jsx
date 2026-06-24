import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AnimatedBackground from '../ui/AnimatedBackground';

export default function Layout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--bg-primary)] transition-colors duration-300 relative">
      <AnimatedBackground />
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-[1400px] mx-auto w-full relative z-20">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
