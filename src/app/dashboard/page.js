'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import LastReviews from '../components/LastReviews';
import Packs from '../components/Packs';
import {QRCodeSVG} from 'qrcode.react';

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(''); // Stato per conservare l'URL da passare al QRCode
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // Stato per verificare se siamo nel client

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

  // Imposta lo stato `isClient` a true quando il componente è montato
  useEffect(() => {
    setIsClient(true);
    // Imposta l'URL per il QR code dopo il montaggio del componente
    if (typeof window !== 'undefined') {
      setQrCodeUrl(window.location.href); // Ottieni l'URL corrente
    }
  }, []);

  // Funzione per copiare il link negli appunti
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href); // Copia l'URL corrente
      alert('Link copiato negli appunti!'); // Mostra un messaggio di conferma
    }
  };

  if (!isClient) {
    return null; // Evita di rendere la sezione finché non siamo nel client
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 md:p-10 text-white bg-white pt-20 pl-4 pr-4">
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
              className="bg-white text-[#3471FF] px-6 py-2 rounded-md shadow-md hover:bg-gray-200 text-[14px]"
            >
              Copy Link
            </button>
          </div>

          {/* QR Code */}
          <div className="mt-6 md:mt-0 md:w-100 flex flex-end">
            {/* QR Code generato solo dopo che isClient è true */}
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
