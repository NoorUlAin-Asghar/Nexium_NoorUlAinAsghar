"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [auth, setAuth]=useState(false);

  useEffect(() => {
    // Check if a session exists (i.e., user signed in via magic link)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuth(true)
      }
    });
  }, [router]);

  useEffect(() => {
    const hash = window.location.hash;
    //if unautherized, ask to login again
    if (hash.includes("error=access_denied") && hash.includes("otp_expired")) {
      router.replace("/sign-in?error=access_denied");
    }
  }, [router]);

  return (
  <>
    <div className="min-h-[66vh] flex flex-col items-center justify-center gap-6 bg-gradient-to-r from-[#008080] to-[#00f5f5] text-white text-center px-4">
      <h1 className="font-dancing text-5xl md:text-6xl font-semibold">
        Welcome to <span className="text-black">Pitch Writer</span>
      </h1>
      <p className="text-lg md:text-xl max-w-2xl">
        Craft your perfect pitch in seconds — whether it&apos;s for your startup, a job application, or even a school project.
      </p>

      <Link href={auth?"/generate":"/sign-in"} passHref>
        <Button
          className="font-dancing bg-black text-white font-black text-2xl px-5 py-5 rounded-2xl hover:bg-black cursor-pointer active:bg-transparent active:text-black"
        >
          Generate
        </Button>
      </Link>
    </div>

    <section className="py-16 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 font-dancing text-[#008080]">Features</h2>
        <p className="text-lg text-gray-600 mb-12">Everything you need to craft a perfect pitch in seconds.</p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="bg-gradient-to-b from-teal-300 to-teal-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI-powered Pitching</h3>
            <p className="text-gray-600">Leverage smart AI to generate concise and impactful pitches effortlessly.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gradient-to-br from-teal-300 to-teal-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Audience Tailoring</h3>
            <p className="text-gray-600">Personalize pitches for investors, recruiters, or teachers with just one click.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gradient-to-bl from-teal-300 to-teal-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast & Simple</h3>
            <p className="text-gray-600">No clutter. Just enter your input and get results in seconds.</p>
          </div>
        </div>
      </div>
    </section>
  </>
  );
}
