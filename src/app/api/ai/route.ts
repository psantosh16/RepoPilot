"use server";

import { generateAiResponse } from "@/actions/generateAiResponse";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { prompt, vibe, gitInfo, selectedAi } = await req.json();

        if (!prompt || !vibe || !gitInfo || !selectedAi) {
            return NextResponse.json({ code: 400, message: "Invalid input parameters." }, { status: 400 });
        }

        const response = await generateAiResponse(prompt, vibe, gitInfo, selectedAi);
        return NextResponse.json({ code: response.code, message: response.message }, { status: 200 });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ code: 500, message: 'Internal Server Error' }, { status: 500 });
    }
};

export const GET = async () => {
    return NextResponse.json({ code: 405, message: 'Method Not Allowed' }, { status: 405 });
};