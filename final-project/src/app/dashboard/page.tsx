"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/protectedRoute";
import { getUserPitchesWithEmail } from "@/lib/pitch-db";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [pitches, setPitches] = useState<any[]>([]);
  const [count,setCount]=useState(0)
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getUserPitchesWithEmail();
        setUserEmail(data?.email || "Guest");
        setPitches(data?.pitches || []);
        setCount(data?.count || 0);
      } catch (error) {
        console.error("Failed to get Data", error);
      }
    };

    getData();
  }, []);

  const handleNewPitch = () => {
    router.push("/generate");
  };



  return (
    <ProtectedRoute>
      <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold mb-2 text-black font-dancing">Dashboard</h1>
              <p className="text-gray-600">Welcome, <span className="font-medium text-[#008080]">{userEmail}</span></p>
            </div>
            <button
              onClick={handleNewPitch}
              className="px-3 py-3 bg-[#008080] text-white rounded-md shadow-md hover:bg-teal-800"
            >
              + Generate New Pitch
            </button>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Total Pitches</h2>
              <p className="text-2xl font-bold text-[#008080]">{count}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Previous Pitches</h2>
            {pitches.length === 0 ? (
              <p className="text-gray-500">You haven't generated any pitches yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pitches.map((pitch,i) => (
                  <div
                    key={i}
                    className="bg-[#008080] text-white p-4 rounded-md  hover:drop-shadow-2xl transition hover:cursor-pointer"
                  >
                    <h3 className="font-medium truncate">
                      {pitch.title || "Untitled Pitch"}
                    </h3>
                    <p className="text-sm text-white mt-1 italic truncate">{pitch.body}</p>
                    <p className="mt-6 text-xs text-gray-100">
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
