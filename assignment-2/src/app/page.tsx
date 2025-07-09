'use client'

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSummarize = async () => {
    if (!url) return;
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    // const data = await res.json();
    // if (data?.english_summary) {
    //   const record = { url, ...data };
    //   setSummary(record);
    //   setHistory((prev) => [record, ...prev]);
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 to-stone-500 text-[#f6f5f5] px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-left mt-8 mb-2">Blog Summarizer</h1>
        <p className="italic mb-8">~ We read it so you don’t have to.</p>

        <Tabs defaultValue="summarize" className="w-full">
          <TabsList className="flex justify-center mb-6 bg-tranparent ">
            <TabsTrigger
              value="summarize"
              className="data-[state=active]:bg-white 
                        data-[state=active]:text-black 
                        data-[state=inactive]:bg-transparent 
                        data-[state=inactive]:text-[#f6f5f5]">
              Summarize New
            </TabsTrigger>

            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-white 
                        data-[state=active]:text-black 
                        data-[state=inactive]:bg-transparent 
                        data-[state=inactive]:text-[#f6f5f5]">
              History
            </TabsTrigger>

          </TabsList>

          {/* Summarize New */}
          <TabsContent value="summarize">
            <Card className="bg-transparent border-transparent shadow-none">
              <CardContent className="p-0">
                 <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    className="bg-transparent border-neutral-300"
                    placeholder="Enter blog URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSummarize()}
                  />
                  <Button onClick={handleSummarize} className=" bg-[#f6f5f5]  text-black hover:bg-transparent hover:text-[#f6f5f5]">
                    Summarize
                  </Button>
                </div>
                
                {summary && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">📝 Summary:</h3>
                    <p className="text-gray-300 bg-gray-900 p-4 rounded border border-gray-700 whitespace-pre-wrap">
                      {/* {summary.english_summary} */}
                    </p>
                    <h3 className="text-lg font-semibold">🌐 Urdu Translation:</h3>
                    <p className="text-gray-300 bg-gray-900 p-4 rounded border border-gray-700 whitespace-pre-wrap">
                      {/* {summary.urdu_summary} */}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            {history.length === 0 ? (
              <div>
                <p className="text-center italic">No previous summaries yet.</p>
                <hr className="border-t w-1/2 mx-auto my-2" />
              </div>
            ) : (
              <ScrollArea className="h-96 pr-2">
                <div className="space-y-4">
                  {history.map((item, i) => (
                    <Card key={i} className="bg-gray-800 border border-gray-700">
                      <CardContent className="p-4 space-y-2">
                        {/* <p className="text-sm text-gray-400">🔗 {item.url}</p> */}
                        <p className="text-gray-300 whitespace-pre-wrap">
                          {/* <strong>Summary:</strong> {item.english_summary} */}
                        </p>
                        <p className="text-gray-300 whitespace-pre-wrap">
                          {/* <strong>Urdu:</strong> {item.urdu_summary} */}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
