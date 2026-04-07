import { getDB } from "@/utils/api-routes";
import { GridFSBucket, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    {params}:{params: Promise<{userId:string}>}
){
    try {
        const {userId} = await params;

        const db = await getDB();

        const bucket = new GridFSBucket(db, {bucketName: 'avatars'});

        if(!userId){
            return NextResponse.json({error: 'No user ID'}, {status: 400})
        }
        
        let userIdObjectId;
        try {
            userIdObjectId = new ObjectId(userId)
        }catch{
          return NextResponse.json(
            {error:'Incorrect format of User ID'},
            {status: 400}
          )  
        }

        const fileExists = await db.collection('avatars.files').findOne({
            'metadata.userId': userIdObjectId
        });

        if(!fileExists){
            return NextResponse.json({error:'Avatar didnt found'}, {status: 404})
        }

        const downloadStream = bucket.openDownloadStream(fileExists._id)

        const chunks:Buffer[]=[];

        for await(const chunk of downloadStream){
            chunks.push(chunk)
        };

        if(chunks.length === 0){
            return NextResponse.json(
                {error: 'Avatars file is empty.'},
                {status: 404}
            )
        }

        const buffer = Buffer.concat(chunks);

        return new Response(buffer, {
      status: 200, 
      headers: {
        "Content-Type": fileExists.contentType || "image/jpeg", // MIME-тип файла или image/jpeg по умолчанию
        "Content-Length": buffer.length.toString(), // Размер файла в байтах
        "Cache-Control": "no-cache, no-store, must-revalidate", // Запрет кэширования
        Pragma: "no-cache", // Совместимость с HTTP/1.0
        Expires: "0", // Срок действия кэша
      },
        })

    } catch {
        return NextResponse.json(
            {error: 'Error while getting avatar'},
            {status: 500}
        )
    }
}