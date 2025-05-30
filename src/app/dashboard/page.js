'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import LastReviews from '../components/LastReviews';
import Header from '../components/Header';
import HeaderMobile from '../components/HeaderMobile';
import Packs from '../components/Packs';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import CompleteMyProfile from '../components/CompleteMyProfile';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebaseClient';
import QrCodeComponent from '../components/QrCodeComponent';

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [userId, setUserId] = useState('');

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
    async function fetchUserAndProfile() {
      try {
        // Ottieni l'utente attualmente autenticato
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;

        if (user) {
          setUserId(user.id);

          // Verifica se esiste un documento per l'utente
          const docRef = doc(db, 'restaurant_profiles', user.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const profileData = docSnap.data();
            setEmail(profileData.email || ''); // Compila l'email esistente
            setCustomerType(profileData.customerType || ''); // Compila il tipo di cliente
            setName(profileData.name || '');
            setCategory(profileData.category || '');
            setAddress(profileData.address || '');
          }
        } else {
          router.push('/loginBS'); // Reindirizza alla pagina di login se l'utente non è autenticato
        }
      } catch (error) {
        console.error('Error fetching user or profile:', error.message || error);
      }
    }

    fetchUserAndProfile();
  }, [router]);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setQrCodeUrl('https://www.revuetool.com/customers?userId='+userId);
    }

    const handleScroll = () => {
      // Mostra la navbar se scorri più di 50px, nascondila altrimenti
      setShowNav(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [userId]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen md:flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="md:p-10 text-white bg-[#060911] pt-10 pl-4 pr-4 md:w-[83%] md:ml-auto">
        {/* Sticky Navbar */}
        {showNav && (
          <div className="fixed top-0 md:left-[16%] md:w-[84%] w-full left-0 bg-[#060911] text-white py-4 px-8 shadow-lg z-50">
            <HeaderMobile />
            <p className="text-[12px] font-light">Dashboard</p>
          </div>
        )}

        {/* Main Content */}
        <Header />
        <h1 className="text-2xl font-light mb-6 text-[#fff]">Here is your Dashboard</h1>

        <CompleteMyProfile userId={userId} />

        <QrCodeComponent qrCodeUrl={qrCodeUrl} />


        {/* Last Reviews */}
        <LastReviews />

        {/* Packs */}
        <Packs />
      </div>
    </div>
  );
}