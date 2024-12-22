'use client';

import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!email) {
      setErrorMessage('Please enter your email.');
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage('Check your email for a link to reset your password!');
        setTimeout(() => router.push('/loginBS'), 3000); // Redirect after 3 seconds
      }
    } catch (error) {
      console.error('Error during password reset:', error.message || error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-[#030711] flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        <div className="flex justify-center mb-8">
          <img src="/revue_logo.png" alt="Company Logo" className="h-12 w-auto" />
        </div>
        <h1 className="text-3xl font-semibold text-white text-left mb-2">
          Forgot Password
        </h1>
        <p className="text-left text-[#7F8EA3] mb-4">
          Enter your email address to receive a password reset link.
        </p>

        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-white">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
              placeholder="Your Email"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3571FF] text-white py-3 px-4 rounded-lg hover:bg-[#265ecf] transition duration-200"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
