export default async function handler(req, res) {
  const { planId, price, user_email } = req.body;

  // Fake checkout link
  res.status(200).json({ url: 'https://buy.stripe.com/test-checkout' });
}