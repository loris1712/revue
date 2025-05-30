'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { db } from '../../../lib/firebaseClient';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import HeaderMobile from '../components/HeaderMobile';
import Header from '../components/Header';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

  const [subscription, setSubscription] = useState(null);
  const [payments, setPayments] = useState([]);

  const [error, setError] = useState('');

  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [locationType, setLocationType] = useState('');
  const [goalWithRevue, setGoalWithRevue] = useState('');
  const [reviewPreference, setReviewPreference] = useState('');
  const [preferredPlatform, setPreferredPlatform] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/stripe/subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email }),
        });        
        if (!response.ok) {
          throw new Error('Failed to fetch subscription data.');
        }
        const data = await response.json();
        setSubscription(data.subscription);
        console.log(data.subscription);
        setPayments(data.payments);
      } catch (error) {
        setError(error.message);
      }
    };

    if(email.length > 0)
    {
      fetchData();
    }
    
  }, [email]);

  const cancelSubscription = async () => {
    try {
      const response = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });
      if (!response.ok) {
        throw new Error('Failed to cancel subscription.');
      }
      alert('Subscription canceled successfully.');
      setSubscription(null); // Aggiorna lo stato
    } catch (error) {
      setError(error.message);
    }
  };

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

        console.log(user)

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
            setBusinessName(profileData.businessName || '')
            setPhone(profileData.phone || '')
            setBusinessAddress(profileData.businessAddress || '')
            setBusinessType(profileData.businessType || '')
            setLocationType(profileData.locationType || '')
            setGoalWithRevue(profileData.goalWithRevue || '')
            setReviewPreference(profileData.reviewPreference || '')
            setPreferredPlatform(profileData.preferredPlatform || '')
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
        businessName,
        phone,
        businessAddress,
        businessType,
        locationType,
        reviewPreference,
        preferredPlatform,
        goalWithRevue,
      }, { merge: true });
      alert('Settings saved successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error saving settings:', error.message || error);
      alert('Error saving settings.');
    }
  };

  const handlePaymentOptionChange = (option) => {
  setPaymentOptions((prevOptions) => {
    if (prevOptions.includes(option)) {
      return prevOptions.filter((item) => item !== option);
    } else {
      return [...prevOptions, option];
    }
  });
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
          {['info', 'owner', 'social', 'platforms', 'subscription'].map((tab) => (
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

              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="businessName">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  value={businessName}
                  placeholder="Business name"
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>

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

              {/* Business Address */}
              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="businessAddress">Business Address</label>
                <input
                  type="text"
                  id="businessAddress"
                  placeholder="Business address"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>

              {/* Business Type */}
              <div className="mb-4">
                <label className="text-white text-sm mb-2" htmlFor="businessType">Type of Business</label>
                <input
                  type="text"
                  id="businessType"
                  placeholder="Business type"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>

              {/* Location Type */}
              <div className="mb-4">
                <label className="text-white text-sm mb-2">Location Type</label>
                <select
                  value={locationType}
                  onChange={(e) => setLocationType(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                >
                  <option value="" disabled>Select one</option>
                  <option value="single">Single Location</option>
                  <option value="multiple">Multiple Locations</option>
                </select>
              </div>

              {/* Review Preference */}
              <div className="mb-4">
                <label className="text-white text-sm mb-2">Use Revue for</label>
                <select
                  value={reviewPreference}
                  onChange={(e) => setReviewPreference(e.target.value)}
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                >
                  <option value="" disabled>Select one</option>
                  <option value="reviews">Only Reviews</option>
                  <option value="statistics">Only Feedback Stats</option>
                  <option value="both">Both</option>
                </select>
              </div>

              {/* Preferred Review Platform */}
              <div className="mb-4">
                <label className="text-white text-sm mb-2">Preferred Platform for Reviews</label>
                <input
                  type="text"
                  value={preferredPlatform}
                  onChange={(e) => setPreferredPlatform(e.target.value)}
                  placeholder="e.g. Google, Yelp"
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                />
              </div>

              {/* Goals with Revue */}
              <div className="mb-4">
                <label className="text-white text-sm mb-2">What do you want to achieve with Revue?</label>
                <textarea
                  value={goalWithRevue}
                  onChange={(e) => setGoalWithRevue(e.target.value)}
                  placeholder="e.g. More 5-star reviews, Improve service based on feedback"
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

          {activeTab === 'subscription' && (
            <>
      {error && <p className="text-red-500">{error}</p>}

      {subscription ? (
        <div className="mb-6">
          <h2 className="text-[20px] font-semibold">Current Subscription</h2>
          <p>
            Plan: {subscription.plan.nickname} <br />
            Status: {subscription.status} <br />
            Renewal Date:{' '}
            {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
          </p>
          <button
            onClick={cancelSubscription}
            className="bg-red-500 hover:bg-red-600 text-white text-[12px] px-4 py-2 rounded-lg mt-4 rounded-3xl"
          >
            Cancel Subscription
          </button>
        </div>
      ) : (
        <p>No active subscription.</p>
      )}

      <div className="mb-4">
        <h2 className="text-[20px] font-semibold mb-2">Recent Payments</h2>
        {payments.length > 0 ? (
          <ul>
            {payments.map((payment) => (
              <li key={payment.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                <div>Amount: ${(payment.amount / 100).toFixed(2)}</div>
                <div>Status: {payment.status}</div>
                <div>Date: {new Date(payment.created * 1000).toLocaleDateString()}</div>
              </li>
            
            ))}
          </ul>
        ) : (
          <p>No payments found.</p>
        )}
      </div>
            </>
          )}

          <button
            onClick={handleSave}
            className="w-[fit-content] bg-blue-500 text-white px-6 py-2 rounded-[100px] hover:bg-blue-600 transition mb-12 mt-4"
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