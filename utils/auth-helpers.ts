import { auth } from "@/app/lib/auth";
import { getDB } from "./api-routes";
import { ObjectId } from "mongodb";

export async function getBetterAuthSession(headers: Headers){
    try {
        return await auth.api.getSession({headers});
    } catch (error) {
        console.error("Better-Auth session check failed", error)
        return null;
    }
};

export function getCustomSessionToken(cookieHeader: string|null):string | null{
    const cookies = (cookieHeader || '').split(';').map((c)=>c.trim());
    console.log(cookies.find((c)=>c.startsWith('session='))?.split('=')[1]);
    
    return cookies.find((c)=>c.startsWith('session='))?.split('=')[1] || null;
}

export async function validateCustomSession(sessionToken:string) {
    const db = await getDB();

    const session = await db.collection('session').findOne({token: sessionToken});
    console.log('looking for token:', sessionToken);
    console.log('session from db:', session);

    return !!session && new Date(session.expiresAt) > new Date()
}

export async function getUserById(userId: string) {
    const db = await getDB();
    const user = await db.collection('user').findOne({ _id: new ObjectId(userId) });

    if(!user) return null;

    return{
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        emailVerified: user.emailVerified,
        phoneNumberVerified: user.phoneNumberVerified,
        gender: user.gender, 
        birthdayDate: user.birthdayDate,
        location: user.location,
        region: user.region,
        card: user.card,
        role: user.role
    }
}

export async function getValidCustomSession(sessionToken: string){
    const db =await getDB();
    const session = await db.collection('session').findOne({token: sessionToken});
    if (!session || new Date(session.expiresAt) < new Date()) return null;
    return session;
}