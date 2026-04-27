import { EditorProps } from '../../../types'
import { Type } from 'lucide-react';

const ParagraphButton = ({editor}:EditorProps) => {

    if(!editor) return null;

    const isActive = editor.isActive('paragraph');

  return (
    <button
    onClick={()=>editor?.chain().focus().setParagraph().run()}
    title='Simple text (Ctrl + Alt + 0)'
    disabled={!editor.can().setParagraph()}
    className={`p-2 rounded duration-300 cursor-pointer
         ${isActive 
            ? 'bg-gray-100 text-indigo-400 hover:bg-blue-200' 
            : 'text-gray-700 hover:bg-gray-100'}`}
    >
        <Type className='w-4 h-4 text-bold'/>
    </button>
  )
}

export default ParagraphButton