import Stripe from 'stripe';
import { db } from '../../../lib/firebaseClient';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    const buf = await buffer(req); // Ottieni il body del webhook
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    console.error('Errore webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Ottieni l'ID dell'utente dal database usando il session.customer
    const userDoc = await db.collection('restaurant_profiles')
      .where('stripeCustomerId', '==', session.customer)
      .get();

    if (!userDoc.empty) {
      const userRef = userDoc.docs[0].ref;
      await userRef.update({ subscriptionActive: true });
    }
  }

  res.status(200).json({ received: true });
}
