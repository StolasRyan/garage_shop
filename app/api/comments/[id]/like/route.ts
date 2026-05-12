import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    
    try {
        const {id} = await params;
        const {userId} = await request.json();

        console.log(id, userId);
        

        if(!userId){
            return NextResponse.json(
                {error: "User ID is required"},
                {status: 400}
            );
        }

        const db = await getDB();
        const commentId = new ObjectId(id);

        console.log(commentId);
        

        const comment = await db.collection("comments").findOne({ _id: commentId });

        if(!comment){
            return NextResponse.json(
                {error: "Comment not found"},
                {status: 404}
            );
        }

        const likes = comment.likes || [];
        
        
        const hasLiked = likes.includes(userId);
;
        //const hasLiked = likes.some(like => like.userId === userId.userId);
       

        let newLikes;
        if(hasLiked){
            newLikes = likes.filter((likeUserId:string) => likeUserId !== userId);
        }else{
            newLikes = [...likes, userId];
        }

        await db.collection("comments").updateOne(
            {_id: commentId},
            {$set: {likes: newLikes}}
        );
        return NextResponse.json({liked: !hasLiked, likeCount: newLikes.length});
    } catch (error) {
        console.error('Error liking comment', error);
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        );
    }

}