import { NextRequest, NextResponse } from "next/server";
import { YandexGPTRequest, YandexGPTResponseAPI } from "../../../articles/types";
import { getSystemPrompt } from "../../../articles/utils/systemPrompts";


export async function POST(request:NextRequest) {
    try {
        const body = await request.json();
        const {prompt, action = 'improve'} = body as YandexGPTRequest;
        
        const YANDEX_API_KEY = process.env.YANDEX_API_KEY;
        const YANDEX_FOULDER_ID = process.env.YANDEX_FOULDER_ID;

        console.log(prompt,action, YANDEX_API_KEY, YANDEX_FOULDER_ID);
        
        if(!YANDEX_API_KEY || !YANDEX_FOULDER_ID){
            return NextResponse.json(
                {error: 'API key or folder ID not found', details: 'Check .env file'},
                {status: 500}
            )
        }

        if(!prompt || typeof prompt !== 'string'){
            return NextResponse.json(
                {error: 'Prompt not found'},
                {status: 400}
            )
        }

        const systemPrompt = getSystemPrompt(action);

        const apiUrl = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';

        const response = await fetch(apiUrl,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Api-Key ${YANDEX_API_KEY}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                modelUri: `gpt://${YANDEX_FOULDER_ID}/yandexgpt`,
                completionOptions: {
                    stream: false,
                    temperature: 0.7,
                    maxTokens: 2000,
                },
                messages:[
                    {
                        role: 'system',
                        text: systemPrompt
                    },
                    {
                        role: 'user',
                        text: prompt
                    }
                ]
            })
        });

        if(!response.ok){
            const errorText = await response.text();
            console.error('YandexGPT API error', response.status, errorText);

            let errorMessage = `YandexGPT API error ${response.status}`;
            try {
                const errorData: YandexGPTResponseAPI = JSON.parse(errorText);
                errorMessage = errorData.error?.message || errorMessage;
            } catch {
                console.error('Error parsing YandexGPT API error', errorText.substring(0, 200));
            }

            return NextResponse.json(
                {error: 'YandexGPT API error', details: errorMessage, status: response.status},
                {status: response.status}
            )
        }

        const data: YandexGPTResponseAPI = await response.json();
        
        const generatedText = data.result?.alternatives?.[0]?.message?.text || '';

        if(!generatedText){
            return NextResponse.json(
                {
                    error: "Empty response",
                    details: "YandexGPT API returned empty response",
                },
                {status: 500}
            )
        };

        return NextResponse.json({
            text: generatedText,
            provider: 'YandexGPT',
            model: 'yandexgpt'
        });

    } catch (error:unknown) {
        console.error('Error in YandexGPT API',error);

        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        return NextResponse.json(
            {error: 'Iternal server error', details: errorMessage, suggestion: 'Check network settings and permissions from api.cloud.yandex.net'},
            {status: 500}
        )
    }
}