'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { db } from '../../../lib/firebaseClient';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';

export default function Settings() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [customerType, setCustomerType] = useState('');
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();

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
          }
        } else {
          router.push('/loginBS'); // Reindirizza alla pagina di login se l'utente non è autenticato
        }
      } catch (error) {
        console.error('Error fetching user or profile:', error.message || error);
      } finally {
        setLoading(false); // Fine del caricamento
      }
    }

    fetchUserAndProfile();
  }, [router]);

  const handleSave = async () => {
    try {
      // Salva o aggiorna i dati in Firebase
      const docRef = doc(db, 'restaurant_profiles', userId);
      await setDoc(docRef, {
        email,
        customerType,
      }, { merge: true }); // Usa merge per non sovrascrivere altri dati esistenti
      setSuccessMessage('Settings saved successfully!');
      setTimeout(() => setSuccessMessage(null), 3000); // Nascondi il messaggio di successo dopo 3 secondi
    } catch (error) {
      console.error('Error saving settings:', error.message || error);
      alert('Error saving settings.');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen md:flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="md:p-10 text-white bg-white pt-10 pl-4 pr-4 md:w-[83%] md:ml-auto h-[100vh]">
        <h1 className="text-3xl font-bold text-[#030711]">Hello, Company Name</h1>
        <h1 className="text-2xl font-light mb-6 text-[#030711]">Settings Area</h1>

        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Contact Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Customer Type */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerType">
              Customer Type
            </label>
            <select
              id="customerType"
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="" disabled>Select a type</option>
              <option value="restaurant">Restaurant</option>
              <option value="disco">Disco</option>
              <option value="bar">Bar</option>
              <option value="cafe">Cafe</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-[fit-content] bg-blue-500 text-white px-6 py-2 rounded-[100px] hover:bg-blue-600 transition"
          >
            Save Settings
          </button>

          {/* Success Message */}
          {successMessage && (
            <p className="text-green-500 text-sm mt-4">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}