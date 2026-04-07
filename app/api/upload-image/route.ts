import   fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server"
import path from "path";



export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const image = formData.get('image') as File;
        const imageId = formData.get('imageId') as string;

        if(!image){
            return NextResponse.json({error: "File is not downloaded"}, {status: 400});
        }

        if(!imageId){
            return NextResponse.json({error: "Image ID is not provided"}, {status: 400});
        }

        if(!image.type.includes('image')){
            return NextResponse.json({error: "File is not an image"}, {status: 400});
        }

        if(image.size > 5 * 1024 * 1024){
            return NextResponse.json({error: "File size is too large. Max size is 5MB"}, {status: 400});
        }

        const fileName = `img-${imageId}.jpeg`;
        const imagePath = `/images/products/${fileName}`;
        const publicDir = path.join(process.cwd(), 'public');
        const imagesDir = path.join(publicDir, 'images', 'products');
        const fullPath = path.join(imagesDir, fileName);

        try {
            await fs.access(imagesDir)
        } catch {
            await fs.mkdir(imagesDir, {recursive: true});
        }

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(fullPath, buffer);

        return NextResponse.json({success: true, product: {id: parseInt(imageId),img: imagePath, fileName: fileName }});
    } catch (error) {
        console.error("Error while uploading image", error);
        return NextResponse.json({error: "Failed to upload image"}, {status: 500});
    }
}