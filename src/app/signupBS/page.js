'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db, storage } from '../../../lib/firebaseClient';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { supabase } from '../../../lib/supabaseClient';

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [restaurantData, setRestaurantData] = useState({
    name: '',
    category: [],
    address: '',
    phone: '',
    email: '',
    logo: null,
    cuisine: '',
    seats: '',
    paymentOptions: [],
    delivery: [],
    socialMedia: '',
    ownerName: '',
    ownerEmail: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === 'checkbox' || e.target.type === 'select-multiple') {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setRestaurantData((prevState) => ({ ...prevState, [name]: selectedOptions }));
    } else {
      setRestaurantData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setRestaurantData((prevState) => ({ ...prevState, logo: file }));
  };

  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (restaurantData.password !== restaurantData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
  
    try {
      // Crea account su Supabase
      const { data, error } = await supabase.auth.signUp({
        email: restaurantData.ownerEmail,
        password: restaurantData.password,
      });
  
      if (error) {
        setErrorMessage(error.message);
        return;
      }
  
      const userId = data.user.id; // Usa l'ID generato da Supabase
  
      // Salva i dati nel database Firebase
      const docRef = doc(db, 'restaurant_profiles', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setErrorMessage('Questo ristorante è già registrato con questo account.');
        return;
      }
  
      // Salva i dati nel database Firebase senza il logo
      await setDoc(docRef, {
        ...restaurantData,
        logo: null, // Logo è nullo poiché non lo stiamo salvando
        userId, // Salva l'ID dell'utente Supabase
      });

      setSuccessMessage('We have sent you a confirmation email.');

      //router.push('/dashboard');
    } catch (e) {
      console.error('Errore durante la registrazione:', e);
      setErrorMessage('Si è verificato un errore durante la registrazione.');
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const updatedOptions = checked
      ? [...restaurantData.paymentOptions, value]
      : restaurantData.paymentOptions.filter((option) => option !== value);
  
    setRestaurantData({ ...restaurantData, paymentOptions: updatedOptions });
  };  

  if (!mounted) {
    return null;
  }

  const progress = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-[#030711] flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        <div className="flex justify-center mb-8">
          <img src="/revue_logo.png" alt="Company Logo" className="h-12 w-auto" />
        </div>
        <h1 className="text-3xl font-semibold text-white text-left mb-2">
          Welcome to Revue! 👋
        </h1>
        <p className="text-left text-[#7F8EA3] mb-4">
          Create an account as a business owner and start your journey with us.
        </p>
        <div className="w-full bg-gray-300 h-2 rounded-lg mb-6">
          <div
            className="h-2 bg-[#3571FF] rounded-lg"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="mb-4">
                <label htmlFor="name">Spot Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={restaurantData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                  placeholder="Spot Name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  value={restaurantData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="cafe">Cafe</option>
                  <option value="bar">Bar</option>
                  <option value="fast_food">Fast Food</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={restaurantData.address}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                  placeholder="Address"
                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="mb-4">
                <label htmlFor="seats">Seats</label>
                <input
                  type="number"
                  name="seats"
                  id="seats"
                  value={restaurantData.seats}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                  placeholder="Seats"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="paymentOptions">Payment Options</label>
                <div className="w-full bg-transparent text-black rounded-lg text-white mt-2">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="cash"
                      name="paymentOptions"
                      value="cash"
                      checked={restaurantData.paymentOptions.includes("cash")}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <label htmlFor="cash">Cash</label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="card"
                      name="paymentOptions"
                      value="card"
                      checked={restaurantData.paymentOptions.includes("card")}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <label htmlFor="card">Card</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="online"
                      name="paymentOptions"
                      value="online"
                      checked={restaurantData.paymentOptions.includes("online")}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <label htmlFor="online">Online Payment</label>
                  </div>
                </div>
              </div>

            </>
          )}
          {step === 3 && (
            <>
              <div className="mb-4">
                <label htmlFor="ownerName">Owner's Full Name</label>
                <input
                  type="text"
                  name="ownerName"
                  id="ownerName"
                  value={restaurantData.ownerName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                  placeholder="Owner's Full Name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="ownerEmail">Owner's Email</label>
                <input
                  type="email"
                  name="ownerEmail"
                  id="ownerEmail"
                  value={restaurantData.ownerEmail}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                  placeholder="Owner's Email"
                />
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <div className="mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={restaurantData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                  placeholder="Password"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={restaurantData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                  placeholder="Confirm Password"
                />
              </div>
            </>
          )}
          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePreviousStep}
                className="bg-transparent text-white py-2 px-4 rounded-full"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={step === 4 ? handleSubmit : handleNextStep}
              className="bg-[#3571FF] text-white py-3 px-4 rounded-full hover:bg-[#265ecf] transition duration-200"
            >
              {step === 5 ? 'Complete' : 'Next'}
            </button>
          </div>
        </form>

        <p className="text-center text-[#7F8EA3] mt-6">
          Do you have an account?{' '}
          <a href="/loginBS" className="text-[#3571FF] hover:underline">
            Sign in
          </a>
        </p>

        <div className="text-center text-[#7F8EA3] mt-8">
          © 2024 Company, Inc.
        </div>
      </div>
    </div>
  );
}
