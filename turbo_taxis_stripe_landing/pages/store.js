import { useState } from 'react';

const items = [
  {
    id: 'turbo-fuel',
    name: '⛽ Combustível Turbo',
    description: 'Acelera seu táxi por 5 segundos.',
    price: 5,
  },
  {
    id: 'horn-blast',
    name: '📢 Buzina Explosiva',
    description: 'Libere uma buzina que abre caminho no trânsito.',
    price: 8,
  },
  {
    id: 'tokyo-taxi',
    name: '🚖 Táxi Raro de Tóquio',
    description: 'Visual exclusivo e bônus de velocidade.',
    price: 15,
  },
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
          pastels: 0,
          user_email: 'jogador@exemplo.com',
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error('Erro ao iniciar pagamento:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "30px" }}>🛒 Loja Turbo Taxis</h1>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              width: "300px"
            }}
          >
            <h2 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>{item.name}</h2>
            <p style={{ fontSize: "1rem", marginBottom: "15px" }}>{item.description}</p>
            <button
              onClick={() => handleBuy(item)}
              disabled={loading}
              style={{
                backgroundColor: "#facc15",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                opacity: loading ? 0.5 : 1
              }}
            >
              Comprar R$ {item.price},00
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}