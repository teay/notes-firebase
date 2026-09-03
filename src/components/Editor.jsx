import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function Editor({ note, onUpdate }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: note?.content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();
      const firstLine = text.split('\n')[0]?.trim() || 'Untitled Note';
      
      if (onUpdate) {
        onUpdate(html, firstLine);
      }
    },
  });

  useEffect(() => {
    if (editor && note) {
      if (editor.getHTML() !== note.content) {
        editor.commands.setContent(note.content || '');
      }
    }
  }, [note?.id, editor]);

  if (!editor) return null;

  return (
    <div className="h-full flex flex-col p-6 bg-white">
      <div className="flex gap-2 mb-4 pb-3 border-b border-slate-200">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm font-semibold ${
            editor.isActive('bold') ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm italic ${
            editor.isActive('italic') ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
          }`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 rounded text-sm font-bold ${
            editor.isActive('heading', { level: 1 }) ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
          }`}
        >
          H1
        </button>
      </div>

      <div className="flex-1 overflow-y-auto prose max-w-none focus:outline-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
