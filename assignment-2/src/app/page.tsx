'use client'

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { addSummary, getAllSummaries, getSummaryByUrl } from '@/lib/summary'


export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState<{ url: string; English: string; Urdu: string } | null>(null);
  const [history, setHistory] = useState<{ url: string; English: string; Urdu: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const fetchSummaries = async () => {
    try {
      const data = await getAllSummaries();
      const formatted = data.map((row: { url: string; english: string; urdu: string }) => ({
        url: row.url,
        English: row.english,
        Urdu: row.urdu,
      }));
      setHistory(formatted);
    } catch{
      setError("Failed to get history, try again later.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  useEffect(() => {
    fetchSummaries(); // on page load
  }, []);


  const handleSummarize = async () => {
    if (!url.trim()){
      console.warn("Enter URL")
      return;
    }

    setLoading(true);
    setSummary(null);
    // Check if already summarized
    const existing = await getSummaryByUrl(url);
    if (existing) {
      setSummary({
        url: existing.url,
        English: existing.english,
        Urdu: existing.urdu,
      });
      setLoading(false);
      return;
    }

    try{
      const res = await fetch("/api/summarizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const result =await res.json();
      if(!res.ok){
        const errorText=result.error;
        console.log("Error: ", errorText)
        setError("Summarization failed. Reached API request limit");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        return; // prevent continuing with invalid result
      }

      console.log("Response from route.js: ", result)
      const {English, Urdu}=result
      const record = {
        url,
        English,
        Urdu,
      };
      setSummary(record);

      try{
        await addSummary(record.url, record.English, record.Urdu);
        await fetchSummaries(); // fetch again after successful addition
      }
      catch(err){
        console.log("Error adding to db: ", err)
        setError("Failed to add to database, try again later.");
        setShowAlert(true); // Show alert
        setTimeout(() => setShowAlert(false), 3000); // Hide after 3s
      }
    }
    catch(err){
      console.log("Error: ", err)
      setError("Failed to summarize, try again later.");
      setShowAlert(true); // Show alert
      setTimeout(() => setShowAlert(false), 3000); // Hide after 3s
    }
    finally{
      setLoading(false);
    }

  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 to-stone-500 text-[#f6f5f5] px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-left mt-8 mb-2">🪶Blog Summarizer</h1>
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
              <CardContent className="p-0 text-[#f6f5f5]">
                <h3 className="text-2xl mb-2 font-semibold">🔗 URL:</h3>
                 <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    className="bg-transparent border-neutral-300"
                    placeholder="Enter blog URL"
                    value={url}
                    required
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSummarize()}
                    disabled={loading} 
                  />
                  <Button onClick={handleSummarize} disabled={loading} className=" bg-[#f6f5f5]  text-black hover:bg-transparent hover:text-[#f6f5f5]">
                    {loading? "Summarzing" : "Summarize"}
                  </Button>
                </div>

                {loading && (
                  <div className="flex justify-center items-center mt-6 space-x-4">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <p className="italic text-[#f6f5f5]">Reading the document</p>
                  </div>
                )}
                {showAlert && (
                  <Alert className="bg-transparent border-neutral-300 mt-4 flex flex-col items-center text-center">
                      <AlertTitle className="text-2xl">⚠️</AlertTitle>
                      <AlertDescription className=" text-red-400 italic">{error}</AlertDescription>
                  </Alert>
                )}

                {summary && !loading &&(
                  <div className="space-y-3 mt-4 text-[#f6f5f5]">
                    <h3 className="text-2xl font-semibold">📜English Summary:</h3>
                    <p className="bg-transparent p-4 rounded-lg border border-neutral-300 whitespace-pre-wrap">
                      {summary.English}
                    </p>
                    <h3 className="text-2xl text-right font-semibold"> اردو ترجمہ ✒️</h3>
                    <p className="bg-transparent p-4 rounded-lg border border-neutral-300 whitespace-pre-wrap">
                      {summary.Urdu}
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
              <div className="relative w-full">
                {/* Fixed ScrollArea with proper overflow control */}
                <ScrollArea className="h-96 pr-2">
                  <div className="space-y-4 w-[calc(100%-8px)]"> {/* Adjust for scrollbar */}
                    {history.map((item, i) => (
                      <Dialog key={i}>
                        <DialogTrigger asChild>
                          {/* Card with constrained width */}
                          <Card className="bg-transparent border border-neutral-300 cursor-pointer 
                                          hover:shadow-lg w-full max-w-none mr-2 p-0" > {/* Allow full width */}
                            <CardContent className="p-4 text-[#f6f5f5] space-y-1">
                              <p className="text-sm text-gray-400 truncate">🔗 {item.url}</p>
                              <hr className="border-t w-1/2 mx-auto my-2" />
                              <p><strong>English:</strong></p>
                              <p className="break-words">{item.English.slice(0, 200)}{item.English.length > 200 && "..."}</p>
                              <p className="text-right"><strong> :اردو</strong></p>
                              <p className="break-words">{item.Urdu.slice(0, 200)}{item.Urdu.length > 200 && "..."}</p>
                              <p className="text-right text-sm italic">Click to view more →</p>
                            </CardContent>
                          </Card>
                        </DialogTrigger>

                        {/* Dialog with proper text constraints */}
                        <DialogContent className="z-[100] sm:max-w-[90vw] max-h-[90vh] text-[#f6f5f5] 
                                                bg-stone-900 border border-neutral-300 overflow-auto">
                          <DialogHeader>
                            <DialogTitle>🔗 Blog: </DialogTitle>
                            <DialogDescription className="text-gray-400 break-all">
                              <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline text-blue-400 hover:text-blue-200">
                                {item.url}
                              </a>
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4 space-y-4 overflow-auto">
                            <div>
                              <h4 className="font-semibold mb-2">🔤 English:</h4>
                              <div className="p-3 bg-stone-800 rounded-md whitespace-pre-wrap break-words max-w-full overflow-auto">
                                {item.English}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-right mb-2"> :اردو 🌙</h4>
                              <div className="p-3 bg-stone-800 rounded-md whitespace-pre-wrap break-words max-w-full overflow-auto">
                                {item.Urdu}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </TabsContent>      
        </Tabs>
      </div>
    </div>
  );
}
