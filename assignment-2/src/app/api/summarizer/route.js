import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const url = body.url;
  const summary_length = "medium";
  const apiKey = process.env.API_KEY;

  if (!url) {
    console.log("Error: 400, URL is missing");
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    //https://apyhub.com/utility/ai-summarize contains all the documentation 
    const response = await fetch("https://api.apyhub.com/ai/summarize-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apy-token": apiKey,
      },
      body: JSON.stringify({ url, summary_length }),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorText = result.error || { message: "Unknown error", code: 500 };
      console.log("Error:", errorText);
      return NextResponse.json(
        { error: errorText.message },
        { status: 500 }
      );
    }

    const summarizedText = result.data?.summary || "No summary returned.";
    console.log("Summarized Text:", summarizedText);

    //first translate
    const urduText = await translateToUrdu(summarizedText);
    //then return both summaries together
    return NextResponse.json({
      English: summarizedText,
      Urdu: urduText,
    }, { status: 200 });

  } catch (err) {
    console.error("Internal Server Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


async function translateToUrdu(text) {
  const maxBytes = 500;
  const encoder = new TextEncoder();
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text]; // split by sentence

  let chunks = [];
  let currentChunk = "";

  //since api can not handle more than 500 characters, we need to send slices of <= 500 characters
  for (let sentence of sentences) {
    const testChunk = currentChunk + sentence;
    const byteLength = encoder.encode(testChunk).length;

    if (byteLength > maxBytes) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk = testChunk;
    }
  }
  if (currentChunk) chunks.push(currentChunk.trim());

  // Translate all chunks in sequence
  const translations = [];
  for (let chunk of chunks) {
    const encoded = encodeURIComponent(chunk);
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encoded}&langpair=en|ur`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    const translated = data.responseData?.translatedText || "[❌ Translation failed]";
    translations.push(translated);
  }
  //join the slices of translation
  return translations.join(" ");
}
