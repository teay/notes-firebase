import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth, googleProvider, signInWithPopup, signOut } from './firebase';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setNotes([]);
      setActiveNoteId(null);
      return;
    }

    const q = query(
      collection(db, 'notes'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      notesData.sort((a, b) => {
        const timeA = a.updatedAt?.toMillis() || 0;
        const timeB = b.updatedAt?.toMillis() || 0;
        return timeB - timeA;
      });

      setNotes(notesData);
      
      if (notesData.length > 0 && !activeNoteId) {
        setActiveNoteId(notesData[0].id);
      }
    });

    return () => unsubscribe();
  }, [user, activeNoteId]);

  const handleCreateNote = async () => {
    if (!user) return;
    try {
      const docRef = await addDoc(collection(db, 'notes'), {
        userId: user.uid,
        content: '<p></p>',
        title: 'Untitled Note',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setActiveNoteId(docRef.id);
    } catch (error) {
      console.error("Error creating note: ", error);
    }
  };

  const handleUpdateNote = async (updatedContent, title) => {
    if (!activeNoteId) return;
    try {
      const noteRef = doc(db, 'notes', activeNoteId);
      await updateDoc(noteRef, {
        content: updatedContent,
        title: title || 'Untitled Note',
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating note: ", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteDoc(doc(db, 'notes', noteId));
      if (activeNoteId === noteId) {
        setActiveNoteId(null);
      }
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-[#fdfbf7]">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#fdfbf7] gap-4">
        <h1 className="text-2xl font-bold">Notes Firebase</h1>
        <button 
          onClick={() => signInWithPopup(auth, googleProvider)}
          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  const activeNote = notes.find((n) => n.id === activeNoteId);

  return (
    <div className="flex h-screen bg-[#fdfbf7] overflow-hidden">
      <Sidebar 
        notes={notes} 
        activeNoteId={activeNoteId} 
        setActiveNoteId={setActiveNoteId} 
        onCreateNote={handleCreateNote}
        onDeleteNote={handleDeleteNote}
        user={user}
        onSignOut={() => signOut(auth)}
      />
      <main className="flex-1 h-full overflow-y-auto">
        {activeNote ? (
          <Editor 
            key={activeNote.id} 
            note={activeNote} 
            onUpdate={handleUpdateNote} 
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <p>No note selected</p>
            <button 
              onClick={handleCreateNote} 
              className="mt-2 text-amber-600 underline font-medium"
            >
              Create a note
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
