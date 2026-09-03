import React from 'react';
import { SquarePen, Trash2, LogIn, LogOut, PanelLeft, Sun, Moon } from 'lucide-react';

export default function Navbar({ user, onLogin, onLogout, onNewNote, onDeleteNote, activeNoteId, toggleSidebar, darkMode, setDarkMode }) {
  return (
    <div className="h-14 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleSidebar} 
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-150 hover:scale-105 active:scale-95"
        >
          <PanelLeft size={20} />
        </button>
        <div className="hidden md:flex items-center gap-1.5 ml-2">
          <div className="w-7 h-7 bg-gradient-to-br from-iosYellow to-amber-500 rounded-lg flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Notes</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {user ? (
          <>
            {activeNoteId && (
              <button 
                onClick={onDeleteNote} 
                className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-150 hover:scale-105 active:scale-95"
              >
                <Trash2 size={18} />
              </button>
            )}
            <button 
              onClick={onNewNote} 
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-150 hover:scale-105 active:scale-95"
            >
              <SquarePen size={18} />
            </button>
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-150 hover:scale-105 active:scale-95"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <div className="flex items-center gap-2">
              {user.photoURL && (
                <img 
                  src={user.photoURL} 
                  alt="" 
                  className="w-7 h-7 rounded-full ring-2 ring-slate-200 dark:ring-slate-700"
                />
              )}
              <button 
                onClick={onLogout} 
                className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-150"
              >
                <LogOut size={18} />
              </button>
            </div>
          </>
        ) : (
          <button 
            onClick={onLogin} 
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-iosYellow to-amber-500 text-white rounded-full font-medium text-sm shadow-md shadow-amber-200/50 hover:shadow-lg hover:shadow-amber-300/50 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <LogIn size={16} /> Sign In
          </button>
        )}
      </div>
    </div>
  );
}
