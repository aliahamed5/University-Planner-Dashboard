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
    </div>
  );
}
