import { GridFSBucket, ObjectId } from "mongodb";
import { getDB } from "./api-routes";

export async function deleteUserAvatarFromGridFS(userId:string) {
    try {
        const db = await getDB()
        const bucket = new GridFSBucket(db, {bucketName: 'avatars'});
        const userObjectId = new ObjectId(userId);

        const avatarFile = await db.collection('avatars.files').findOne({
            "metadata.userId": userObjectId
        });
        if(avatarFile){
            await bucket.delete(avatarFile._id);
            console.log(`Users ${userId} avatar deleted after account removing.`)
        }
    } catch (error) {
        console.error("Failed to delete avavtar:", error)
    }
}