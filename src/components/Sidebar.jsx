import React from 'react';

export default function Sidebar({ notes, activeNoteId, onSelectNote, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="w-full md:w-80 bg-iosSidebar border-r border-gray-200 flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="p-3 border-b border-gray-200">
        <h1 className="text-xl font-bold px-2 text-slate-900">Notes</h1>
      </div>
      <div className="overflow-y-auto flex-1 p-2 space-y-1">
        {notes.length === 0 ? (
          <p className="text-center text-gray-400 mt-8 text-sm">No notes found</p>
        ) : (
          notes.map((note) => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = note.content || '';
            const title = tempDiv.innerText.split('\n')[0] || 'New Note';
            const body = tempDiv.innerText.split('\n').slice(1).join(' ') || 'No additional text';

            return (
              <button
                key={note.id}
                onClick={() => onSelectNote(note.id)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  activeNoteId === note.id ? 'bg-iosYellow text-white' : 'hover:bg-gray-200/60'
                }`}
              >
                <div className="font-semibold text-sm truncate">{title}</div>
                <div className={`text-xs truncate mt-0.5 ${activeNoteId === note.id ? 'text-white/80' : 'text-gray-500'}`}>
                  {body}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}