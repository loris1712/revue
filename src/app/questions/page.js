// app/questions/page.js
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import LastReviews from '../components/LastReviews';
import AllPacks from '../components/AllPacks';
import Header from '../components/Header';
import HeaderMobile from '../components/HeaderMobile';

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const router = useRouter();
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostra la navbar se scorri più di 50px, nascondila altrimenti
      setShowNav(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="min-h-screen md:flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="md:p-10 text-white bg-[#060911] pt-10 pl-4 pr-4 md:w-[83%] md:ml-auto h-[100vh]">
      {showNav && (
          <div className="fixed top-0 md:left-[16%] md:w-[84%] w-full left-0 bg-[#060911] text-white py-4 px-8 shadow-lg z-50">
            <HeaderMobile />
            <p className="text-[12px] font-light">Questions Area</p>
          </div>
        )}

        <Header />
        <h1 className="text-2xl font-light mb-6 text-[#fff]">Questions Area</h1>

        {/* Packs */}
        <AllPacks />
      </div>
    </div>
  );
}