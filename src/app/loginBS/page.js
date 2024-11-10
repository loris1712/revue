'use client'

import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Segnala che il componente è montato
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Redirect to dashboard or another page on success
      window.location.href = '/dashboard';
    }
  };

  if (!mounted) {
    return null; // Evita di renderizzare contenuto prima del montaggio
  }

  return (
    <div className="min-h-screen bg-[#030711] flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo.svg" alt="Company Logo" className="h-12 w-auto" />
        </div>

        {/* Titolo */}
        <h1 className="text-3xl font-semibold text-white text-left mb-2">
          Welcome Back! 👋
        </h1>

        {/* Descrizione */}
        <p className="text-left text-[#7F8EA3] mb-8">
          We're happy to see you again. Please sign in to your account.
        </p>

        {/* Errore */}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {/* Form di login */}
        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">
            <a href="#" className="text-[#7F8EA3] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Tasto Sign In */}
          <button
            type="submit"
            className="w-full bg-[#3571FF] text-white py-3 px-4 rounded-lg hover:bg-[#265ecf] transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Link per la registrazione */}
        <p className="text-center text-[#7F8EA3] mt-6">
          Don't have an account?{' '}
          <Link href="/signupBS" className="text-[#3571FF] hover:underline">
            Sign up
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
