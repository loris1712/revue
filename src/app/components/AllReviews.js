import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebaseClient'; // Assicurati che il percorso sia corretto
import { doc, getDoc } from 'firebase/firestore';
import { supabase } from '../../../lib/supabaseClient';
import ReviewPopup from './ReviewGroup'; // Import del componente popup

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Stato per gestire il popup
  const [selectedReview, setSelectedReview] = useState(null); // Stato per la recensione selezionata

  // Recupera l'ID dell'utente e le recensioni
  useEffect(() => {
    async function fetchUserIdAndReviews() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        await fetchReviews(user.id); // Recupera le recensioni
      }
      setLoading(false);
    }
    fetchUserIdAndReviews();
  }, []);

  // Recupera le recensioni dalla collezione "restaurant_reviews" per l'utente
  const fetchReviews = async (userId) => {
    try {
      const docRef = doc(db, 'restaurant_reviews', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setReviews(docSnap.data().reviews);
      }
    } catch (error) {
      console.error('Errore nel recupero delle recensioni:', error);
    }
  };

  // Gestisci l'apertura del popup
  const openPopup = (review) => {
    setSelectedReview(review);
    setIsPopupOpen(true);
  };

  // Gestisci la chiusura del popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedReview(null);
  };

  // Funzione per troncare il testo delle recensioni con i puntini sospensivi
  const truncateReview = (reviewText) => {
    const maxLength = 100;
    if (reviewText.length > maxLength) {
      return reviewText.substring(0, maxLength) + '...';
    }
    return reviewText;
  };

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="mb-10">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl text-[#030711] font-semibold">All Reviews</h2>
      </div>

      {/* Contenitore delle recensioni in griglia */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="bg-[#0b16339c] rounded-lg p-4 flex-shrink-0 border border-[#0f172a] cursor-pointer"
            onClick={() => openPopup(review)} // Aggiungi l'evento di click
          >
            <p className="text-[#7F8EA3] text-xs mb-2">{review.date}</p>
            <p className="text-white">{truncateReview(review.review)}</p>
          </div>
        ))}
      </div>

      {/* Popup per visualizzare la recensione completa */}
      {isPopupOpen && <ReviewPopup review={selectedReview} onClose={closePopup} />}
    </div>
  );
}
