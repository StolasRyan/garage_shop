'use client'

import IconStar from "@/app/components/svg/IconStar";
import { useAuthStore } from "@/store/authStore";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";

interface AddReviewFormProps{
    productId:string;
    onReviewAdded:()=>void
}

const AddReviewForm = ({productId,onReviewAdded}:AddReviewFormProps) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating]=useState(0)
    const [comment, setComment]=useState('')
    const [submitting, setSubmitting]=useState(false)
    const [error, setError]=useState('')
    const [showValidationError, setShowValidationError]=useState(false)
    const {user} = useAuthStore();

    const isFormValid = rating > 0 && comment.trim().length > 0;

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();

        if(!user){
            setError("Autorse please");
            return
        }

        if(!isFormValid){
            setShowValidationError(true);
            return
        }

        setSubmitting(true);
        setError('')
        setShowValidationError(false);

        try {
            const response = await fetch(`/api/products/${productId}/reviews`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    rating,
                    comment,
                    userId: user.id,
                    userName: user.name
                })
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || 'Failed to send review')
            }
            setComment('')
            setRating(0)
            onReviewAdded()
        } catch (error) {
            const errorMessage = 
            error instanceof Error ? error.message : 'Failed to send review';
            setError(errorMessage)
            console.error('Failed to send review:', error)
        }finally{
            setSubmitting(false)
        }
    }
  return (
    <div className="mt-10">
        <form onSubmit={handleSubmit}>
            <div className="mb-4.5 flex flex-row gap-x-4 items-center">
                <label className="text-lg font-bold">Yours grade</label>
                <div className="flex items-center mt-3">
                {[1,2,3,4,5].map((star)=>(
                    <button
                    key={star}
                    type="button"
                    onClick={()=>{
                        setRating(star);
                        setShowValidationError(false)
                    }}
                    onMouseEnter={()=>setHoverRating(star)}
                    onMouseLeave={()=>setHoverRating(0)}
                    className="cursor-pointer hover:scale-110 transition-transform mr-1"
                    >
                        <IconStar
                        size={24}
                        fillPercentage={
                            hoverRating >= star ? 100 :
                            rating >= star ? 100 : 0
                        }
                        />
                    </button>
                ))}
                </div>
            </div>
            <div className="w-full max-w-136 mb-5">
                <div className="mb-4">
                    <textarea 
                    id="comment"
                    value={comment}
                    onChange={(e)=>{
                        setComment(e.target.value);
                        setShowValidationError(false)
                    }}
                    rows={4}
                    className="w-full max-w-136 bg-white px-4 py-2 border border-gray-300 rounded"
                    placeholder="Review"
                    style={{resize:'vertical'}}
                    />
                </div>
                {showValidationError && (
                    <div className="text-red-600 text-sm p-2 bg-red-200 rounded mb-2">
                        Leave rate and review Please.
                    </div>
                )}
                {error &&(
                    <div className="text-red-600 text-sm p-2 bg-red-200 rounded mb-2">
                        {error}
                    </div>
                )}
            </div>
            <button
            type="submit"
            disabled={submitting}
            className={`${
                submitting ? 'cursor-not-allowed bg-primary/70 text-primary'
                : 'text-base bg-primary text-white hover:shadow-(--shadow-article)'
            } w-47 p-2 flex items-center justify-center rounded duration-300 cursor-pointer`}
            >
                {submitting 
                ? <span className="flex flex-row items-center justify-center gap-x-4"><Loader2 className="w-4 h-4 text-primary mr-4"/><p>Sending...</p></span>
                : <span className="flex flex-row items-center justify-center gap-x-4"><Send className="w-4 h-4 text-white mr-4"/><p>Send</p></span>
            }
            </button>
        </form>
    </div>
  )
}

export default AddReviewForm