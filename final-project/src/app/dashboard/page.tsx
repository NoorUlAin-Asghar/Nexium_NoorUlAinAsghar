"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import ProtectedRoute from "@/components/protectedRoute";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [pitches, setPitches] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndPitches = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
        const { data, error } = await supabase
          .from("pitches")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        if (!error) {
          setPitches(data || []);
        }
      }
    };

    fetchUserAndPitches();
  }, []);

  const handleNewPitch = () => {
    router.push("/generate");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold mb-2 text-[#008080] font-dancing">Dashboard</h1>
              <p className="text-gray-600">Welcome, <span className="font-medium text-teal-700">{userEmail}</span></p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Logout
            </button>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Total Pitches</h2>
              <p className="text-2xl font-bold text-teal-700">{pitches.length}</p>
            </div>
            <button
              onClick={handleNewPitch}
              className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              + Generate New Pitch
            </button>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Previous Pitches</h2>
            {pitches.length === 0 ? (
              <p className="text-gray-500">You haven’t generated any pitches yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pitches.map((pitch) => (
                  <div
                    key={pitch.id}
                    className="bg-white p-4 rounded-md shadow-sm border hover:shadow-md transition"
                  >
                    <h3 className="font-medium text-gray-900 truncate">
                      {pitch.title || "Untitled Pitch"}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 truncate">{pitch.summary}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(pitch.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
