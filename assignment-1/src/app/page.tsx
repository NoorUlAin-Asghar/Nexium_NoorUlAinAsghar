'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function QuoteGenerator() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setLoading(true);
    setError("");
    setQuotes([]);

    try {
      // Call your Next.js API route (not OpenAI directly)
      const response = await fetch("/quote.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { quotes } = await response.json();
      setQuotes(quotes);
    } catch (err) {
      console.error("Generation failed:", err);
      setError("Failed to generate quotes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto p-4 space-y-6">
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
      {quotes.length > 0 && (
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Quotes about <span className="text-blue-600">{topic}</span>:
          </h2>
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
  );
}