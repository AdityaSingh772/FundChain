import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI('AIzaSyBv34w3O7xfHVYLgG8fWgvVRWCxeH4-TyQ');

// POST method handler
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// GET method handler
export async function GET() {
  return new NextResponse('Welcome to the Gemini Chatbot API', { status: 200 });
}
