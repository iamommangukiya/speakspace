import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    if (!text || text.length < 10) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid resume content' 
      }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",  // Changed from "gemini-1.0-pro" to "gemini-pro"
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });
    
    const prompt = `Analyze this resume and provide structured feedback:

1. Key Skills (Top 5):
2. Areas for Improvement (3 points):
3. Industry Keywords (5 relevant terms):
4. Achievement Enhancement:

Resume Text: ${text.substring(0, 2000)}`; // Limit text length

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return NextResponse.json({
      success: true,
      analysis: response.text()
    });

  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to analyze resume'
    }, { status: 500 });
  }
}