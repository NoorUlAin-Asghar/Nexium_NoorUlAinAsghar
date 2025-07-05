'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function QuoteGenerator() {
  const [topic, setTopic] = useState("");
  const [prevTopic,setPrevTopic]=useState("");
  const [quotes, setQuotes] = useState<string[]>([]);
  const [fallback, setFallback] = useState(false); //if the topic enetered has no quotes
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

      // Fallback: if category not found or empty, use all quotes
      if (!selectedQuotes || selectedQuotes.length === 0) {
        setFallback(true);
        const allQuotes = Object.values(data).flat(); // flatten all categories
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <main className="max-w-md w-full p-4 space-y-6 bg-white rounded shadow">
        <h1 className="text-3xl font-bold text-center">Quote Generator</h1>
        
        <div className="flex gap-2">
          <Input
            placeholder="Enter topic (e.g. motivation, love)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            disabled={loading}
          />
          <Button 
            onClick={handleGenerate} 
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="p-4 bg-red-50 text-red-600">
            {error}
          </Card>
        )}

        {/* Results */}
        {quotes.length > 0 &&(
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold my-0"> {fallback? 'No quotes found for ' :'Quotes about '}
            <span className="text-blue-600">{prevTopic}</span>:
            </h2>
           {fallback ? (
              <h6 className="italic my-0 -mt-2 text-center">Generating random quotes...</h6>
            ) : (
              <hr className="border-t border-black w-1/2 mx-auto my-2" />
            )}
            <ul className="space-y-3">
              {quotes.map((quote, i) => (
                <li key={i} className="border-l-4 border-blue-200 pl-4">
                  {quote}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </main>
    </div>
  );
}