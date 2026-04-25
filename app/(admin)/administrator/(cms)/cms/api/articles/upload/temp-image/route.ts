import {writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";


export async function POST(request: NextRequest){
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if(!file){
            return NextResponse.json(
                {error: "No file selected"},
                {status: 400}
            )
        };

        if(!file.type.startsWith('image/')){
            return NextResponse.json(
                {error: "File is not an image"},
                {status: 400}
            )
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const originalName = file.name.replace(/\.[^/.]+$/, "");
        const extension = path.extname(file.name).toLowerCase();

        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

        if(!allowedExtensions.includes(extension)){
            return NextResponse.json(
                {error: "File type is not allowed, Allowed types: JPG, JPEG, PNG, WEBP"},
                {status: 400}
            )
        }

        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 9);
        const filename = `temp_${timestamp}_${random}${extension}`;

        const uploadDir = path.join(process.cwd(), 'public', 'temp');
        const filepath = path.join(uploadDir, filename);

        await mkdir(uploadDir, { recursive: true });

        await writeFile(filepath, buffer);

        const url = `/temp/${filename}`;

        return NextResponse.json({success:true,url, filename, originalName, fullOriginalName: file.name, size: file.size});
    } catch (error) {
        console.error('Error uploading image', error);
        return NextResponse.json({ error: 'Error uploading image', message: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}