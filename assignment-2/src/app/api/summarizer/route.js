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


const enToUrBlogDictionary = {
  "introduction": "تعارف",
  "summary": "خلاصہ",
  "in conclusion": "آخر میں",
  "important": "اہم",
  "update": "تازہ کاری",
  "feature": "خصوصیت",
  "benefit": "فائدہ",
  "guide": "رہنمائی",
  "tips": "مشورے",
  "tricks": "چالاکیاں",
  "how to": "کیسے کریں",
  "step by step": "قدم بہ قدم",
  "solution": "حل",
  "problem": "مسئلہ",
  "example": "مثال",
  "case study": "مطالعہ",
  "research": "تحقیق",
  "experience": "تجربہ",
  "performance": "کارکردگی",
  "comparison": "موازنہ",
  "review": "جائزہ",
  "recommendation": "تجویز",
  "useful": "مفید",
  "effective": "موثر",
  "increase": "اضافہ",
  "decrease": "کمی",
  "productivity": "پیداواری صلاحیت",
  "motivation": "حوصلہ افزائی",
  "mental health": "ذہنی صحت",
  "lifestyle": "طرز زندگی",
  "habit": "عادت",
  "routine": "معمول",
  "technology": "ٹیکنالوجی",
  "software": "سافٹ ویئر",
  "application": "درخواست",
  "tool": "اوزار",
  "platform": "پلیٹ فارم",
  "online": "آن لائن",
  "user": "صارف",
  "content": "مواد",
  "comment": "تبصرہ",
  "share": "شئیر کریں",
  "like": "پسند کریں",
  "subscribe": "سبسکرائب کریں",
  "author": "مصنف",
  "reader": "قارئ",
  "audience": "ناظرین",
  "engagement": "مشغولیت",
  "growth": "ترقی",
  "strategy": "حکمت عملی",
  "plan": "منصوبہ",
  "goal": "مقصد",
  "success": "کامیابی",
  "failure": "ناکامی",
  "challenge": "چیلنج",
  "lesson": "سبق",
  "ai": "مصنوعی ذہانت",
  "increasing": "بڑھتا ہوا",
  "role": "کردار",
  "daily": "روزمرہ",
  "life": "زندگی",
  "concerns": "خدشات",
  "impact": "اثرات",
  "human": "انسانی",
  "intelligence": "ذہانت",
  "offers": "فراہم کرتا ہے",
  "efficiency": "سہولت",
  "hinder": "روکنا",
  "critical": "تنقیدی",
  "thinking": "سوچ",
  "replacing": "تبدیل کرنا",
  "cognitive": "ذہنی",
  "tasks": "کام",
  "reliance": "انحصار",
  "writing": "لکھنا",
  "essays": "مضامین",
  "decline": "کمی",
  "creativity": "تخلیقی صلاحیت",
  "depth": "گہرائی",
  "thought": "سوچ",
  "tendency": "رجحان",
  "reinforce": "مضبوط کرنا",
  "existing": "موجودہ",
  "patterns": "طریقے",
  "stifle": "روکنا",
  "innovation": "جدت",
  "intellectual": "ذہنی",
  "stagnation": "جمود",
  "sentient": "حساس",
  "pain": "درد",
  "emotion": "جذبہ",
  "joy": "خوشی",
  "depression": "اداسی",
  "memory": "یادداشت",
  "cognition": "ادراک",
  "intelligence": "ذہانت",
  "behavior": "رویہ",
  "cooperation": "تعاون",
  "experience": "محسوس کرنا",
  "legal": "قانونی",
  "protection": "تحفظ",
  "ethical": "اخلاقی",
  "treatment": "سلوک",
  "recognize": "تسلیم کرنا",
  "disregard": "نظرانداز کرنا",
  "call": "مطالبہ کرنا",
  "accordingly": "مناسب ردعمل دینا"
};


function translate(text) {
  return text
  .split(/\s+/) // split by spaces
  .map((word) => {
    // Remove punctuation for matching
    const cleanWord = word.toLowerCase().replace(/[.,?!;()"]/g, '');
    const translated = enToUrBlogDictionary[cleanWord];
    return translated ? translated : word; // fallback to original word
  })
  .join(' ');
}
