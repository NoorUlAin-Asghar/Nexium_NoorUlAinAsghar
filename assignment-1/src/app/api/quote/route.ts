//tried using api from OpenAI, but it was not open source hence will complete the task using JSON file
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { topic } = await request.json();

  if (!topic) {
    return NextResponse.json(
      { error: "Topic is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "You are a helpful assistant that generates quotes." 
          },
          { 
            role: "user", 
            content: `Give me 3 short quotes about ${topic}. Number them.` 
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const quotes = data.choices[0]?.message?.content
      .split("\n")
      .filter((quote: string) => quote.trim().length > 0);

    return NextResponse.json({ quotes });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate quotes. Please try again." },
      { status: 500 }
    );
  }
}