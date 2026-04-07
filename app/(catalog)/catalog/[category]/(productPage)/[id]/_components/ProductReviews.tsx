'use client'

import ErrorComponent from "@/app/components/ErrorComponent";
import StarRaiting from "@/app/components/StarRaiting";
import { UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";


interface Review{
    _id: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    userName:string;
};

interface ProductReviewsProps{
    productId: string;
    refreshKey?: number;
}

const ProductReviews = ({productId,refreshKey=0}:ProductReviewsProps) => {

    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{error: Error, userMessage: string} | null>(null);

    const fetchReviews = async()=>{
        try {
            setLoading(true);
            const response = await fetch(`/api/products/${productId}/reviews`);

            if(!response.ok){
                throw new Error('Failed to upload Reviews')
            }

            const data = await response.json();
            setReviews(data)
        } catch (error) {
            setError({
                error: error instanceof Error ? error : new Error("Unknown error"),
                userMessage: 'Failed to upload Reviews'
            })
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchReviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[productId, refreshKey])

    if(loading){
        return(
            <div>
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_,i)=>(
                        <div key={i} className="p-4 bg-gray-100 rounded-lg">
                            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
                            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if(error){
        return <ErrorComponent error={error.error} userMessage={error.userMessage}/>
    }

  return (
    <div>
        <h2 className="text-xl font-bold mb-4">Reviews:</h2>
        {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet. Be first.</p>
        ):(
            <div className="flex flex-col gap-y-10">
                {reviews.map((review)=>{
                    const userName = review.userName || 'Unknown user';
                    return(
                        <div key={review._id}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="rounded-[47px] border border-gray-200 p-2.5 w-9 h-9 flex items-center">
                                    <UserCircle2 className="w-8 h-8"/>
                                </div>
                                <span className="text-lg">{userName}</span>
                            </div>
                            
                            <div className="lex flex-row items-center gap-x-4 mb-2">
                                <StarRaiting rating={review.rating}/>
                                <span className="text-gray-300 text-xs">
                                    {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                                </span>
                            </div>
                            <p className="text-gray-600 text-base">{review.comment}</p>
                        </div>
                    )
                })}
            </div>
        )}
    </div>
  )
}

export default ProductReviews;