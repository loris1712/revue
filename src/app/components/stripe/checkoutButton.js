import React, { useState } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import { db } from '../../../../lib/firebaseClient'; // Assicurati che questo percorso sia corretto
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Importazioni Firebase

const CheckoutButton = ({ priceId, restaurantData }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Stato per il loader
  
  const handleCheckout = async () => {
    setIsLoading(true); // Mostra il loader
    try {
      // 1. Crea account su Supabase
      const { data, error } = await supabase.auth.signUp({
        email: restaurantData.ownerEmail,
        password: restaurantData.password,
        stripecustomerid: null, // Inizialmente senza Stripe customerId
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      const userId = data.user.id; // Usa l'ID generato da Supabase

      // 2. Crea il cliente in Stripe
      const stripeResponse = await fetch('/api/stripe/create-customer', { // Crea un endpoint API per questo
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: restaurantData.ownerEmail,
        }),
      });

      const stripeData = await stripeResponse.json();
      const customerId = stripeData.customerId; // Stripe customerId

      if (!customerId) {
        setErrorMessage('Errore nella creazione del cliente Stripe.');
        setIsLoading(false); // Nascondi il loader in caso di errore
        return;
      }

      // 3. Salva i dati nel database Firebase
      const docRef = doc(db, 'restaurant_profiles', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setErrorMessage('This restaurant is already registered with this account.');
        setIsLoading(false); // Nascondi il loader in caso di errore
        return;
      }

      // Salva i dati nel database Firebase senza il logo
      await setDoc(docRef, {
        ...restaurantData,
        logo: null, // Logo è nullo poiché non lo stiamo salvando
        userId, // Salva l'ID dell'utente Supabase
        subscriptionactive: true, // Imposta l'abbonamento come attivo
        stripecustomerid: customerId, // Salva l'ID del cliente Stripe
      });

      setSuccessMessage('We have sent you a confirmation email.');

      // 4. Creazione della sessione di checkout Stripe
      const checkoutResponse = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: priceId,
          customerId: customerId, // Passa il customerId di Stripe
          email: restaurantData.ownerEmail, // Passa l'email
          firstName: restaurantData.firstName, // Passa il nome
          lastName: restaurantData.lastName, // Passa il cognome
        }),
      });

      const { url } = await checkoutResponse.json();

      if (url) {
        // 5. Reindirizza al checkout di Stripe
        window.location.href = url;
      } else {
        setErrorMessage('Error in creating the payment session.');
      }
    } catch (error) {
      console.error('Errore durante il checkout:', error);
      setErrorMessage('An error occurred during checkout.');
    } finally {
      setIsLoading(false); // Nascondi il loader quando il processo è terminato
    }
  };

  return (
    <div className="relative">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      
      <button
        onClick={handleCheckout}
        className="bg-[#3571FF] text-[12px] mb-2 mt-2 text-white py-2 px-6 rounded-full hover:bg-[#265ecf] transition duration-200"
        >
        Proceed with payment
      </button>
      {/* Loader circolare */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#03071178] flex items-center justify-center z-10">
        <div className="text-white">Loading...</div>
      </div>
      )}
    </div>
  );
};

export default CheckoutButton;
