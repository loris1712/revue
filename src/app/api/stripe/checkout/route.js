import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    const { priceId, stripeCustomerId, email, firstName, lastName } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/signupBS`,
        customer_email: email, // Pre-popolato con l'email
        billing_address_collection: 'auto',
        metadata: {
          first_name: firstName, // Nome dell'utente
          last_name: lastName,  // Cognome dell'utente
        },
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error) {
    console.error('Errore durante la creazione della sessione:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
