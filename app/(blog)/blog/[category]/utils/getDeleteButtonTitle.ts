import { UserRole } from "../../types";

export const getDeleteButtonTitle = (
    currentUserId: string,
    currentUserRole: UserRole,
    authorId: string
):string=>{
    if(currentUserId === authorId) return 'Delete yours comment';
    if(currentUserRole === 'admin') return 'Delete by admin';
    if(currentUserRole === 'manager') return 'Delete by manager';
    return 'Delete comment';
}