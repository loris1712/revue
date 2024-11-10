'use client';
import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // Per controllare gli step
  const [errorMessage, setErrorMessage] = useState('');

  const handleNextStep = (e) => {
    e.preventDefault();

    // Validazione dei campi nel primo step
    if (!fullName || !email || !password || password !== confirmPassword) {
      setErrorMessage('Please make sure all fields are filled and passwords match.');
    } else if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
    } else {
      setErrorMessage('');
      setStep(2); // Vai al secondo step
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Reindirizza o mostra un messaggio di successo
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-[#030711] flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo.svg" alt="Company Logo" className="h-12 w-auto" />
        </div>

        {/* Titolo */}
        <h1 className="text-3xl font-semibold text-white text-center mb-2">
          Create Your Account! 👋
        </h1>

        {/* Descrizione */}
        <p className="text-center text-[#7F8EA3] mb-8">
          Please fill in the details to create your account.
        </p>

        {/* Errore */}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {/* Primo step del form */}
        {step === 1 && (
          <form onSubmit={handleNextStep}>
            {/* Campo Full Name */}
            <div className="mb-4">
              <label className="block text-[#7F8EA3] mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Campo Email */}
            <div className="mb-4">
              <label className="block text-[#7F8EA3] mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Campo Password */}
            <div className="mb-4">
              <label className="block text-[#7F8EA3] mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                placeholder="Create a password"
                required
              />
            </div>

            {/* Campo Conferma Password */}
            <div className="mb-4">
              <label className="block text-[#7F8EA3] mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                placeholder="Confirm your password"
                required
              />
            </div>

            {/* Bottone Next Step */}
            <button
              type="submit"
              className="w-full bg-[#3571FF] text-white py-3 px-4 rounded-lg hover:bg-[#265ecf] transition duration-200"
            >
              Next Step
            </button>
          </form>
        )}

        {/* Secondo step del form */}
        {step === 2 && (
          <form onSubmit={handleSignup}>
            {/* Campo Aggiuntivo (esempio: Phone Number) */}
            <div className="mb-4">
              <label className="block text-[#7F8EA3] mb-2" htmlFor="phone">
                Phone Number (Optional)
              </label>
              <input
                type="text"
                id="phone"
                className="w-full p-3 bg-white text-black rounded-lg focus:outline-none"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Bottone Back to Step 1 */}
            <button
              type="button"
              className="w-full bg-[#7F8EA3] text-white py-3 px-4 rounded-lg hover:bg-[#6a7a94] transition duration-200 mb-4"
              onClick={() => setStep(1)} // Torna allo step 1
            >
              Back to Step 1
            </button>

            {/* Bottone Sign Up */}
            <button
              type="submit"
              className="w-full bg-[#3571FF] text-white py-3 px-4 rounded-lg hover:bg-[#265ecf] transition duration-200"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Link per il login */}
        <p className="text-center text-[#7F8EA3] mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#3571FF] hover:underline">
            Sign in
          </Link>
        </p>

        {/* Copyright */}
        <div className="text-center text-[#7F8EA3] mt-8">
          © 2024 Company, Inc.
        </div>
      </div>
    </div>
  );
}