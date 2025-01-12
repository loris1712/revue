import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebaseClient';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { doc, updateDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    const buf = await req.arrayBuffer();
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error('Errore webhook:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Aggiorna lo stato dell'utente come "attivo" in Firestore
    const customerId = session.customer; // ID del cliente su Stripe
    const userRef = doc(db, 'users', customerId); // Aggiungi l'ID cliente di Stripe come ID del documento

    try {
      await updateDoc(userRef, {
        subscriptionActive: true,
      });

      console.log('Stato dell\'utente aggiornato con successo');
    } catch (error) {
      console.error('Errore nell\'aggiornare l\'utente:', error);
      return NextResponse.json({ error: 'Errore nell\'aggiornare l\'utente.' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
