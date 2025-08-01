import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { price, planId, pastels, user_email } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: user_email,
    line_items: [
      {
        price_data: {
          currency: 'brl',
          product_data: {
            name: planId,
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    success_url: 'https://turbo-taxis-game.vercel.app/success',
    cancel_url: 'https://turbo-taxis-game.vercel.app/cancel',
  });

  res.status(200).json({ url: session.url });
}