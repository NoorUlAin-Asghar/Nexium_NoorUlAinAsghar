
# 🎯 Pitch Writer

Pitch Writer is a sleek, personalized pitch generation tool powered by AI. You can create, edit, and manage tailored pitches for job applications, cold emails, or personal branding — all in one place.

---

## ✨ Features

- ✍️ **Generate personalized pitches** using titlw, description, pitch type, and tone preferences.
- 📝 **Edit and delete** generated pitches.
- 🎨 **Customize pitch tone** (professional, casual, confident, etc.).
- 🔒 **Private storage** via Supabase – your pitches are visible only to you.
- 🔁 **Live updates** – changes reflect instantly.
- 💬 **Toasts** for feedback on user actions.

---

## ⚙️ Tech Stack

- [Next.js](https://nextjs.org/) – React framework for frontend/backend.
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework.
- [Framer Motion](https://www.framer.com/motion/) – For UI animations.
- [Supabase](https://supabase.com/) – Auth + database storage.
- [Hugging Face API](https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct) – For AI pitch generation (Meta-Llama-3-8B-Instruct).

---

## 🖥️ Live Demo

🚀 [View deployed app on Vercel](https://blog-summarizer-delta.vercel.app/)

---

## 🧠 How It Works

1. User fills in title, description, type and tone.
2. Data is sent to Hugging Face API using fetch.
3. The response (AI-generated pitch) is shown.
4. Users can edit, save, or delete pitches.
5. All data is stored and retrieved securely via Supabase.

---

## 🔐 Auth & Data

- Email-based authentication via Supabase Magic Link.
- RLS policies ensure only logged-in users access their own content.
- No third-party data sharing.

---

## 📄 Documentation

See full documentation at: [`/doc`](https://pitch-writer.vercel.app/doc)  
Or check out [`DocumentationPage.jsx`](./app/docs/page.tsx) in the codebase.

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
https://github.com/NoorUlAin-Asghar/Nexium_NoorUlAinAsghar.git
cd final-project
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
HF_TOKEN=your_huggingface_token
```

### 4. Run the Development Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure (Simplified)

```
├── public/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Main UI
│   │   ├── api/
│   |   |    └── pitch-writer/
│   |   |       └── route.js       # API route calling Meta-Llama-3-8B-Instruct on HuggingFace  
|   |   ├── dashboard/
│   │   |   └── page.tsx               # User's dashboard page
|   |   ├── docs/
│   │   |   └── page.tsx               # Contains necessary documentation realted to web app
|   |   ├── generate/
│   │   |   └── page.tsx               # Form to generate a customized pitch 
|   |   └── sign-in/
|   |       ├── page.tsx
│   │       └── signInClient.tsx       
|   |
|   ├── components/
│   │   ├── ui
│   │   ├── navbar
│   │   └── protectedRoute
│   └── lib/
│       ├── pitch-db.js             # Supabase functions (savePitchToDB, getUserPitchesWithEmail, saveChangesToDb,deletePitchFromDb)
│       └── supabaseClient.js       # Initializes the Supabase client using the URL and anon key stored in .env
├── .env                            # Environment variables
└── README.md
```
 
---

## 📎 License

MIT License – free to use, modify, and distribute.

---

© 2025 Pitch Writer. All rights reserved.
