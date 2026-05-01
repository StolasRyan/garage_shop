import { baseUrl } from "@/utils/baseUrl";
import { ArticlePageData } from "../../types";

export async function fetchArticlePageData(
    categorySlug: string,
    articleSlug: string
):Promise<ArticlePageData | {error: string}>{
    try {
        const response = await fetch(`${baseUrl}/api/blog/${categorySlug}/${articleSlug}`,
            {
                cache: 'no-store',
                headers:{
                    "Cache-Control": "no-cache"
                }
            }
        );

        if(!response.ok){
            const errorData= await response.json().catch(() => ({}));
            if(response.status === 404){
                return {error: errorData.error || 'Article not found'}
            }
            return {error: errorData.error || `Error ${response.status}`}
        }
        const data:ArticlePageData = await response.json();
        return data
    } catch (error) {
        console.error(`Failed to fetch artcles category: ${error}`);
        return {error: 'Network error'}
    }
}