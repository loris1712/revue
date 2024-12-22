'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { db } from '../../../lib/firebaseClient';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import HeaderMobile from '../components/HeaderMobile';
import Header from '../components/Header';

export default function Settings() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [customerType, setCustomerType] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [website, setWebsite] = useState('');
  const [tiktok, setTikTok] = useState('');
  const [googleReviews, setGoogleReviews] = useState('');
  const [yelp, setYelp] = useState('');
  const [tripAdvisor, setTripAdvisor] = useState('');
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [seats, setSeats] = useState(0);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const router = useRouter();
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostra la navbar se scorri più di 50px, nascondila altrimenti
      setShowNav(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function fetchUserAndProfile() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;

        if (user) {
          setUserId(user.id);

          const docRef = doc(db, 'restaurant_profiles', user.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const profileData = docSnap.data();

            console.log(profileData)
            setEmail(user.email || '');
            setCustomerType(profileData.customerType || '');
            setName(profileData.name || '');
            setCategory(profileData.category || '');
            setAddress(profileData.address || '');
            setInstagram(profileData.instagram || '');
            setFacebook(profileData.facebook || '');
            setWebsite(profileData.website || '');
            setTikTok(profileData.tiktok || '');
            setGoogleReviews(profileData.googleReviews || '');
            setYelp(profileData.yelp || '');
            setTripAdvisor(profileData.tripAdvisor || '');
            setPaymentOptions(profileData.paymentOptions || []);
            setSeats(profileData.seats || 0);
          }
        } else {
          router.push('/loginBS');
        }
      } catch (error) {
        console.error('Error fetching user or profile:', error.message || error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserAndProfile();
  }, [router]);

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'restaurant_profiles', userId);
      await setDoc(docRef, {
        email,
        customerType,
        name,
        category,
        address,
        instagram,
        facebook,
        website,
        tiktok,
        googleReviews,
        yelp,
        tripAdvisor,
        paymentOptions,
        seats,
      }, { merge: true });
      setSuccessMessage('Settings saved successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
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
      <Sidebar />

      <div className="md:p-10 text-white bg-[#060911] pt-10 pl-4 pr-4 md:w-[83%] md:ml-auto h-[100vh] md:mt-0 mt-8">
        {showNav && (
          <div className="fixed top-0 md:left-[16%] md:w-[84%] w-full left-0 bg-[#060911] text-white py-4 px-8 shadow-lg z-50">
            <HeaderMobile />
            <p className="text-[12px] font-light">Settings Area</p>
          </div>
        )}
        <Header />
        <h1 className="text-2xl font-light mb-6 text-[#fff]">Settings Area</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          {['info', 'owner', 'social', 'platforms'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="rounded-lg shadow-lg w-full">
          {activeTab === 'info' && (
            <>
              {/* Email */}
              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="email">Contact Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>

              {/* Customer Type */}
              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="customerType">Category</label>
                <select
                  id="customerType"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="disco">Disco</option>
                  <option value="bar">Bar</option>
                  <option value="cafe">Cafe</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Payment Options */}
              <div className="mb-4">
                <label className="text-white text-sm mb-2">Payment Options</label>
                <div className="flex flex-wrap gap-4">
                  {['cash', 'card', 'online'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={option}
                        value={option}
                        checked={paymentOptions.includes(option)}
                        onChange={() => handlePaymentOptionChange(option)}
                        className="mr-2"
                      />
                      <label htmlFor={option} className="text-white">{option.charAt(0).toUpperCase() + option.slice(1)}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seats */}
              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="seats">Seats</label>
                <input
                  type="number"
                  id="seats"
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>
            </>
          )}

          {activeTab === 'owner' && (
            <>
              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="name">Full name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>
            </>
          )}

          {activeTab === 'social' && (
            <>
              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="instagram">Instagram</label>
                <input
                  type="text"
                  id="instagram"
                  placeholder="Instagram link"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="facebook">Facebook</label>
                <input
                  type="text"
                  id="facebook"
                  placeholder="Facebook link"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  placeholder="Website link"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="tiktok">TikTok</label>
                <input
                  type="text"
                  id="tiktok"
                  placeholder="TikTok link"
                  value={tiktok}
                  onChange={(e) => setTikTok(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>
            </>
          )}

          {activeTab === 'platforms' && (
            <>
              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="googleReviews">Google Reviews</label>
                <input
                  type="text"
                  id="googleReviews"
                  placeholder="Google Reviews link"
                  value={googleReviews}
                  onChange={(e) => setGoogleReviews(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="yelp">Yelp</label>
                <input
                  type="text"
                  id="yelp"
                  placeholder="Yelp link"
                  value={yelp}
                  onChange={(e) => setYelp(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="tripAdvisor">TripAdvisor</label>
                <input
                  type="text"
                  id="tripAdvisor"
                  placeholder="TripAdvisor link"
                  value={tripAdvisor}
                  onChange={(e) => setTripAdvisor(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>
            </>
          )}

          <button
            onClick={handleSave}
            className="w-[fit-content] bg-blue-500 text-white px-6 py-2 rounded-[100px] hover:bg-blue-600 transition"
          >
            Save Settings
          </button>

          {successMessage && (
            <p className="text-green-500 text-sm mt-4">{successMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}