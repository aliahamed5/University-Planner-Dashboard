import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function AnimatedBackground() {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, 50, 100, 50, 0],
          scale: [1, 1.2, 1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={`absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full mix-blend-multiply filter blur-[100px] opacity-50 ${isDark ? 'bg-indigo-900/40' : 'bg-indigo-300/50'}`}
      />
      <motion.div
        animate={{
          x: [0, -100, 0, 100, 0],
          y: [0, -50, -100, -50, 0],
          scale: [1, 1.1, 1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className={`absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full mix-blend-multiply filter blur-[100px] opacity-50 ${isDark ? 'bg-purple-900/40' : 'bg-purple-300/50'}`}
      />
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 100, 50, 0],
          scale: [1, 1.3, 1, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className={`absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full mix-blend-multiply filter blur-[100px] opacity-50 ${isDark ? 'bg-blue-900/30' : 'bg-blue-300/40'}`}
      />

      {/* Floating Shapes */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[15%] left-[10%] opacity-20 pointer-events-none"
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="36" height="36" rx="8" stroke={isDark ? "#818cf8" : "#4f46e5"} strokeWidth="4" strokeDasharray="4 4" />
        </svg>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, 20, 0],
          rotate: [0, -180, -360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[60%] right-[15%] opacity-20 pointer-events-none"
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="23" stroke={isDark ? "#c084fc" : "#9333ea"} strokeWidth="4" />
          <circle cx="25" cy="25" r="10" fill={isDark ? "#c084fc" : "#9333ea"} />
        </svg>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -50, 0],
          x: [0, -20, 0],
          rotate: [0, 45, 0, -45, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[25%] opacity-20 pointer-events-none"
      >
        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.5 2L28.5 16.5H44L31.5 25.5L36 40L22.5 31L9 40L13.5 25.5L1 16.5H16.5L22.5 2Z" fill={isDark ? "#60a5fa" : "#2563eb"} />
        </svg>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] right-[30%] pointer-events-none"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="2" width="4" height="20" rx="2" fill={isDark ? "#f472b6" : "#db2777"} />
          <rect x="2" y="14" width="4" height="20" rx="2" transform="rotate(-90 2 14)" fill={isDark ? "#f472b6" : "#db2777"} />
        </svg>
      </motion.div>
    </div>
  );
}
