import { addDays, subDays } from 'date-fns';

const today = new Date();

export const seedCourses = [
  { id: '1', name: 'React Development', instructor: 'Ahmed Samir', color: '#7F77DD', totalTasks: 4 },
  { id: '2', name: 'Database Systems', instructor: 'Mona Ali', color: '#22c55e', totalTasks: 5 },
  { id: '3', name: 'Discrete Mathematics', instructor: 'Hossam Eldeeb', color: '#f59e0b', totalTasks: 5 },
  { id: '4', name: 'Data Structures', instructor: 'Islam Tarek', color: '#3b82f6', totalTasks: 5 },
];

export const seedAssignments = [
  { id: '1', title: 'React Project', courseId: '1', description: 'Build a dashboard', dueDate: addDays(today, 1).toISOString(), status: 'In Progress', order: 1 },
  { id: '2', title: 'React Hooks Quiz', courseId: '1', description: 'Context API and Reducers', dueDate: subDays(today, 2).toISOString(), status: 'Completed', order: 2 },
  { id: '3', title: 'DB Normalization', courseId: '2', description: 'Normalize to 3NF', dueDate: addDays(today, 3).toISOString(), status: 'Pending', order: 3 },
  { id: '4', title: 'Math Homework', courseId: '3', description: 'Graph theory proofs', dueDate: addDays(today, 2).toISOString(), status: 'Pending', order: 4 },
  { id: '5', title: 'DSA Problem Set', courseId: '4', description: 'Linked lists and Trees', dueDate: addDays(today, 5).toISOString(), status: 'Pending', order: 5 },
];

export const seedExams = [
  { id: '1', subject: 'Database Systems Exam', date: addDays(today, 12).toISOString(), location: 'Hall A', notes: 'Chapters 1-5' },
  { id: '2', subject: 'Data Structures Exam', date: addDays(today, 2).toISOString(), location: 'Lab 2', notes: 'Bring student ID' },
];

export const seedNotes = [
  { id: '1', content: 'Study React Hooks and Context API', color: '#fef08a', createdAt: new Date().toISOString() },
  { id: '2', content: 'Review DB Normalization before exam', color: '#bbf7d0', createdAt: subDays(today, 1).toISOString() },
  { id: '3', content: 'Practice DSA Problems daily', color: '#fbcfe8', createdAt: subDays(today, 2).toISOString() },
  { id: '4', content: "Don't forget the assignment submission!", color: '#bfdbfe', createdAt: addDays(today, 1).toISOString() },
];
