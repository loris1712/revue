'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import LastReviews from '../components/LastReviews';
import Packs from '../components/Packs';
import { QRCodeSVG } from 'qrcode.react';

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [showNav, setShowNav] = useState(false); // Stato per controllare la visibilità della navbar

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

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setQrCodeUrl(window.location.href);
    }

    const handleScroll = () => {
      // Mostra la navbar se scorri più di 50px, nascondila altrimenti
      setShowNav(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiato negli appunti!');
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen md:flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="md:p-10 text-white bg-white pt-10 pl-4 pr-4 md:w-[83%] md:ml-auto">
        {/* Sticky Navbar */}
        {showNav && (
          <div className="fixed top-0 md:left-[16%] md:w-[84%] w-full left-0 bg-[#060911] text-white py-4 px-8 shadow-lg z-50">
            <h1 className="text-[16px] font-bold">Company Name</h1>
            <p className="text-[12px] font-light">Dashboard</p>
          </div>
        )}

        {/* Main Content */}
        <h1 className="text-3xl font-bold text-[#030711]">Hello, Company Name</h1>
        <h1 className="text-2xl font-light mb-6 text-[#030711]">Here is your Dashboard</h1>

        {/* New Section */}
        <div className="bg-[#3471FF] p-8 rounded-lg mb-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Share Your Link with Friends!</h2>
            <p className="mb-4 text-[14px]">
              Share this unique link with your friends and customers to let them access your services easily. 
              Copy the link and share it on social media or via messaging apps!
            </p>
            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="bg-white text-[#3471FF] px-6 py-2 rounded-[100px] shadow-md hover:bg-gray-200 text-[14px]"
            >
              Copy Link
            </button>
          </div>

          {/* QR Code */}
          <div className="mt-6 md:mt-0 md:w-100 flex flex-end">
            <QRCodeSVG value={qrCodeUrl} />
          </div>
        </div>

        {/* Last Reviews */}
        <LastReviews />

        {/* Packs */}
        <Packs />
      </div>
    </div>
  );
}