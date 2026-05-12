import { CommentEditFormProps } from "@/app/(blog)/blog/types";
import { Save, X } from "lucide-react";
import React, { useState } from "react";

const CommentEditForm = ({
  commentId,
  initialContent,
  userId,
  onSuccess,
  onCancel,
}: CommentEditFormProps) => {
    const [content, setContent] = useState(initialContent);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();

        if(!content.trim()){
            setError('Comment cannot be empty');
            return;
        }

        if(content === initialContent){
            onCancel();
            return;
        }

        try {
            setSubmitting(true);
            setError('');

            const response = await fetch(`/api/comments/${commentId}`, {
                method: "PATCH",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({
                    content: content.trim(),
                    userId
                })
            })
            if(!response.ok){
                const data = await response.json();
                throw new Error(data.error || 'Failed to update comment');
            }

            const data = await response.json();
            onSuccess(data.content, data.editedAt);
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Failed to update comment",)
        }finally{
            setSubmitting(false);
        }
    }
  return (
    <form onSubmit={handleSubmit} className="mt-2">
        {error && (
            <div className="mb-2 p-2 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
                {error}
            </div>
        )}

        <textarea 
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        className="w-full px-3 -y-2 border border-gray-300 rounded focus:ring-2 focus:ring-lime-400 focus:border-lime-500 outline-none transition-all resize-none text-sm"
        rows={3}
        maxLength={1000}
        disabled={submitting}
        autoFocus
        />

        <div className="flex justify-end items-center gap-2 mt-2">
            <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 cursor-pointer duration-300"
            >
                <X className="w-4 h-4" />
                Cancel
            </button>

            <button
            type="submit"
            disabled={submitting || !content.trim() || content === initialContent}
            className="px-3 py-1.5 text-sm bg-lime-500 hover:bg-lime-600 text-white rounded flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 duration-300"
            >
                <Save className="w-4 h-4" />
                {submitting ? "Saving..." : "Save changes"}
            </button>
        </div>
    </form>
  )
};

export default CommentEditForm;
