import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { Category } from "../../types";
import { CONFIG_BLOG } from "../../CONFIG_BLOG";


export async function GET(request: Request) {
   try {
     const db = await getDB();
     const {searchParams} =  new URL(request.url);

     const page = parseInt(searchParams.get('pageToLoad') || '1');
     const limit = parseInt(searchParams.get('limit') || CONFIG_BLOG.ITEMS_PER_PAGE.toString());

     const validPage = Math.max(page, 1);
     const validLimit = Math.max(1, Math.min(limit, 100));

     const skip = (validPage - 1) * validLimit;

    const categories = await db.collection<Category>('article-category').find().skip(skip).limit(validLimit).toArray();
    
    const totalInDb = await db.collection<Category>('article-category').countDocuments({});

    const totalPages = Math.ceil(totalInDb / validLimit); //!!!!!

    const response = {
        success:true,
        data:{
            categories: categories.map((c)=>({
                ...c,
                _id: c._id.toString()
            })),
            totalInDb,
            pagination:{
                page: validPage,
                limit: validLimit,
                total: totalInDb, //!!!
                totalAll: totalInDb,
                totalPages 
            }
        }
    }
    return NextResponse.json(response);
   } catch (error) {
    console.error('Error loading categories', error);
    return NextResponse.json({error:'Error loading categories'}, {status:500});
   }
}

export async function POST(request:Request) {
    try {
        const data: Category = await request.json();

        console.log(data);
        

        if(!data.name?.trim()){
            return NextResponse.json(
                {success: false, message:'Category name is required'},
                {status: 400}
            )
        }

        if(!data.slug?.trim()){
            return NextResponse.json(
                {success: false, message:'Category slug is required'},
                {status: 400}
            )
        }

        const name = data.name.trim();
        const slug = data.slug.trim().toLowerCase();

        const db = await getDB();

        const existingCategory = await db.collection<Category>('article-category').findOne({slug});

        if(existingCategory){
            return NextResponse.json(
                {success: false, message:'Category already exists'},
                {status: 400}
            )
        }

        const result = await db.collection('article-category').aggregate([
            {
                $group:{
                    _id:null,
                    maxNumericId:{$max:"$numericId"}
                }
            }
        ]).toArray();

        let maxNumericId = 0;
        if(result.length > 0 &&
            result[0].maxNumericId !== null &&
            result[0].maxNumericId !== undefined
        ){
            maxNumericId = result[0].maxNumericId;
        };

        const newNumericId = maxNumericId + 1;

        const newCategory = {
            _id: new ObjectId(),
            numericId: newNumericId,
            name,
            slug,
            description: data.description?.trim() || '',
            keywords: data.keywords || [],
            image: data.image || '',
            imageAlt: data.imageAlt || '',
            author: data.author || 'Unknown',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        await db.collection('article-category').insertOne(newCategory);

        const responseCategory: Category = {
            ...newCategory,
            _id: newCategory._id.toString()
        }

        return NextResponse.json({
            success: true,
            message: 'Category created successfully',
            data: responseCategory
        })
    } catch (error) {
        console.error("Failed to create category", error);
        return NextResponse.json(
            {success: false, message:'Failed to create category', error: error instanceof Error ? error.message : 'Unexpected error'},
            {status: 500}
        )
    }
}