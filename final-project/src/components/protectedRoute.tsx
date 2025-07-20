// components/ProtectedRoute.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/sign-in?error=unauthorized");
      } else {
        setSession(session);
      }

      setLoading(false);
    };

    checkSession();
  }, [router, supabase]);

  if (loading) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return <>{children}</>;
}
