'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const searchParams = new URLSearchParams(window.location.search);
  const accessToken = searchParams.get('access_token'); // Recuperiamo il token dalla URL

  useEffect(() => {
    if (!accessToken) {
      setErrorMessage('Invalid or missing reset token.');
    }
  }, [accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    // Verifica che la password sia la stessa
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Verifica che la password abbia almeno 6 caratteri
    if (newPassword.length < 6) {
      setErrorMessage('Password should be at least 6 characters long.');
      return;
    }

    try {
      setIsLoading(true);
      
      // Usa il token per resettare la password
      const { error } = await supabase.auth.api.updateUser(accessToken, {
        password: newPassword,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage('Your password has been successfully updated!');
        setTimeout(() => router.push('/loginBS'), 3000); // Redirige dopo 3 secondi
      }
    } catch (error) {
      console.error('Error resetting password:', error.message || error);
      setErrorMessage('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030711] flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        <div className="flex justify-center mb-8">
          <img src="/revue_logo.png" alt="Company Logo" className="h-12 w-auto" />
        </div>
        <h1 className="text-3xl font-semibold text-white text-left mb-2">
          Reset Password
        </h1>
        <p className="text-left text-[#7F8EA3] mb-4">
          Enter a new password for your account.
        </p>

        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="text-white">New Password</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
              placeholder="New Password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="text-white">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
              placeholder="Confirm New Password"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-[#3571FF] text-white py-3 px-4 rounded-lg hover:bg-[#265ecf] transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
