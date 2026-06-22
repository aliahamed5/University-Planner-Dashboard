import { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import Modal from '../components/ui/Modal';
import { formatDate } from '../utils/dateHelpers';

export default function Notes() {
  const { notes, addNote, deleteNote, editNote } = usePlanner();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#fef08a'); // default yellow

  const colors = [
    { name: 'Yellow', hex: '#fef08a' },
    { name: 'Green', hex: '#bbf7d0' },
    { name: 'Blue', hex: '#bfdbfe' },
    { name: 'Pink', hex: '#fbcfe8' },
    { name: 'Purple', hex: '#e9d5ff' },
  ];

  const handleOpenModal = (note = null) => {
    if (note) {
      setEditingNote(note);
      setContent(note.content);
      setColor(note.color);
    } else {
      setEditingNote(null);
      setContent('');
      setColor('#fef08a');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (editingNote) {
      editNote(editingNote.id, { content, color });
    } else {
      addNote({ content, color });
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">My Notes</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Capture your thoughts and ideas quickly.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm"
        >
          <Plus size={18} />
          New Note
        </button>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {notes.map(note => (
          <div
            key={note.id}
            className="break-inside-avoid relative group rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            style={{ backgroundColor: note.color }}
            onClick={() => handleOpenModal(note)}
          >
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                className="p-1.5 bg-black/10 hover:bg-red-500 hover:text-white rounded-lg text-black/60 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap font-medium leading-relaxed mt-4">
              {note.content}
            </p>
            <div className="mt-6 text-[11px] text-black/40 font-medium uppercase tracking-wider">
              {formatDate(note.createdAt, 'MMM d, yyyy')}
            </div>
          </div>
        ))}
        {notes.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No notes yet. Click "New Note" to create one.
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingNote ? 'Edit Note' : 'New Note'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Color</label>
            <div className="flex gap-3">
              {colors.map(c => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setColor(c.hex)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${color === c.hex ? 'border-indigo-600 scale-110' : 'border-transparent hover:scale-110'}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Content</label>
            <textarea
              autoFocus
              required
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              placeholder="Type your note here..."
            />
          </div>
          <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
            {editingNote ? 'Save Changes' : 'Create Note'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
