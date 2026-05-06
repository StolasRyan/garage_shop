import { ApiResponse, ArticleData, GenerationRequest, ImageGenerationResult, ProgressCallback } from "../types/auto-generate.types";
import { insertImagesIntoArticle } from "./insertImages";

const testApiConnection = async():Promise<boolean>=>{
    try {
        const response = await fetch("/administrator/cms/api/articles/yandex-image",{
            method:'POST',
            headers:{'Content-Type': 'application/json',"Accept": "application/json"},
            body:JSON.stringify({
                prompt:"Test connection: simple geometric shape",
                aspect_ratio:"1:1",
                style:'photo'
            })
        });

        if(!response.ok){
            return false
        }

        const data: ApiResponse = await response.json();
        return !!data.operationId
    } catch (error) {
        console.error("Failed to test API connection", error);
        return false;
    }
};

const pollImageGeneration = async(operationId:string, maxAttempts = 30):Promise<string>=>{
    for(let attemp = 1; attemp <= maxAttempts; attemp++){
        try {
            const response = await fetch(`/administrator/cms/api/articles/yandex-image?operationId=${operationId}`)
            const data: ApiResponse = await response.json();
            
            if(data.done && data.imageUrl){
                return data.imageUrl;
            }

            if(data.error){
                console.error("Generation error", data.error);
                throw new Error(data.error);
            }

            await new Promise((resolve) => setTimeout(resolve, 3000));
        } catch (error) {
            if(attemp === maxAttempts){
                throw error;
            }
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
    throw new Error("Image generation timed out"); 
}

const generateSingleImage = async(
    prompt:string,
    aspectRatio: '16:10' | '1:1' | '21:9',
):Promise<string>=>{
    try {
        const requestData: GenerationRequest = {
            aspect_ratio: aspectRatio,
            prompt,
            style:'photo'
        }
        const response = await fetch("/administrator/cms/api/articles/yandex-image",{
            method:"POST",
            headers:{'Content-Type': 'application/json',"Accept": "application/json"},
            body:JSON.stringify(requestData)
        })

        if(!response.ok){
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        if(!data.operationId){
            throw new Error(data.error || 'No operation ID');
        }
        return await pollImageGeneration(data.operationId);
    } catch (error) {
        console.error("Failed to generate image", error);
        throw error;
    }
}


export const generateArticlesImages = async(
    topic:string,
    articleData:ArticleData,
    onProgress:ProgressCallback
):Promise<ImageGenerationResult>=>{
    if(!articleData.content){
        throw new Error("Article content is empty, cannot generate image");
    }

    const apiAvaileble = await testApiConnection();

    if(!apiAvaileble){
        throw new Error("API is not available");
    }

    try {
        const imgPrompts = {
      main: `Высококачественное профессиональное фото для статьи "${topic}". Редакционный стиль, отличное освещение, резкий фокус, реалистичность, соотношение сторон 16:10.`,
      middle: `Фотореалистичная визуализация для статьи о "${topic}". Концептуальное фото, информативное, детализированное, квадратный формат, профессиональная фотография.`,
      end: `Фотореалистичное заключительное изображение для статьи о "${topic}". Эпичная фотография, широкая панорама, кинематографический формат, эффектная композиция.`,
    };

    if(onProgress) onProgress(1, 'main image');
    const mainImageUrl = await generateSingleImage(imgPrompts.main, '16:10');

    if(onProgress) onProgress(2, 'middle image');
    const middleImageUrl = await generateSingleImage(imgPrompts.middle, '1:1');

    if(onProgress) onProgress(3, 'final image');
    const endImageUrl = await generateSingleImage(imgPrompts.end, '21:9');

    return{
        mainImageUrl,
        middleImageUrl,
        endImageUrl
    }
    } catch (error) {
        console.error("Failed to generate image", error);
        throw new Error(`
        Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'}
        `);
    }
};


export const updateArticleWithImages = async(
    articleId: string,
articleData: ArticleData,
images: ImageGenerationResult,
topic:string
):Promise<boolean>=>{
    try {
        const {contentWithImages, imageAlt} = insertImagesIntoArticle(
            articleData.content,
            images,
            topic
        )

          const updateData = {
      ...articleData,
      _id: articleId,
      content: contentWithImages,
      image: images.mainImageUrl,
      imageAlt,
      updatedAt: new Date().toISOString(),
    };

    const response = await fetch(`/administrator/cms/api/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const result = await response.json();

    if (result.success) {
      return true;
    } else {
      console.error("Updating error:", result.message);
      return false;
    }
    } catch (error) {
        console.error("Ошибка при обновлении статьи:", error);
    return false;
    }
}