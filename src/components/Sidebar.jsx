import React from 'react';

export default function Sidebar({ notes, activeNoteId, onSelectNote, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="w-full md:w-80 bg-white/60 backdrop-blur-xl border-r border-slate-200/80 flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="p-4 border-b border-slate-100">
        <h1 className="text-lg font-bold px-1 text-slate-800 tracking-tight">My Notes</h1>
        <p className="text-xs text-slate-400 px-1 mt-0.5">{notes.length} note{notes.length !== 1 ? 's' : ''}</p>
      </div>
      <div className="overflow-y-auto flex-1 p-2 space-y-0.5">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400">
            <svg className="w-10 h-10 mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm">No notes yet</p>
          </div>
        ) : (
          notes.map((note) => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = note.content || '';
            const title = tempDiv.innerText.split('\n')[0] || 'New Note';
            const body = tempDiv.innerText.split('\n').slice(1).join(' ').trim() || 'Empty note';
            const date = note.updatedAt?.toDate ? note.updatedAt.toDate() : null;

            return (
              <button
                key={note.id}
                onClick={() => onSelectNote(note.id)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-150 ${
                  activeNoteId === note.id 
                    ? 'bg-gradient-to-r from-iosYellow to-amber-500 text-white shadow-md shadow-amber-200/40' 
                    : 'hover:bg-slate-100/80 text-slate-700'
                }`}
              >
                <div className="font-semibold text-sm truncate leading-tight">{title}</div>
                <div className="flex items-center justify-between mt-1">
                  <div className={`text-xs truncate flex-1 ${activeNoteId === note.id ? 'text-white/80' : 'text-slate-400'}`}>
                    {body}
                  </div>
                  {date && (
                    <span className={`text-[10px] ml-2 flex-shrink-0 ${activeNoteId === note.id ? 'text-white/60' : 'text-slate-400'}`}>
                      {date.toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
