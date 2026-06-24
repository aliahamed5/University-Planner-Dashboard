import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Code, FileCode2, TerminalSquare, Braces, Cpu, MonitorPlay, Database, Layers, Hash, Command } from 'lucide-react';

export default function AnimatedBackground() {
  const { isDark } = useTheme();

  // Opacity has been increased significantly
  const opacityClass = "opacity-[0.25] dark:opacity-[0.20]";
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 100, 50, 0],
          scale: [1, 1.3, 1, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className={`absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 ${isDark ? 'bg-indigo-900/60' : 'bg-indigo-300/50'}`}
      />
      <motion.div
        animate={{
          x: [0, -100, 0, 100, 0],
          y: [0, -50, -100, -50, 0],
          scale: [1, 1.1, 1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className={`absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 ${isDark ? 'bg-purple-900/60' : 'bg-purple-300/50'}`}
      />
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 100, 50, 0],
          scale: [1, 1.3, 1, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className={`absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 ${isDark ? 'bg-blue-900/50' : 'bg-blue-300/40'}`}
      />

      {/* Floating Programming Elements - Increased visibility and quantity */}
      <motion.div
        animate={{ y: [0, -40, 0], rotate: [-10, 10, -10] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[10%] left-[5%] ${opacityClass} ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}
      >
        <Code size={64} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 50, 0], x: [0, 30, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className={`absolute top-[40%] right-[8%] ${opacityClass} ${isDark ? 'text-purple-300' : 'text-purple-600'}`}
      >
        <FileCode2 size={72} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -60, 0], x: [0, -30, 0], rotate: [15, -15, 15] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-[10%] left-[15%] ${opacityClass} ${isDark ? 'text-blue-300' : 'text-blue-600'}`}
      >
        <TerminalSquare size={80} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], y: [0, 30, 0], rotate: [-20, 20, -20] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[20%] right-[25%] ${opacityClass} ${isDark ? 'text-pink-300' : 'text-pink-600'}`}
      >
        <Braces size={56} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-[20%] right-[30%] ${opacityClass} ${isDark ? 'text-emerald-300' : 'text-emerald-600'}`}
      >
        <Cpu size={64} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -50, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[30%] left-[30%] ${opacityClass} ${isDark ? 'text-amber-300' : 'text-amber-600'}`}
      >
        <Database size={50} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{ x: [0, 40, 0], rotate: [-10, 10, -10] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-[40%] left-[5%] ${opacityClass} ${isDark ? 'text-cyan-300' : 'text-cyan-600'}`}
      >
        <Layers size={60} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 40, 0], rotate: [0, -45, 0] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-[5%] right-[10%] ${opacityClass} ${isDark ? 'text-rose-300' : 'text-rose-600'}`}
      >
        <Hash size={70} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[5%] right-[40%] ${opacityClass} ${isDark ? 'text-violet-300' : 'text-violet-600'}`}
      >
        <Command size={55} strokeWidth={1.5} />
      </motion.div>
    </div>
  );
}
