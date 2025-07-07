'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Head from "next/head";

export default function QuoteGenerator() {
  const [topic, setTopic] = useState("");
  const [prevTopic, setPrevTopic] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);
  const [fallback, setFallback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  type Quote = {
    quote: string;
    author: string;
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setLoading(true);
    setError("");
    setQuotes([]);
    setPrevTopic(topic);
    setFallback(false);

    try {
      const res = await fetch("/quotes.json");
      const data: Record<string, Quote[]> = await res.json();

      const category = topic.trim().toLowerCase();
      let selectedQuotes = data[category];

      if (!selectedQuotes || selectedQuotes.length === 0) {
        setFallback(true);
        const allQuotes = Object.values(data).flat();
        selectedQuotes = allQuotes;
      }

      const randomQuotes = selectedQuotes
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(q => `${q.quote} — ${q.author}`);

      setQuotes(randomQuotes);
    } catch (err) {
      console.error("Generation failed:", err);
      setError("Failed to generate quotes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Just+Another+Hand&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-[url('/paper-texture.png')] bg-cover px-2">
        <main className="w-full max-w-4xl p-6 space-y-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-md">
          <h1 className="text-4xl font-bold text-center text-black">Quote Generator</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              className="bg-white"
              placeholder="Enter topic (e.g. motivation, life)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              disabled={loading}
            />
            <Button onClick={handleGenerate} disabled={loading}>
              {loading ? "Generating..." : "Generate"}
            </Button>
          </div>

          {error && (
            <Card className="p-4 bg-red-100 text-red-700 font-medium border border-red-300">
              {error}
            </Card>
          )}

          {quotes.length > 0 && (
            <div className="space-y-4">
              <Card className="p-4 text-center bg-white border border-gray-200">
                <h2 className="text-xl font-semibold text-black">
                  {fallback ? "No quotes found for " : "Quotes about "}
                  <span className="text-blue-400">{prevTopic}</span>
                </h2>
                {fallback ? (
                  <p className="italic mt-1 text-sm text-gray-500">
                    Showing random quotes instead...
                  </p>
                ) : (
                  <hr className="border-t border-gray-400 w-1/2 mx-auto my-2" />
                )}
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {quotes.map((quote, i) => {
                  const [quoteText, author] = quote.split("—");

                  return (
                    <motion.div
                      key={quote}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="relative"
                    >
                      <div className="w-5 h-5 bg-blue-400 rounded-full absolute top-[-8px] left-1/2 -translate-x-1/2 z-10 shadow-md border-4 border-black"></div>

                      <div className="w-full h-64 bg-neutral-50 border-[6px] border-black shadow-xl flex flex-col rounded-lg relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rotate-[2deg] before:z-[-1] before:bg-[#fefcf3] before:rounded-lg">
                        <div className="bg-white border-b-[6px] border-black rounded-lg flex-1 flex items-center justify-center px-4 relative">
                          <p
                            className="text-black text-xl text-center"
                            style={{ fontFamily: "'Just Another Hand', cursive" }}
                          >
                            “{quoteText.trim()}”
                          </p>
                        </div>
                        <div className="h-12 flex items-end justify-end pr-4 pb-2">
                          <p className="text-sm text-blue-400 italic">
                            — {author?.trim() || "unknown"}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
} 
