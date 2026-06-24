import { usePlanner } from '../context/PlannerContext';
import { BookOpen, CheckCircle, Clock, CalendarDays, AlertCircle, ChevronRight, ChevronLeft, Calendar as CalendarIcon, FileText } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import ProgressBar from '../components/ui/ProgressBar';
import { useCountdown } from '../hooks/useCountdown';
import { getRelativeTimeText, getRelativeTimeColor, formatDate } from '../utils/dateHelpers';
import { isPast, differenceInDays } from 'date-fns';
import { Link } from 'react-router-dom';
import MiniCalendar from '../components/ui/MiniCalendar';
import { motion } from 'framer-motion';

function ExamCountdown({ exam }) {
  const timeLeft = useCountdown(exam?.date);
  
  if (!exam) return <div className="text-sm text-gray-500 dark:text-gray-400">No upcoming exams</div>;

  return (
    <div className="mt-4">
      <h4 className="font-semibold text-lg text-[var(--text-primary)]">{exam.subject}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
        <CalendarIcon size={14} />
        {formatDate(exam.date)}
      </p>
      
      <div className="grid grid-cols-4 gap-3 mt-6">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map((item) => (
          <div key={item.label} className="bg-indigo-600 rounded-xl p-3 flex flex-col items-center justify-center text-white">
            <span className="text-2xl font-bold leading-none">{item.value.toString().padStart(2, '0')}</span>
            <span className="text-[10px] uppercase tracking-wider mt-1 opacity-80">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { courses, assignments, exams, notes } = usePlanner();

  const completedTasks = assignments.filter(a => a.status === 'Completed').length;
  const pendingTasks = assignments.filter(a => a.status !== 'Completed').length;

  const dueIn3Days = assignments.filter(a => {
    if (a.status === 'Completed') return false;
    const days = differenceInDays(new Date(a.dueDate), new Date());
    return days >= 0 && days <= 3;
  }).length;

  const upcomingExamsCount = exams.filter(e => !isPast(new Date(e.date))).length;

  const pendingSorted = [...assignments]
    .filter(a => a.status !== 'Completed')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const nearestAssignment = pendingSorted[0];

  const examsSorted = [...exams]
    .filter(e => !isPast(new Date(e.date)))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const nearestExam = examsSorted[0];

  let nearestDeadlineLabel = 'None';
  let nearestDeadlineTitle = 'All caught up!';
  if (nearestAssignment) {
    nearestDeadlineLabel = getRelativeTimeText(nearestAssignment.dueDate);
    nearestDeadlineTitle = nearestAssignment.title;
  }

  const stats = [
    { icon: BookOpen, title: 'Total Courses', value: courses.length, subtitle: 'Your subjects', colorClass: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400' },
    { icon: CheckCircle, title: 'Completed Tasks', value: completedTasks, subtitle: 'Keep it up!', colorClass: 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400' },
    { icon: Clock, title: 'Pending Tasks', value: pendingTasks, subtitle: 'Still to do', colorClass: 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400' },
    { icon: AlertCircle, title: 'Due in 3 Days', value: dueIn3Days, subtitle: 'Upcoming soon', colorClass: 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' },
    { icon: CalendarDays, title: 'Upcoming Exams', value: upcomingExamsCount, subtitle: 'Stay prepared', colorClass: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' },
    { icon: Clock, title: 'Nearest Deadline', value: nearestDeadlineLabel, subtitle: nearestDeadlineTitle, colorClass: 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400' }
  ];

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div variants={containerVariant} initial="hidden" animate="visible" className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} variants={itemVariant}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariant} className="lg:col-span-2 space-y-6">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Quick Overview</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.slice(0, 4).map(course => {
                const courseAssignments = assignments.filter(a => a.courseId === course.id);
                const completed = courseAssignments.filter(a => a.status === 'Completed').length;
                const progress = courseAssignments.length > 0 ? (completed / courseAssignments.length) * 100 : 0;
                
                return (
                  <Link key={course.id} to="/courses" className="block p-4 border border-[var(--border-color)] rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <h4 className="font-semibold text-[var(--text-primary)] mb-1">{course.name}</h4>
                    <p className="text-xs text-gray-500 mb-3">{completed} of {courseAssignments.length} tasks done</p>
                    <ProgressBar progress={progress} color={course.color} />
                  </Link>
                );
              })}
            </div>
            {courses.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p>No courses added yet.</p>
                <Link to="/courses" className="text-indigo-500 hover:underline text-sm mt-2 inline-block">Add your first course</Link>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div variants={itemVariant} className="space-y-6">
          {/* Nearest Deadline Card */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Nearest Assignment</h3>
              <Link to="/assignments" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">View all</Link>
            </div>
            
            {nearestAssignment ? (
              <div className="flex-1">
                <h4 className="text-xl font-bold text-[var(--text-primary)]">{nearestAssignment.title}</h4>
                <p className="text-sm text-indigo-500 mt-1 mb-4 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  {courses.find(c => c.id === nearestAssignment.courseId)?.name || 'Unknown Course'}
                </p>
                
                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    Due: {formatDate(nearestAssignment.dueDate)}
                  </p>
                  <p className={`flex items-center gap-2 ${getRelativeTimeColor(nearestAssignment.dueDate)}`}>
                    <Clock size={16} />
                    {getRelativeTimeText(nearestAssignment.dueDate)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                No pending assignments.
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Nearest Exam */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <CalendarDays size={18} className="text-gray-400" />
              Nearest Exam
            </h3>
            <Link to="/exams" className="text-xs text-indigo-500 hover:underline">View all</Link>
          </div>
          <ExamCountdown exam={nearestExam} />
        </div>

        {/* Calendar */}
        <MiniCalendar />

        {/* Quick Notes */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <FileText size={18} className="text-gray-400" />
              Quick Notes
            </h3>
            <Link to="/notes" className="text-xs text-indigo-500 hover:text-indigo-600 font-medium">+ New Note</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pr-2">
            {notes.slice(0, 4).map(note => (
              <div key={note.id} className="rounded-xl p-3 text-sm text-gray-800 shadow-sm" style={{ backgroundColor: note.color }}>
                <p className="line-clamp-3 leading-snug">{note.content}</p>
              </div>
            ))}
            {notes.length === 0 && (
              <div className="col-span-2 text-center text-sm text-gray-400 py-8">No notes yet.</div>
            )}
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-[var(--text-primary)]">Course Progress</h3>
            <Link to="/courses" className="text-xs text-indigo-500 hover:underline">View all courses</Link>
          </div>
          <div className="space-y-5">
            {courses.slice(0, 4).map(course => {
              const courseAssignments = assignments.filter(a => a.courseId === course.id);
              const total = courseAssignments.length;
              const completed = courseAssignments.filter(a => a.status === 'Completed').length;
              const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

              return (
                <div key={course.id} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white shadow-sm" style={{ backgroundColor: course.color }}>
                    <BookOpen size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-[var(--text-primary)] truncate">{course.name}</h4>
                    <p className="text-xs text-gray-500 truncate mb-1.5">Instructor: {course.instructor}</p>
                    <div className="flex items-center gap-3">
                      <ProgressBar progress={percent} color={course.color} />
                      <span className="text-xs font-medium text-[var(--text-primary)] w-8 text-right">{percent}%</span>
                    </div>
                  </div>
                  <div className="text-xs text-center">
                    <div className="font-semibold text-[var(--text-primary)]">{completed}/{total}</div>
                    <div className="text-[10px] text-gray-500 uppercase">Tasks Done</div>
                  </div>
                </div>
              );
            })}
            {courses.length === 0 && <div className="text-sm text-gray-400 text-center">No courses found.</div>}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-[var(--text-primary)]">Upcoming Deadlines</h3>
            <Link to="/assignments" className="text-xs text-indigo-500 hover:underline">View all</Link>
          </div>
          <div className="space-y-4">
            {pendingSorted.slice(0, 4).map(assignment => {
              const course = courses.find(c => c.id === assignment.courseId);
              return (
                <div key={assignment.id} className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)] hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: course?.color || '#ccc' }}>
                      <AlertCircle size={14} />
                    </div>
                    <div className="truncate">
                      <h4 className="text-sm font-medium text-[var(--text-primary)] truncate">{assignment.title}</h4>
                      <p className="text-xs text-gray-500 truncate">{course?.name}</p>
                    </div>
                  </div>
                  <div className={`text-xs font-medium ${getRelativeTimeColor(assignment.dueDate)} ml-2 flex-shrink-0`}>
                    {getRelativeTimeText(assignment.dueDate)}
                  </div>
                </div>
              );
            })}
            {pendingSorted.length === 0 && <div className="text-sm text-gray-400 text-center">No upcoming deadlines.</div>}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
