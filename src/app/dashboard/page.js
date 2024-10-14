// app/dashboard/page.js
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/loginBS');
      } else {
        setSession(session);
      }
    };
    fetchSession();
  }, [router]);

  return (
    <div className="dashboard-container">
      {session ? <h1>Welcome to your dashboard</h1> : <p>Loading...</p>}
    </div>
  );
}