import { NextRequest, NextResponse } from "next/server";
import  fs  from 'fs/promises';
import path from "path";


export async function POST(request:NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;
        const categorySlug = formData.get('categorySlug') as string;

        if(!file){
            return NextResponse.json(
                {error: "No file uploaded"},
                {status: 400}
            )
        };

        const categoryFolder = categorySlug.trim() || 'uncategorized'; 

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const originalName = file.name;
        const baseName = originalName.replace(/\.[^/.]+$/, "");
        const cleanName = baseName
        .toLowerCase()
        .replace(/[^a-zа-яё0-9]+/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_+|_+$/g,'');

        const timestamp = Date.now();
        const safeName = cleanName || 'image';

        const originalExtension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `${safeName}_${timestamp}.${originalExtension}`;

        const publicDir = path.join(process.cwd(), 'public', 'articles', categoryFolder);
        
        await fs.mkdir(publicDir, {recursive: true});
 
        const filePath = path.join(publicDir, fileName);
        await fs.writeFile(filePath, buffer);

        const publicUrl = `/articles/${categoryFolder} /${fileName}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            fileName: fileName,
            category: categoryFolder
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
        const category = searchParams.get('categorySlug');

        if(!fileName){
            return NextResponse.json({error: "No file name provided"}, {status: 400});
        }
        if(!category){
            return NextResponse.json({error: "No category provided"}, {status: 400});
        }

        const categoryFolder = category.trim();

        const publicDir = path.join(process.cwd(), 'public', 'articles', categoryFolder);
        const filePath = path.join(publicDir, fileName);
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