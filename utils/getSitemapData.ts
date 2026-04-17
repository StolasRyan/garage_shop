import { SitemapDataResponse } from "@/types/sitemap";
import { baseUrl } from "./baseUrl";

export async function getSitemapData():Promise<SitemapDataResponse> {
    try {
        const response = await fetch(`${baseUrl}/api/sitemap-data`);

        if(!response.ok){
            throw new Error(`HTTP Error: ${response.status}`)
        }
        const data:SitemapDataResponse = await response.json();
        return data
    } catch (error) {
        console.error('Error while fetching sitemap data', error)
        throw error
    }
}