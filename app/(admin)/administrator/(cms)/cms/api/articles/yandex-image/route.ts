import  fs  from 'fs/promises';
import { NextRequest, NextResponse } from "next/server";
import {
  GenerationRequest,
  StyleType,
  YandexArtGenerationRequest,
  YandexArtResponse,
} from "../../../articles/types";
import sharp from "sharp";
import path from "path";

const YANDEX_API_KEY = process.env.YANDEX_IMAGE_API_KEY;
const YANDEX_FOULDER_ID = process.env.YANDEX_FOULDER_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      prompt,
      aspect_ratio = "1:1",
      style = "default",
    }: GenerationRequest = body;

    if (!prompt || prompt.trim().length < 3) {
      return NextResponse.json(
        { error: "Prompt request must be at least 3 characters long" },
        { status: 400 },
      );
    }

    if (!YANDEX_API_KEY || !YANDEX_FOULDER_ID) {
      console.error(
        `API Keys not found:${{
          hasApiKey: !!YANDEX_API_KEY,
          hasFolderId: !!YANDEX_FOULDER_ID,
        }}`,
      );
      return NextResponse.json(
        { error: "API key or folder ID not found", details: "Check .env file" },
        { status: 500 },
      );
    }
    let widthRatio = 1,
      heightRatio = 1;
    switch (aspect_ratio) {
      case "16:9":
        widthRatio = 16;
        heightRatio = 9;
        break;
      case "16:10":
        widthRatio = 16;
        heightRatio = 10;
        break;
      case "21:9":
        widthRatio = 21;
        heightRatio = 9;
        break;
    }
    let enhancendPrompt = prompt;
    const styleMap: Record<StyleType, string> = {
      realistic:
        "фотореалистично, высокое качество, детализованно, професионльная фотография",
      artistic: "художественная живопись, шедевр, цифровое искусство, арт",
      sketch:
        "эскиз, скульптура, скетч, карандашный рисунок, рисунок на бумаге, черно-белый рисунок",
      cartoon:
        "мультипликация, мультфильм, анимация, аниме, диснеевская анимация",
      default: "",
    };

    if (style !== "default" && styleMap[style]) {
      enhancendPrompt = `${styleMap[style]}: ${prompt}`;
    }

    const requestBody: YandexArtGenerationRequest = {
      modelUri: `art://${YANDEX_FOULDER_ID}/yandex-art/latest`,
      messages: [
        {
          text: enhancendPrompt,
          weight: 1,
        },
      ],
      generationOptions: {
        mimeType: "image/png",
        seed: Math.floor(Math.random() * 1000000),
        aspectRatio: {
          widthRatio: widthRatio,
          heightRatio: heightRatio,
        },
      },
    };

    console.log(requestBody);

    const response = await fetch(
      "https://llm.api.cloud.yandex.net/foundationModels/v1/imageGenerationAsync",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Api-Key ${YANDEX_API_KEY}`,
          'Accept': "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    );

    const responseText = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "YandexArt error",
          details: `Status: ${response.status}`,
          response: responseText.substring(0, 500),
        },
        { status: 400 },
      );
    }

    if (!responseText || responseText.trim() === "") {
      return NextResponse.json(
        { error: "Empty response from YandexArt" },
        { status: 500 },
      );
    }

    let data: YandexArtResponse;
    try {
      data = JSON.parse(responseText) as YandexArtResponse;
    } catch (error) {
      console.error("JSON parse error", error);
      return NextResponse.json(
        {
          error: "Invalid JSON response from YandexArt",
          rawResponse: responseText.substring(0, 500),
        },
        { status: 500 },
      );
    }

    const operationId = data.id || data.operationId;
    if (!operationId) {
      console.error("Operation ID not found", data);
      return NextResponse.json(
        { error: "Operation ID not found", response: data },
        { status: 500 },
      );
    }
    return NextResponse.json({
      success: true,
      operationId: operationId,
      status: "loading",
      message: "Image generation started",
      style: style,
      aspect_ratio: aspect_ratio,
      widthRatio: widthRatio,
      heightRatio: heightRatio,
      api_format: "aspectRatio_object",
    });
  } catch (error) {
    console.error("Generation error", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal error", details: errorMessage },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const operationId = searchParams.get("operationId");

    if (!operationId) {
      return NextResponse.json(
        { error: "No operation ID provided" },
        { status: 400 },
      );
    }

    if(!YANDEX_API_KEY){
        return NextResponse.json({error: "Yandex API key is not provided"}, {status: 500});
    }

    const statusUrl = `https://operation.api.cloud.yandex.net/operations/${operationId}`

    const response = await fetch(statusUrl, {
        headers:{
            'Authorization': `Api-Key ${YANDEX_API_KEY}`,
            'Accept': 'application/json',
        }
    });

    const responseText = await response.text();

    if (!response.ok) {
        console.error('Status check error', response.status, responseText.substring(0, 200));
        return NextResponse.json(
            {
                error: "Status check error",
                details: responseText.substring(0, 500),
                status: response.status,
            },
            { status: response.status },
        );
    } 

    if (!responseText || responseText.trim() === "") {
      return NextResponse.json(
        { error: "Empty response from YandexArt" },
        { status: 500 },
      );
    };

    let data;

    try {
        data = JSON.parse(responseText);
    } catch (error) {
        console.error("JSON parse error", error);
        return NextResponse.json(
            {
                error: "Invalid JSON response from YandexArt",
                rawResponse: responseText.substring(0, 500),
            },
            { status: 500 },
        );
    }

    if(data.done){
        if(data.response?.image){

            const base64Image = data.response.image;
            const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2, 8);

            const originalExtension = 'png';
            const cleanName = 'yandex_art';
            const fileName = `${cleanName}_${timestamp}_${randomString}.${originalExtension}`;

            let optimizedBuffer:Buffer;

            if(originalExtension === 'png'){
                optimizedBuffer = await sharp(buffer)
                .resize(2048, 2048, {
                    fit: 'inside',
                    withoutEnlargement: false
                })
                .png({
                    quality: 90,
                    compressionLevel: 8
                }).toBuffer();
            }else{
                optimizedBuffer = await sharp(buffer)
                .resize(2048, 2048, {
                    fit: 'inside',
                    withoutEnlargement: false
                }).jpeg({
                    quality: 90,
                    mozjpeg: true
                }).toBuffer();
            }

            const publickDir = path.join(process.cwd(), 'public', 'uploads', 'articles','yandex_art');
            await fs.mkdir(publickDir, {recursive: true});

            const filePath = path.join(publickDir, fileName);
            await fs.writeFile(filePath, optimizedBuffer);

            const publicUrl = `/uploads/articles/yandex_art/${fileName}`;

            return NextResponse.json({
                success: true,
                done:true,
                status: 'success',
                imageUrl: publicUrl,
                fileName: fileName,
                fileSize: optimizedBuffer.length,
                format: originalExtension,
                operationId: operationId,
            })
        }else if(data.error){
            console.error('Error in status generating',data.error);
            return NextResponse.json({
                success: false,
                done: true,
                status: 'failed',
                error: data.error,
                operationId: operationId
            })
        }else{
            return NextResponse.json({
                success: false,
                done: true,
                status: 'error',
                error: 'Unknown error',
                operationId: operationId
            })
        }
    }
    return NextResponse.json({
        success: true,
        done: false,
        status: 'loading',
        operationId: operationId,
        message: 'Still generating image',
    })
  } catch (error) {
    console.error("Error getting operation status", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Error getting operation status",
        details: errorMessage,
      },
      { status: 500 },
    );
  }
}
