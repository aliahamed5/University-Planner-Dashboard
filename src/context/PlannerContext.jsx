import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { seedCourses, seedAssignments, seedExams, seedNotes } from '../utils/seedData';

const PlannerContext = createContext();

export function PlannerProvider({ children }) {
  const [courses, setCourses] = useLocalStorage('courses', seedCourses);
  const [assignments, setAssignments] = useLocalStorage('assignments', seedAssignments);
  const [exams, setExams] = useLocalStorage('exams', seedExams);
  const [notes, setNotes] = useLocalStorage('notes', seedNotes);

  const generateId = () => crypto.randomUUID();

  // Course actions
  const addCourse = (data) => setCourses([...courses, { ...data, id: generateId(), totalTasks: 0 }]);
  const editCourse = (id, data) => setCourses(courses.map(c => c.id === id ? { ...c, ...data } : c));
  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
    setAssignments(assignments.filter(a => a.courseId !== id));
  };

  // Assignment actions
  const addAssignment = (data) => {
    const newAssignment = { ...data, id: generateId(), status: 'Pending', order: assignments.length };
    setAssignments([...assignments, newAssignment]);
    // update course totalTasks
    setCourses(courses.map(c => c.id === data.courseId ? { ...c, totalTasks: c.totalTasks + 1 } : c));
  };
  const editAssignment = (id, data) => setAssignments(assignments.map(a => a.id === id ? { ...a, ...data } : a));
  const deleteAssignment = (id) => {
    const assignment = assignments.find(a => a.id === id);
    if (assignment) {
      setCourses(courses.map(c => c.id === assignment.courseId ? { ...c, totalTasks: Math.max(0, c.totalTasks - 1) } : c));
    }
    setAssignments(assignments.filter(a => a.id !== id));
  };
  const updateAssignmentStatus = (id, status) => setAssignments(assignments.map(a => a.id === id ? { ...a, status } : a));
  const reorderAssignments = (orderedList) => setAssignments(orderedList);

  // Exam actions
  const addExam = (data) => setExams([...exams, { ...data, id: generateId() }]);
  const editExam = (id, data) => setExams(exams.map(e => e.id === id ? { ...e, ...data } : e));
  const deleteExam = (id) => setExams(exams.filter(e => e.id !== id));

  // Note actions
  const addNote = (data) => setNotes([...notes, { ...data, id: generateId(), createdAt: new Date().toISOString() }]);
  const editNote = (id, data) => setNotes(notes.map(n => n.id === id ? { ...n, ...data } : n));
  const deleteNote = (id) => setNotes(notes.filter(n => n.id !== id));

  return (
    <PlannerContext.Provider value={{
      courses, addCourse, editCourse, deleteCourse,
      assignments, addAssignment, editAssignment, deleteAssignment, updateAssignmentStatus, reorderAssignments,
      exams, addExam, editExam, deleteExam,
      notes, addNote, editNote, deleteNote
    }}>
      {children}
    </PlannerContext.Provider>
  );
}

export const usePlanner = () => useContext(PlannerContext);
