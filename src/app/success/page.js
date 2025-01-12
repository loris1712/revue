'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db, storage } from '../../../lib/firebaseClient';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { supabase } from '../../../lib/supabaseClient';
import CheckoutButton from '../components/stripe/checkoutButton';

export default function SignUp() {

  return (
    <div className="min-h-screen flex items-center justify-center" style={{background: '#030711'}}>
      <div className="w-full max-w-md px-8">
        <div className="flex justify-center mb-8">
          <img src="/revue_logo.png" alt="Company Logo" className="h-12 w-auto" />
        </div>
        <h1 className="text-3xl font-semibold text-white text-left mb-2">
          Thank you for signing up for Revue!
        </h1>
        <p className="text-left text-[#7F8EA3] mb-4">
          We have sent an email to your inbox to complete your account registration.
        </p>

        <div className="text-center text-[#7F8EA3] mt-8">
          © 2024 Company, Inc.
        </div>
      </div>
    </div>
  );
}
