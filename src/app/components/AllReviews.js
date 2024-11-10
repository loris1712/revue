// app/components/AllReviews.js
import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebaseClient'; // Assicurati che il percorso sia corretto
import { collection, doc, getDoc } from 'firebase/firestore';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';

export default function LastReviews() {
  const [reviews, setReviews] = useState([]); // Stato per le recensioni recuperate
  const [userId, setUserId] = useState(null); // Stato per l'ID dell'utente
  const [loading, setLoading] = useState(true); // Stato per il caricamento

  // Recupera l'ID dell'utente e le recensioni
  useEffect(() => {
    async function fetchUserIdAndReviews() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        await fetchReviews(user.id); // Recupera le recensioni
      }
      setLoading(false); // Caricamento completato
    }
    fetchUserIdAndReviews();
  }, []);

  // Recupera le recensioni dalla collezione "restaurant_reviews" per l'utente
  const fetchReviews = async (userId) => {
    try {
      const docRef = doc(db, 'restaurant_reviews', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setReviews(docSnap.data().reviews); // Imposta le recensioni nello stato
      }
    } catch (error) {
      console.error('Errore nel recupero delle recensioni:', error);
    }
  };

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="mb-10">
      <div className="flex items-center mb-4">
        <h2 className="text-xl text-[#030711] font-semibold">Last Reviews</h2>
      </div>

      {/* Contenitore delle recensioni in griglia */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {reviews.slice(0, 6).map((review) => (
          <div key={review.id} className="bg-[#030711] rounded-lg p-4">
            <p className="text-[#7F8EA3] text-xs mb-2">{review.date}</p>
            <p className="text-white">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
