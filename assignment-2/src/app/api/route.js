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

    const urduText = translate(summarizedText);

    return NextResponse.json({
      English: summarizedText,
      Urdu: urduText,
    }, { status: 200 });

  } catch (err) {
    console.error("Internal Server Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

function translate(text) {
    return "hello world"
}
