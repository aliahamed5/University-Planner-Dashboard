import { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { Plus, Trash2, Edit2, BookOpen } from 'lucide-react';
import Modal from '../components/ui/Modal';
import ProgressBar from '../components/ui/ProgressBar';

export default function Courses() {
  const { courses, addCourse, editCourse, deleteCourse, assignments } = usePlanner();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    instructor: '',
    color: '#7F77DD'
  });

  const colors = ['#7F77DD', '#22c55e', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6', '#ef4444', '#14b8a6'];

  const handleOpenModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({ name: course.name, instructor: course.instructor, color: course.color });
    } else {
      setEditingCourse(null);
      setFormData({ name: '', instructor: '', color: '#7F77DD' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourse) {
      editCourse(editingCourse.id, formData);
    } else {
      addCourse(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">My Courses</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your subjects and track progress.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm"
        >
          <Plus size={18} />
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map(course => {
          const courseAssignments = assignments.filter(a => a.courseId === course.id);
          const total = courseAssignments.length;
          const completed = courseAssignments.filter(a => a.status === 'Completed').length;
          const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

          return (
            <div key={course.id} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button onClick={() => handleOpenModal(course)} className="p-1.5 text-gray-400 hover:text-indigo-500 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => { if(confirm('Are you sure? This will delete all assignments for this course.')) deleteCourse(course.id) }} className="p-1.5 text-gray-400 hover:text-red-500 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-sm" style={{ backgroundColor: course.color }}>
                <BookOpen size={24} />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 truncate pr-16">{course.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 truncate">{course.instructor}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-secondary)] font-medium">Progress</span>
                  <span className="text-[var(--text-primary)] font-bold">{percent}%</span>
                </div>
                <ProgressBar progress={percent} color={course.color} />
                <div className="text-xs text-gray-500 text-right mt-1">
                  {completed} / {total} Tasks
                </div>
              </div>
            </div>
          );
        })}
        {courses.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No courses found. Add a course to get started.
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCourse ? 'Edit Course' : 'Add Course'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Course Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. React Development"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Instructor</label>
            <input
              required
              type="text"
              value={formData.instructor}
              onChange={e => setFormData({...formData, instructor: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. Dr. Ahmed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Color Label</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {colors.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFormData({...formData, color: c})}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${formData.color === c ? 'border-gray-900 dark:border-white scale-110' : 'border-transparent hover:scale-110'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <button type="submit" className="w-full py-2 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
            {editingCourse ? 'Save Changes' : 'Add Course'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
