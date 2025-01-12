import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json(); // Leggi il corpo della richiesta
    const { email } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required.' }), {
        status: 400,
      });
    }

    // Trova il cliente su Stripe utilizzando l'email
    const customers = await stripe.customers.list({ email });
    const customer = customers.data[0];

    if (!customer) {
      return new Response(JSON.stringify({ error: 'Customer not found.' }), {
        status: 404,
      });
    }

    const customerId = customer.id;

    // Recupera l'abbonamento attivo
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    });

    const subscription = subscriptions.data[0];

    // Recupera gli ultimi pagamenti
    const paymentIntents = await stripe.paymentIntents.list({
      customer: customerId,
      limit: 5,
    });

    return new Response(
      JSON.stringify({
        subscription,
        payments: paymentIntents.data,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching subscription data:', error.message);
    return new Response(JSON.stringify({ error: 'Something went wrong.' }), {
      status: 500,
    });
  }
}
