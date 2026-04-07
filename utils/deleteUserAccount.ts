export const deleteUserAccount = async(userId: string)=>{
    try {
        const response = await fetch('/api/auth/delete-account',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({userId})
        });
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete account.")
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to delete account.", error);
        throw error;
    }
}