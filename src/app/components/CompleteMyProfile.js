'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebaseClient';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function CompleteMyProfile({ userId }) {
  const [missingFields, setMissingFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      if (!userId) return;
      try {
        const docRef = doc(db, 'restaurant_profiles', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const profileData = docSnap.data();
          checkMissingFields(profileData);
        } else {
          setMissingFields(['Instagram', 'Facebook', 'Website', 'Google Reviews', 'TripAdvisor', 'Yelp']);
        }
      } catch (error) {
        console.error('Error fetching profile:', error.message || error);
      } finally {
        setLoading(false);
      }
    }

    function checkMissingFields(data) {
      const fields = [
        { key: 'instagram', label: 'Instagram' },
        { key: 'facebook', label: 'Facebook' },
        { key: 'website', label: 'Website' },
        { key: 'googleReviews', label: 'Google Reviews' },
        { key: 'tripAdvisor', label: 'TripAdvisor' },
        { key: 'yelp', label: 'Yelp' },
      ];
      const missing = fields.filter((field) => !data[field.key]).map((field) => field.label);
      setMissingFields(missing);
    }

    fetchProfile();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shadow-lg bg-[#0b16339c] rounded-lg p-6 flex-shrink-0 border border-[#0f172a] mb-8">
      <h2 className="text-xl font-bold">Complete your profile</h2>
      {missingFields.length > 0 ? (
        <>
          <p className="text-red-500 text-[12px]">You are missing the following information:</p>
          <ul className="list-disc ml-6 mb-4 text-gray-700">
            {missingFields.map((field) => (
              <li className="text-white text-[14px]" key={field}>{field}</li>
            ))}
          </ul>
          <button
            onClick={() => router.push('/settings')}
            className="bg-blue-500 text-[14px] text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Complete Profile in Settings
          </button>
        </>
      ) : (
        <p className="text-green-500">Your profile is complete!</p>
      )}
    </div>
  );
}
