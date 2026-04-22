import { baseUrl } from "@/utils/baseUrl";
import { BlogCategory } from "../categories/types/categories.types";

export async function getCategories():Promise<BlogCategory[]>{
    try {
        const response = await fetch(`${baseUrl}/api/blog/categories`,
            {
                cache:'force-cache',
                next:{
                    tags:['categories'],
                    revalidate: 3600
                }
            }
        );

        if(!response.ok){
            console.error("HTTP error", response.status);
            return [];
        };

        const data = await response.json();
        
        if(data.success){
            return data.data;
        }

        console.error("Failed to get blog categories", data);
        return [];
    } catch (error) {
        console.error("Failed to get blog categories", error);
        return [];
    }
}