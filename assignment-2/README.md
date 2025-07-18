# 🪶 Blog Summarizer

A powerful and minimalistic blog summarization app built with **Next.js** and **ShadCN UI**, designed to extract key insights from blogs and translate them into Urdu.

---

## ✨ Features

- 📄 Summarize any blog by simply pasting its URL
- 🧠 Summaries generated using **ApyHub AI Summarization API**
- 🌐 Urdu translation via a **MyMemory Translation API**
- 🕘 Displays summarization history using **Supabase** as the backend
- 📂 Persists summaries to a cloud database
- ↺ Graceful fallback UI on error (e.g., API fail or DB issue)
- 📱 Responsive and user-friendly interface
- 🧪 Intelligent check to prevent duplicate summaries
- 📦 Deployed using **Vercel** for live preview

---

## 💠 Tech Stack

- [Next.js 14+](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.dev/) for UI components
- [Supabase](https://supabase.com/) for database and storage
- [ApyHub API](https://apyhub.com/)for AI-powered blog summarization
- [MyMemory API](https://mymemory.translated.net/) for English to Urdu translation

---

## 🖥️ Live Demo

🚀 [View deployed app on Vercel](https://blog-summarizer-delta.vercel.app/)

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
https://github.com/NoorUlAin-Asghar/Nexium_NoorUlAinAsghar.git
cd assignment-2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_ANON_KEY=your_supabase_anon_key
API_KEY=your_apyhub_api_key
```

### 4. Run the Development Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧾 Folder Structure

```
├── public/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Main UI
│   │   └── api/
│   |       └── summarizer/
│   |           └── route.js       # API route calling ApyHub and MyMemory   
│   └── lib/
│       ├── summary.js             # Supabase functions (addSummary, getAllSummaries, getSummaryByUrl)
│       └── supabaseClient.js      # Initializes the Supabase client using the URL and anon key stored in .env
├── .env                           # Environment variables
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🖐️ External Services

### 🧠 AI Summarization API (ApyHub)

Used to fetch blog summaries from a provided URL.\
API: `https://api.apyhub.com/ai/summarize-url`\
Docs: [ApyHub Summarize URL](https://apyhub.com/utility/ai-summarize) \
Allows 5 free api tries per day

### 🌐 Urdu Translation

Used to fetch blog summaries from a provided URL.\
API: `https://api.mymemory.translated.net/get?q=${text}&langpair=en|ur`\
Docs: [MyMemory Translated URL](https://mymemory.translated.net/doc/spec.php) \
Free, anonymous usage is limited to 5000 chars/day

## 📃 Database

Supabase is used to:

- Store each summary (URL, English summary, Urdu summary)
- Prevent duplicate entries
- Fetch historical summaries in reverse chronological order

---

## ❓ How It Works

1. User pastes a blog URL
2. App checks if summary for this URL already exists in Supabase
3. If not, it calls ApyHub’s summarization API
4. The English summary is then translated to Urdu
5. Both summaries are saved to Supabase and shown on the UI
6. User can view summary history via the History tab

