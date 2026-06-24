import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { seedCourses, seedAssignments, seedExams, seedNotes } from '../utils/seedData';
import toast from 'react-hot-toast';

const PlannerContext = createContext();

export function PlannerProvider({ children }) {
  const [courses, setCourses] = useLocalStorage('courses', seedCourses);
  const [assignments, setAssignments] = useLocalStorage('assignments', seedAssignments);
  const [exams, setExams] = useLocalStorage('exams', seedExams);
  const [notes, setNotes] = useLocalStorage('notes', seedNotes);

  const generateId = () => crypto.randomUUID();

  // Course actions
  const addCourse = (course) => {
    setCourses([...courses, { ...course, id: Date.now().toString(), totalTasks: 0 }]);
    toast.success('Course added successfully!');
  };
  const editCourse = (id, updated) => {
    setCourses(courses.map(c => c.id === id ? { ...c, ...updated } : c));
    toast.success('Course updated!');
  };
  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
    setAssignments(assignments.filter(a => a.courseId !== id));
    toast.success('Course deleted!');
  };

  // Assignment actions
  const addAssignment = (data) => {
    const newAssignment = { ...data, id: generateId(), status: 'Pending', order: assignments.length };
    setAssignments([...assignments, newAssignment]);
    // update course totalTasks
    setCourses(courses.map(c => c.id === data.courseId ? { ...c, totalTasks: c.totalTasks + 1 } : c));
    toast.success('Assignment created!');
  };
  const editAssignment = (id, data) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, ...data } : a));
    toast.success('Assignment updated!');
  };
  const deleteAssignment = (id) => {
    const assignment = assignments.find(a => a.id === id);
    if (assignment) {
      setCourses(courses.map(c => c.id === assignment.courseId ? { ...c, totalTasks: Math.max(0, c.totalTasks - 1) } : c));
    }
    setAssignments(assignments.filter(a => a.id !== id));
    toast.success('Assignment removed!');
  };
  const updateAssignmentStatus = (id, status) => setAssignments(assignments.map(a => a.id === id ? { ...a, status } : a));
  const reorderAssignments = (orderedList) => setAssignments(orderedList);

  // Exam actions
  const addExam = (data) => {
    setExams([...exams, { ...data, id: generateId() }]);
    toast.success('Exam scheduled!');
  };
  const editExam = (id, data) => {
    setExams(exams.map(e => e.id === id ? { ...e, ...data } : e));
    toast.success('Exam details updated!');
  };
  const deleteExam = (id) => {
    setExams(exams.filter(e => e.id !== id));
    toast.success('Exam removed!');
  };

  // Note actions
  const addNote = (data) => {
    setNotes([...notes, { ...data, id: generateId(), createdAt: new Date().toISOString() }]);
    toast.success('Note saved!');
  };
  const editNote = (id, data) => {
    setNotes(notes.map(n => n.id === id ? { ...n, ...data } : n));
    toast.success('Note updated!');
  };
  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
    toast.success('Note deleted!');
  };

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
