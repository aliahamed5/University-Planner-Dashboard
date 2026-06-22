import { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { Plus, Trash2, Edit2, MapPin, Calendar as CalendarIcon, AlignLeft } from 'lucide-react';
import Modal from '../components/ui/Modal';
import { formatDate } from '../utils/dateHelpers';
import { useCountdown } from '../hooks/useCountdown';
import { isPast } from 'date-fns';

export default function Exams() {
  const { exams, addExam, editExam, deleteExam } = usePlanner();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  
  const [formData, setFormData] = useState({
    subject: '',
    date: '',
    location: '',
    notes: ''
  });

  const handleOpenModal = (exam = null) => {
    if (exam) {
      setEditingExam(exam);
      setFormData({ 
        subject: exam.subject, 
        date: exam.date.substring(0, 16), // datetime-local format
        location: exam.location,
        notes: exam.notes
      });
    } else {
      setEditingExam(null);
      setFormData({ subject: '', date: '', location: '', notes: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = { ...formData, date: new Date(formData.date).toISOString() };
    if (editingExam) {
      editExam(editingExam.id, dataToSave);
    } else {
      addExam(dataToSave);
    }
    setIsModalOpen(false);
  };

  const sortedExams = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date));
  const upcomingExams = sortedExams.filter(e => !isPast(new Date(e.date)));
  const pastExams = sortedExams.filter(e => isPast(new Date(e.date)));
  const nearestExam = upcomingExams[0];

  const NearestExamTimer = () => {
    const timeLeft = useCountdown(nearestExam?.date);
    if (!nearestExam) return null;

    return (
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg mb-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-sm">
            Nearest Exam
          </div>
          <h2 className="text-3xl font-bold mb-2">{nearestExam.subject}</h2>
          <div className="flex items-center gap-4 text-indigo-100 text-sm">
            <span className="flex items-center gap-1"><CalendarIcon size={16}/> {formatDate(nearestExam.date, 'EEEE, d MMMM yyyy - h:mm a')}</span>
            <span className="flex items-center gap-1"><MapPin size={16}/> {nearestExam.location}</span>
          </div>
        </div>
        <div className="flex gap-3">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item) => (
            <div key={item.label} className="bg-white/10 backdrop-blur-md rounded-xl p-4 w-20 flex flex-col items-center justify-center border border-white/20">
              <span className="text-3xl font-bold leading-none mb-1">{item.value.toString().padStart(2, '0')}</span>
              <span className="text-[10px] uppercase tracking-wider opacity-80">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Exams Schedule</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Keep track of your midterms and finals.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm"
        >
          <Plus size={18} />
          Add Exam
        </button>
      </div>

      <NearestExamTimer />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">All Exams</h3>
        {sortedExams.map(exam => {
          const isPassed = isPast(new Date(exam.date));
          return (
            <div key={exam.id} className={`bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group ${isPassed ? 'opacity-60' : ''}`}>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className={`text-lg font-bold ${isPassed ? 'line-through text-gray-500' : 'text-[var(--text-primary)]'}`}>
                    {exam.subject}
                  </h4>
                  {isPassed && <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs rounded-md font-medium">Completed</span>}
                </div>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1.5"><CalendarIcon size={16} className="text-indigo-500"/> {formatDate(exam.date, 'MMM d, yyyy - h:mm a')}</span>
                  {exam.location && <span className="flex items-center gap-1.5"><MapPin size={16} className="text-red-400"/> {exam.location}</span>}
                  {exam.notes && <span className="flex items-center gap-1.5"><AlignLeft size={16} className="text-gray-400"/> {exam.notes}</span>}
                </div>
              </div>
              
              <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleOpenModal(exam)} className="p-2 text-gray-400 hover:text-indigo-500 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => { if(confirm('Delete this exam?')) deleteExam(exam.id) }} className="p-2 text-gray-400 hover:text-red-500 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
        {exams.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            No exams scheduled. Relax!
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingExam ? 'Edit Exam' : 'Add Exam'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Subject</label>
            <input
              required
              type="text"
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. Database Systems Finals"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Date & Time</label>
            <input
              required
              type="datetime-local"
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Location (Optional)</label>
            <input
              type="text"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. Hall A, Seat 42"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Notes (Optional)</label>
            <input
              type="text"
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. Bring calculator and ID"
            />
          </div>
          <button type="submit" className="w-full py-2 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
            {editingExam ? 'Save Changes' : 'Add Exam'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
