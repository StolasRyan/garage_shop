import { unstable_cache } from "next/cache";
import { getDB } from "./api-routes";
import { baseUrl } from "./baseUrl";


export interface SiteMetadata {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
} 

export const getSiteMetadata = unstable_cache(async():Promise<SiteMetadata>  =>{
    const defaultMetadata: SiteMetadata = {
        title: 'Garage Shop',
        description: 'Products shop and delivery service',
        keywords: 'garage shop, products, delivery, delivery service',
        ogImage: `${baseUrl}/og-image.jpg`,
    }
    try {
        const db = await getDB();
        const settings = await db.collection('site-settings').findOne({});

        if(!settings){
            return defaultMetadata;
        }

        return{
            title: settings.siteTitle || defaultMetadata.title,
            description: settings.metaDescription || defaultMetadata.description,
            keywords: Array.isArray(settings.semanticCore) ? settings.semanticCore.join(', ') : defaultMetadata.keywords,
            ogImage: `${baseUrl}/og-image.jpg`,
        }
    } catch (error) {
        console.error("Failed to get site metadata from database", error);
        return defaultMetadata;
    }
    
},
['site-metadata'],
{revalidate: 86400}
)