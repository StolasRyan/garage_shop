import { NextRequest, NextResponse } from "next/server";
import  fs  from 'fs/promises';
import path from "path";


export async function POST(request:NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if(!file){
            return NextResponse.json(
                {error: "No file uploaded"},
                {status: 400}
            )
        };


        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const originalName = file.name;
        const originalExtension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        const fileName = `${timestamp}-${random}.${originalExtension}`;

        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'articles');

        await fs.mkdir(uploadDir, {recursive: true});

        const filePath = path.join(uploadDir, fileName);
        await fs.writeFile(filePath, buffer);

        const publicUrl = `/uploads/articles/${fileName}`;


       
        return NextResponse.json({
            success: true,
            url: publicUrl,
            fileName: fileName,
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Error uploading image' }, { status: 500 });
    }
}

export async function DELETE(request:NextRequest) {
    try {
        const {searchParams} = new URL(request.url);
        const fileName = searchParams.get('file');

        if(!fileName){
            return NextResponse.json({error: "No file name provided"}, {status: 400});
        }
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'articles');
        const filePath = path.join(uploadsDir, fileName);
        
        

     
        try {
             await fs.access(filePath);
             await fs.unlink(filePath);

             return NextResponse.json({success: true, message: "File deleted successfully"});
        } catch {
            return NextResponse.json({error: "File not found"}, {status: 404});
        }
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json({ error: 'Error deleting image' }, { status: 500 });
    }
}