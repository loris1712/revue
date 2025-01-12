import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { email, name } = await req.json();

    const customer = await stripe.customers.create({
      email,
      name,
    });

    return new Response(JSON.stringify({ customerId: customer.id }), {
      status: 200,
    });
  } catch (error) {
    console.error('Errore nella creazione del cliente Stripe:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
