# 🌟 Quote Generator

A beautiful and minimalist quote generator built using **Next.js** and **ShadCN UI**, designed to deliver aesthetically pleasing, topic-based quotes with handwritten-style fonts, paper textures, and smooth animations.

---

## ✨ Features

- 🧠 **20+ Topics with quotes** (e.g. motivation, life, wisdom)
- 🖼️ **Polaroid-style quote display**
- 🌀 **Animated entry effects** using Framer Motion
- 📱 **Fully responsive** and mobile-friendly layout
- 🚫 Graceful fallback when no quotes are found
- ✅ Deployed on Vercel for live preview
---

## 🛠 Tech Stack

- [Next.js 14+](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.dev/) for prebuilt components
- [Framer Motion](https://www.framer.com/motion/) for animations

---
## 🖥️ Live Demo

🚀 [View deployed app on Vercel](https://quote-generator-nine-delta.vercel.app/)

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
https://github.com/NoorUlAin-Asghar/Nexium_NoorUlAinAsghar.git
cd assignment-1
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🧾 Folder Structure

```
├── public/
│   ├── paper-texture.png      # Background texture
│   └── quotes.json            # Local quote dataset
├── src/app/
│   └── page.tsx               # Main entry point
└── README.md
```

---

## 📄 How to Add Quotes

Edit the `public/quotes.json` file and follow this structure:

```json
{
  "happiness": [
    {
      "quote":"Happiness is not something ready made. It comes from your own actions.",
      "author": "Dalai Lama"
    },
    {
      "quote": "Enjoy your life—it's all that matters.",
      "author": "Audrey Hepburn"
    }
  ],
  "motivation": [
    {
      "quote": "Don’t watch the clock; do what it does. Keep going.",
      "author": "Sam Levenson"
    }
  ]
}
```

You can add new topics as keys and an array of quotes as values.
