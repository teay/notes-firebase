import React from 'react';
import { SquarePen, Trash2, LogIn, LogOut, PanelLeft } from 'lucide-react';

export default function Navbar({ user, onLogin, onLogout, onNewNote, onDeleteNote, activeNoteId, toggleSidebar }) {
  return (
    <div className="h-14 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <button onClick={toggleSidebar} className="p-2 text-iosYellow hover:bg-gray-100 rounded-lg">
          <PanelLeft size={20} />
        </button>
      </div>

      <div className="flex items-center gap-1">
        {user ? (
          <>
            {activeNoteId && (
              <button onClick={onDeleteNote} className="p-2 text-red-500 hover:bg-gray-100 rounded-lg">
                <Trash2 size={20} />
              </button>
            )}
            <button onClick={onNewNote} className="p-2 text-iosYellow hover:bg-gray-100 rounded-lg">
              <SquarePen size={20} />
            </button>
            <button onClick={onLogout} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg ml-2">
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <button onClick={onLogin} className="flex items-center gap-2 px-3 py-1.5 bg-iosYellow text-white rounded-full font-medium text-sm">
            <LogIn size={16} /> Login
          </button>
        )}
      </div>
    </div>
  );
}