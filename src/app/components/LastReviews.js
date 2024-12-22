import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebaseClient';
import { doc, getDoc } from 'firebase/firestore';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';
import ReviewPopup from './ReviewGroup'; // Import del componente popup

export default function LastReviews() {
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null); // Stato per la recensione selezionata

  useEffect(() => {
    async function fetchUserIdAndReviews() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        await fetchReviews(user.id);
      }
      setLoading(false);
    }
    fetchUserIdAndReviews();
  }, []);

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

  const handleReviewClick = (review) => {
    setSelectedReview(review); // Mostra il popup con la recensione selezionata
  };

  const closePopup = () => {
    setSelectedReview(null); // Chiudi il popup
  };

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="mb-10">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl text-[#fff] font-semibold">Last Reviews</h2>
        <Link href="/reviews" className="ml-auto text-[#3571FF]">
          View All &nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-3 w-3 ml-auto fill-[#3571FF] inline">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </Link>
      </div>

      {/* Contenitore scorrevole delle recensioni */}
      <div className="flex space-x-4 overflow-x-scroll md:w-[100%] w-[92vw]">
        {reviews.length > 0 ? (
          reviews.slice(0, 6).map((review) => (
            <div
              key={review.id}
              className="bg-[#0b16339c] rounded-lg p-4 w-64 flex-shrink-0 border border-[#0f172a] cursor-pointer"
              onClick={() => handleReviewClick(review)}
            >
              <p className="text-[#7F8EA3] text-xs mb-2">{review.date}</p>
              <p className="text-white">
                {review.review.length > 100
                  ? `${review.review.substring(0, 100)}...`
                  : review.review}
              </p>
            </div>
          ))
        ) : (
          <p className="text-[#7F8EA3] text-center w-full">
            No reviews yet. Share your link or QR code with your customers to start collecting reviews!
          </p>
        )}
      </div>

      {/* Popup per la recensione completa */}
      {selectedReview && (
        <ReviewPopup review={selectedReview} onClose={closePopup} />
      )}
    </div>
  );
}