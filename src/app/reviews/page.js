// app/dashboard/page.js
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import AllReviews from '../components/AllReviews';

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
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 md:p-10 text-white bg-white pt-20 pl-4 pr-4">
        <h1 className="text-3xl font-bold text-[#030711]">Hello, Company Name</h1>
        <h1 className="text-2xl font-light mb-6 text-[#030711]">Reviews Area</h1>

        {/* Last Reviews */}
        <AllReviews />
      </div>
    </div>
  );
}