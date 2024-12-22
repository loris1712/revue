// app/components/Packs.js
import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebaseClient'; // Assicurati che il percorso sia corretto
import { collection, getDocs, query, limit } from 'firebase/firestore'; // Aggiungi limit per limitare i risultati
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';

export default function Packs() {
  const [packs, setPacks] = useState([]); // Stato per i pacchetti recuperati da Firebase
  const [selectedPack, setSelectedPack] = useState(null); // Stato per il pacchetto selezionato
  const [userId, setUserId] = useState(null); // Stato per l'ID dell'utente
  const [loading, setLoading] = useState(true); // Stato per il caricamento

  // Recupera l'ID dell'utente e il pacchetto selezionato
  useEffect(() => {
    async function fetchUserIdAndPack() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        await fetchPacks(); // Recupera i pacchetti
        await fetchSelectedPack(user.id); // Recupera il pacchetto selezionato
      }
      setLoading(false); // Caricamento completato
    }
    fetchUserIdAndPack();
  }, []);

  // Recupera i primi 6 pacchetti dalla collezione "packs"
  const fetchPacks = async () => {
    try {
      const packsCollection = collection(db, 'packs');
      const q = query(packsCollection, limit(6)); // Limita a 6 pacchetti
      const packsSnapshot = await getDocs(q);
      const packsData = packsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPacks(packsData);
    } catch (error) {
      console.error('Errore nel recupero dei pacchetti:', error);
    }
  };

  // Recupera il pacchetto selezionato da "restaurants_packs" per l'utente
  const fetchSelectedPack = async (userId) => {
    try {
      const docRef = doc(db, 'restaurants_packs', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSelectedPack(docSnap.data().questions_pack);
      }
    } catch (error) {
      console.error('Errore nel recupero del pacchetto selezionato:', error);
    }
  };

  // Gestione della selezione del pacchetto e salvataggio in "restaurants_packs"
  const handlePackSelect = async (packId) => {
    setSelectedPack(packId);
    try {
      if (userId) {
        const docRef = doc(db, 'restaurants_packs', userId);
        await setDoc(docRef, { questions_pack: packId }, { merge: true });
      }
    } catch (error) {
      console.error('Errore nel salvataggio del pacchetto selezionato:', error);
    }
  };

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="mb-10">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl text-[#fff] font-semibold">Packs</h2>
        <Link href="/questions" className="ml-auto text-[#3571FF]">
          View All &nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className={`h-3 w-3 ml-auto fill-[#3571FF] inline`}><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
        </Link>
      </div>

      {/* Contenitore scorrevole dei pacchetti */}
      <div className="flex space-x-4 overflow-x-scroll md:w-[100%] w-[92vw]">
        {packs.map((pack) => (
          <div
            key={pack.id}
            onClick={() => handlePackSelect(pack.id)}
            className={`rounded-lg p-4 w-64 h-64 flex-shrink-0 cursor-pointer  border
           border-[#0f172a]
              ${selectedPack === pack.id ? 'bg-[#3471FF]' : 'bg-[#0b16339c]'}`
            }
          >
            <p className="text-[#fff] text-xs mb-2">{pack.category}</p>
            <h3 className="text-white text-lg">{pack.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

