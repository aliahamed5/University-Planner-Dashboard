import { useState, useMemo } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { Plus, Trash2, Edit2, Clock, Search, Filter, Check } from 'lucide-react';
import Modal from '../components/ui/Modal';
import { formatDate, getRelativeTimeText, getRelativeTimeColor } from '../utils/dateHelpers';

export default function Assignments() {
  const { assignments, addAssignment, editAssignment, deleteAssignment, updateAssignmentStatus, courses } = usePlanner();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
    description: '',
    dueDate: '',
    status: 'Pending'
  });

  const handleOpenModal = (assignment = null) => {
    if (assignment) {
      setEditingAssignment(assignment);
      setFormData({ 
        title: assignment.title, 
        courseId: assignment.courseId, 
        description: assignment.description, 
        dueDate: assignment.dueDate.substring(0, 16),
        status: assignment.status
      });
    } else {
      setEditingAssignment(null);
      setFormData({ title: '', courseId: courses.length > 0 ? courses[0].id : '', description: '', dueDate: '', status: 'Pending' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = { ...formData, dueDate: new Date(formData.dueDate).toISOString() };
    if (editingAssignment) {
      editAssignment(editingAssignment.id, dataToSave);
    } else {
      addAssignment(dataToSave);
    }
    setIsModalOpen(false);
  };

  const filteredAssignments = useMemo(() => {
    return assignments.filter(a => {
      const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            a.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
      return matchesSearch && matchesStatus;
    }).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }, [assignments, searchQuery, statusFilter]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400';
      case 'In Progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400';
      default: return 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400';
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Assignments</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your tasks and deadlines.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm whitespace-nowrap"
        >
          <Plus size={18} />
          Add Assignment
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer shadow-sm"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAssignments.map(assignment => {
          const course = courses.find(c => c.id === assignment.courseId);
          return (
            <div key={assignment.id} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group">
              <div className="flex-1 flex gap-4">
                <div className="flex-shrink-0 flex items-start pt-1">
                  <button 
                    onClick={() => updateAssignmentStatus(assignment.id, assignment.status === 'Completed' ? 'Pending' : 'Completed')}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${assignment.status === 'Completed' ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-600 text-transparent hover:border-green-500'}`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </button>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-sm" style={{ backgroundColor: course?.color || '#ccc' }}>
                  <span className="font-bold text-base md:text-lg">{course?.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className={`text-base md:text-lg font-bold text-[var(--text-primary)] truncate transition-all ${assignment.status === 'Completed' ? 'line-through opacity-50' : ''}`}>{assignment.title}</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold whitespace-nowrap ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">{course?.name}</p>
                  <p className={`text-sm text-[var(--text-secondary)] line-clamp-2 ${assignment.status === 'Completed' ? 'opacity-50' : ''}`}>{assignment.description}</p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className={`flex items-center gap-1.5 text-xs md:text-sm font-medium ${getRelativeTimeColor(assignment.dueDate)}`}>
                      <Clock size={14} className="md:w-4 md:h-4" />
                      {getRelativeTimeText(assignment.dueDate)} <span className="hidden md:inline">({formatDate(assignment.dueDate, 'MMM d, h:mm a')})</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity border-t md:border-t-0 pt-4 md:pt-0 mt-4 md:mt-0 justify-end">
                <select
                  value={assignment.status}
                  onChange={(e) => updateAssignmentStatus(assignment.id, e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <button onClick={() => handleOpenModal(assignment)} className="p-2 text-gray-400 hover:text-indigo-500 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors ml-2">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => { if(confirm('Delete this assignment?')) deleteAssignment(assignment.id) }} className="p-2 text-gray-400 hover:text-red-500 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
        {filteredAssignments.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            No assignments found matching your criteria.
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingAssignment ? 'Edit Assignment' : 'Add Assignment'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Title</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. React Final Project"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Course</label>
            <select
              required
              value={formData.courseId}
              onChange={e => setFormData({...formData, courseId: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              {courses.length === 0 && <option value="" disabled>No courses available</option>}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Due Date</label>
            <input
              required
              type="datetime-local"
              value={formData.dueDate}
              onChange={e => setFormData({...formData, dueDate: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Status</label>
            <select
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              placeholder="e.g. Include all chapters up to 5"
            />
          </div>
          <button type="submit" disabled={courses.length === 0} className="w-full py-2 mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors">
            {editingAssignment ? 'Save Changes' : 'Add Assignment'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
