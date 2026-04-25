import { useEditorState } from '@tiptap/react'
import { Redo, Undo } from 'lucide-react';
import React from 'react'
import { EditorProps } from '../../../types';

const HistoryMenu = ({editor}:EditorProps) => {
    const {canUndo = false, canRedo = false } = useEditorState({
        editor,
        selector:(ctx)=>({
            canUndo: ctx.editor?.can().undo() ?? false,
            canRedo: ctx.editor?.can().redo() ?? false
        }),
    }) ?? {};

    if(!editor) return null;
  return (
    <div className='flex items-center gap-1'>
        <button
        type='button'
        onClick={()=>editor.chain().focus().undo().run()}
        disabled={!canUndo}
        className='p-2 rounded hover:bg-gray-200 duration-300 cursor-pointer text-gray-700'
        title='Undo (Ctrl+Z)'
        >
            <Undo className='w-4 h-4 '/>
        </button>
        <button
        type='button'
        onClick={()=>editor.chain().focus().redo().run()}
        disabled={!canRedo}
        className='p-2 rounded hover:bg-gray-200 duration-300 cursor-pointer text-gray-700'
        title='Redo (Ctrl+Y)'
        >
            <Redo className='w-4 h-4 '/>
        </button>
    </div>
  )
}

export default HistoryMenu