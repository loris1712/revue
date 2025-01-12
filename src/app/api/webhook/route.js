import { db } from '../../../lib/firebaseClient';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { doc, updateDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false, // Necessario per Stripe
  },
};

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error('Errore webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
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
      return res.status(500).json({ error: 'Errore nell\'aggiornare l\'utente.' });
    }
  }

  res.status(200).json({ received: true });
}
