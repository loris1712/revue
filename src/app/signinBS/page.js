// app/register/page.js
'use client';
import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Redirect to a confirmation page or dashboard
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
