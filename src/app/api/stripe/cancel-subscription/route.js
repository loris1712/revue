import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    // Trova il cliente su Stripe utilizzando l'email
    const customers = await stripe.customers.list({ email });
    const customer = customers.data[0];

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found.' });
    }

    const customerId = customer.id;

    // Recupera l'abbonamento attivo
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    });

    const subscription = subscriptions.data[0];
    if (!subscription) {
      return res.status(400).json({ error: 'No active subscription found.' });
    }

    // Annulla l'abbonamento
    await stripe.subscriptions.del(subscription.id);

    res.status(200).json({ message: 'Subscription canceled successfully.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
