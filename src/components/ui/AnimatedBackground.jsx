import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Code, FileCode2, TerminalSquare, Braces, Cpu } from 'lucide-react';

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

      {/* Floating Programming Elements */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          rotate: [-10, 10, -10],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[15%] left-[8%] opacity-[0.15] pointer-events-none ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}
      >
        <Code size={48} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className={`absolute top-[50%] right-[10%] opacity-[0.15] pointer-events-none ${isDark ? 'text-purple-400' : 'text-purple-600'}`}
      >
        <FileCode2 size={56} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -60, 0],
          x: [0, -30, 0],
          rotate: [15, -15, 15],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-[15%] left-[20%] opacity-[0.15] pointer-events-none ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
      >
        <TerminalSquare size={64} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          y: [0, 30, 0],
          rotate: [-20, 20, -20],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[25%] right-[25%] opacity-[0.15] pointer-events-none ${isDark ? 'text-pink-400' : 'text-pink-600'}`}
      >
        <Braces size={40} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-[30%] right-[30%] opacity-[0.15] pointer-events-none ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}
      >
        <Cpu size={50} strokeWidth={1.5} />
      </motion.div>
    </div>
  );
}
