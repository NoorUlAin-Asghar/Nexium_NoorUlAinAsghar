
# 🎯 Pitch Writer

Pitch Writer is a sleek, personalized pitch generation tool powered by AI. You can create, edit, and manage tailored pitches for job applications, cold emails, or personal branding — all in one place.

---

## ✨ Features

- ✍️ **Generate personalized pitches** using role, goals, and tone preferences.
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
- [Hugging Face API](https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1?client=fetch) – For AI pitch generation (Mixtral-8x7B-Instruct).

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

## 📂 Project Structure (Simplified)

```
pages/
│
├── index.tsx           # Homepage / Dashboard
├── login.tsx           # Auth screen
├── doc.tsx             # Documentation Page
├── api/                # API route for Hugging Face interaction
└── ...
components/
  ├── PitchCard.tsx     # UI for each pitch block
  └── Toast.tsx         # Notification system
```

---

## 📄 Documentation

See full documentation at: [`/doc`](https://your-site.vercel.app/doc)  
Or check out [`DocumentationPage.jsx`](./app/docs/page.tsx) in the codebase.

---

## 🛠️ Getting Started

```bash
git clone https://github.com/NoorUlAin-Asghar/Nexium_NoorUlAinAsghar.git
cd final-project
npm install
npm run dev
```

You’ll need:
- A Supabase project
- Supabase keys in `.env.local`
- A Hugging Face API token

---

## 📎 License

MIT License – free to use, modify, and distribute.

---

© 2025 Pitch Writer. All rights reserved.
