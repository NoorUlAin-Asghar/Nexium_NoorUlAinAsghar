// app/api/pitch/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title,description,type, tone } = await req.json();

  try{

	const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
		method: "POST",
		headers: {
		Authorization: `Bearer ${process.env.HF_TOKEN}`,
		"Content-Type": "application/json",
		},
		body: JSON.stringify({
		model: "mistralai/Mixtral-8x7B-Instruct-v0.1:together",
		messages: [
			{
			role: "user",
			content: `Generate a pitch with Title: ${title} Description: ${description} Type: ${type} Tone: ${tone}`,
			},
		],
		}),
	});


	const result = await response.json();
	 if (result.error) {
      console.error("Hugging Face Error:", result.error);
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    const pitch = result.choices?.[0]?.message?.content || "No pitch generated.";
	console.log("Pitch generated: " , pitch)

    return NextResponse.json({ pitch });
	}
	catch(err){
		console.error("Internal Server Error:", err);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}

}
