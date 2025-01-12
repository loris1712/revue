// src/app/stripe/verify-session/route.js
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_YOUR_SECRET_KEY'); // Usa la tua chiave segreta di Stripe

export async function POST(req) {
  try {
    const { sessionId } = await req.json();

    // Verifica che il sessionId sia passato
    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'sessionId mancante' }),
        { status: 400 }
      );
    }

    // Ottieni la sessione di checkout dalla API di Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verifica che la sessione esista e che il pagamento sia riuscito
    if (session.payment_status === 'paid') {
      // Se il pagamento è riuscito, invia una risposta di successo
      return new Response(
        JSON.stringify({ success: true, session }),
        { status: 200 }
      );
    } else {
      // Se il pagamento non è riuscito
      return new Response(
        JSON.stringify({ success: false, message: 'Pagamento non riuscito.' }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Errore nella verifica della sessione di pagamento:', error);
    return new Response(
      JSON.stringify({ error: 'Errore nel verificare la sessione di pagamento.' }),
      { status: 500 }
    );
  }
}
