import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    _request:NextRequest,
    {params}:{params:Promise<{id:string}>}
){
try {
    const {id} = await params;
    const db = await getDB();

    const user = await db.collection('user').findOne(
        {_id: new ObjectId(id)},
        {projection:{gender:1, name:1, surname:1}}
    );

    if(!user){
        return NextResponse.json(
            {error:'User not found'},
            {status:404}
        );
    }

    return NextResponse.json({
        gender:user.gender,
        fullName:`${user.name} ${user.surname}`
    })
} catch (error) {
    console.error('Failed to fetch user', error);
    return NextResponse.json(
        {error:'Server Error'},
        {status:500}
    );
}
}