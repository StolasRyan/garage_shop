"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TiptapEditorProps } from "../../../types";
import TextAlign from "@tiptap/extension-text-align";
import FileHandler from '@tiptap/extension-file-handler';
import Image from "@tiptap/extension-image";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { TableKit } from "@tiptap/extension-table";
import { Loader2, Upload } from "lucide-react";
import { CharacterCount, Placeholder } from "@tiptap/extensions";
import Counter from "./Counter";
import { useState } from "react";
import MainToolbar from "./MainToolbar";
import "../css/editor.css";
import { AllowHtmlAttributes } from "./AllowHtmlAttributes";
import { handleImageUpload } from "../../../utils/upload-image";

const TiptapEditor = ({ content, onContentChange }: TiptapEditorProps) => {
  const [showDragIcon, setShowDragIcon] = useState(false);
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
        types: ["heading", "paragraph"],
      }),
      TextStyleKit.configure({
        fontSize: {
          types: ["heading", "paragraph", "textStyle"],
        },
      }),
      AllowHtmlAttributes,
      TableKit,
      Image.configure({
        // resize:{
        //   enabled: true,
        //   directions:[
        //     'top',
        //     'bottom',
        //     'left',
        //     'right',
        //     'top-left',
        //     'top-right',
        //     'bottom-left',
        //     'bottom-right'
        //   ],
        //   minWidth: 50,
        //   minHeight: 50,
        //   alwaysPreserveAspectRatio: false,
        // },
        allowBase64: true,
        HTMLAttributes:{
            class: 'tiptap-image'
        }
      }),
      FileHandler.configure({
        allowedMimeTypes: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ],

        onDrop: async (currentEditor, files) => {
          if (!currentEditor) return;

          for (const file of files) {
            await handleImageUpload(file, currentEditor);
          }
        },

        onPaste: (currentEditor, files, htmlContent) => {
          if (!currentEditor) return;

          if (htmlContent && htmlContent.includes("<img")) {
            return false;
          }

          if (htmlContent && htmlContent.includes("<img")) {
            return false;
          }

          if (files.length > 0) {
            files.forEach(async (file) => {
              await handleImageUpload(file, currentEditor);
            });
            return true;
          }

          return false;
        },
      }),
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
      <MainToolbar editor={editor}  onImageDragOverChange={setShowDragIcon}/>
      <div className="bg-white relative">
        <EditorContent
          editor={editor}
          className="min-h-100 p-4 focus:outline-none"
        />
        {showDragIcon && (
          <div
            key="drag-overlay"
            className="absolute inset-0 bg-blue-50/95 border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center z-50 pointer-events-none animate-in fade-in-0 zoom-in-95 duration-150"
          >
            <div className="text-center p-8 bg-white/80 rounded-xl shadow-lg animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
              <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-bounce" />
              <p className="text-blue-700 font-semibold text-lg mb-1">
                Drop image here
              </p>
              <p className="text-blue-500 text-sm">
                File will be uploaded to editor
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
        <Counter wordCount={stats.words} charCount={stats.characters} />
      </div>
    </div>
  );
};

export default TiptapEditor;
