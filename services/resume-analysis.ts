import GroqClient from 'groq-sdk';
import { extractTextFromPDF } from './pdf-extractor'; // ✅ Make sure this path is correct

const groq = new GroqClient({ apiKey: process.env.GROQ_API_KEY! });

export async function analyzeResume(fileBuffer: Buffer): Promise<string> {
  try {
    // 1. Extract plain text from the PDF buffer
    const resumeText = await extractTextFromPDF(fileBuffer);

    // 2. Create a well-structured prompt
    const prompt = `
You are an AI career counselor.

Analyze the following resume and provide:
1. Skills assessment
2. Areas for improvement
3. Recommended skills to learn
4. Career path suggestions

Resume content:
---
${resumeText}
    `;

    // 3. Request a completion from Groq
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
    });

    // 4. Return the AI's response
    return completion.choices?.[0]?.message?.content || 'No response generated.';
  } catch (error: any) {
    console.error('❌ Resume analysis failed:', error.message || error);
    throw new Error('Failed to analyze resume');
  }
}
