'use server';
import { getDB } from "@/utils/api-routes";
import { ObjectId } from "mongodb";

export async function acceptRules(userId:string) {
    try {
        const db = await getDB();

        await db.collection("user").updateOne(
            {_id: new ObjectId(userId)},
            {$set: {rulesAcceptedAt: new Date()}}
        )
        return {success: true}
    } catch (error) {
        console.error('Failed to accept rules', error);
        return {succes: false, error: 'Failed to accept rules'}
    }
}

export async function checkRulesAccepted(userId:string):Promise<boolean> {
    try {
        const db = await getDB();

        const user = await db.collection('user').findOne(
            {_id: new ObjectId(userId)},
            {projection: {rulesAcceptedAt: 1}}
        );
        return !!user?.rulesAcceptedAt;
    } catch (error) {
        console.error('Failed to check rules', error);
        return false;
    }
}