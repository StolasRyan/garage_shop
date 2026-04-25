"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TiptapEditorProps } from "../../../types";
import TextAlign from '@tiptap/extension-text-align'
import { TextStyleKit } from '@tiptap/extension-text-style';
import {TableKit} from '@tiptap/extension-table'
import { Loader2 } from "lucide-react";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import Counter from "./Counter";
import { useState } from "react";
import MainToolbar from "./MainToolbar";
import "../css/editor.css";
import { AllowHtmlAttributes } from "./AllowHtmlAttributes";

const TiptapEditor = ({ content, onContentChange }: TiptapEditorProps) => {
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ undoRedo: { depth: 500, newGroupDelay: 100 } }),
      CharacterCount,
      Placeholder.configure({
        placeholder: "Write article content at here …",
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyleKit.configure({
          fontSize:{
            types: ['heading','paragraph', 'textStyle'],
          }
      }),
      AllowHtmlAttributes,
      TableKit
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onContentChange(html);

      const characters = editor.storage.characterCount.characters();
      const words = editor.storage.characterCount.words();
      setStats({
        words,
        characters,
      });
    },
  });

  if (!editor) {
    return (
      <div className="border border-gray-300 rounded-lg p-3">
        <div className="min-h-50 bg-gray-50 rounded p-3 flex flex-col justify-center items-center">
          <Loader2 className="h-8 w-8 text-gray-400 animate-spin mb-3" />
          <div className="text-gray-500 text-sm">Initialising editor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg">
      <MainToolbar editor={editor} />
      <div className="bg-white">
        <EditorContent
          editor={editor}
          className="min-h-100 p-4 focus:outline-none"
        />
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
        <Counter wordCount={stats.words} charCount={stats.characters} />
      </div>
    </div>
  );
};

export default TiptapEditor;
