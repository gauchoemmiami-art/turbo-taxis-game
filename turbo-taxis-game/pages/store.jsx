import { useState } from 'react';

const items = [
  { id: 'turbo-fuel', name: '⛽ Turbo Fuel', price: 5 },
  { id: 'horn-blast', name: '📢 Horn Blast', price: 8 },
  { id: 'tokyo-taxi', name: '🚖 Tokyo Taxi', price: 15 },
];

export default function StorePage() {
  const [loading, setLoading] = useState(false);

  async function handleBuy(item) {
    setLoading(true);
    try {
      const res = await fetch('/api/createStripeCheckout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: item.id,
          price: item.price,
          user_email: 'user@example.com',
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>🛒 Turbo Taxis Store</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ margin: '20px 0' }}>
            <strong>{item.name}</strong> - R$ {item.price},00
            <button onClick={() => handleBuy(item)} disabled={loading} style={{ marginLeft: '10px' }}>
              Buy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}