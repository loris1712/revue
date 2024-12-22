'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import LastReviews from './LastReviews';
import Packs from './Packs';
import { QRCodeSVG } from 'qrcode.react';
import CompleteMyProfile from './CompleteMyProfile';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebaseClient';

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');

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
            setName(profileData.name || '');
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

  return (
    <div className="">
        {/* Main Content */}
        <h1 className="text-[16px] font-bold">{name}</h1>
    </div>
  );
}