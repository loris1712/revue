import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebaseClient';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { supabase } from '../../../lib/supabaseClient';
import AddPackPopup from './AddPackPopup'; // Importa il componente popup

export default function Packs() {
  const [packs, setPacks] = useState([]); // Stato per i pacchetti recuperati da Firebase
  const [selectedPack, setSelectedPack] = useState(null); // Stato per il pacchetto selezionato
  const [userId, setUserId] = useState(null); // Stato per l'ID dell'utente
  const [loading, setLoading] = useState(true); // Stato per il caricamento
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Stato per il controllo della visibilità del popup
  const [currentPackData, setCurrentPackData] = useState(null); // Dati del pacchetto da modificare

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

  // Recupera tutti i pacchetti dalla collezione "packs"
  const fetchPacks = async () => {
    try {
      const packsCollection = collection(db, 'packs');
      const packsSnapshot = await getDocs(packsCollection);
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

  // Funzione per aprire il popup per aggiungere un pacchetto
  const openAddPackPopup = () => {
    setCurrentPackData(null);
    setIsPopupOpen(true);
  };

  // Funzione per aprire il popup per modificare un pacchetto
  const openEditPackPopup = (packData) => {
    setCurrentPackData(packData); // Imposta i dati del pacchetto da modificare
    setIsPopupOpen(true);
  };

  // Funzione per gestire la selezione del pacchetto
  const handleSelectPack = async (packId) => {
    if (userId) {
      try {
        const docRef = doc(db, 'restaurants_packs', userId);
        await setDoc(docRef, { questions_pack: packId }, { merge: true });
        setSelectedPack(packId); // Aggiorna lo stato del pacchetto selezionato
      } catch (error) {
        console.error('Errore nella selezione del pacchetto:', error);
      }
    }
  };

  // Funzione di salvataggio dopo la creazione o modifica di un pacchetto
  const handleSavePack = (newPackData) => {
    setPacks((prevPacks) => {
      if (currentPackData) {
        return prevPacks.map((pack) =>
          pack.id === currentPackData.id ? { ...pack, ...newPackData } : pack
        );
      }
      return [...prevPacks, newPackData];
    });
  };

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="mb-10">
      <div className="flex items-center mb-4">
        <h2 className="text-xl text-[#030711] font-semibold">Packs</h2>
        <button
          onClick={openAddPackPopup}
          className="ml-4 px-4 py-2 bg-[#3471FF] text-white rounded-md text-[14px] ml-auto"
        >
          Add Pack
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {packs.map((pack) => (
          <div key={pack.id} className="relative p-4 bg-[#030711] rounded-lg">
            <p className="text-[#7F8EA3] text-xs mb-2">{pack.category}</p>
            <h3 className="text-white text-lg">{pack.title}</h3>

            <div className="mt-2 flex space-x-2">
              {/* Tasto Modifica */}
              <button
                onClick={() => openEditPackPopup(pack)}
                className="px-4 py-2 bg-[#3471FF] text-white rounded-md text-sm w-[50%]"
              >
                Edit
              </button>

              {/* Tasto Seleziona */}
              <button
                onClick={() => handleSelectPack(pack.id)}
                className={`px-4 py-2 text-white rounded-md text-sm w-[50%]
                  ${selectedPack === pack.id ? 'bg-green-500' : 'bg-gray-500'}`}
              >
                {selectedPack === pack.id ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup per aggiungere/modificare un pacchetto */}
      <AddPackPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        packData={currentPackData}
        onSave={handleSavePack}
      />
    </div>
  );
}
