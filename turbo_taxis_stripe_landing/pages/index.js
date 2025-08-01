export default function Home() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>🚖 Turbo Taxis</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "40px" }}>Corrida Caótica na Cidade</p>
      <a
        href="/store"
        style={{
          backgroundColor: "#facc15",
          padding: "15px 30px",
          borderRadius: "10px",
          textDecoration: "none",
          color: "#000",
          fontWeight: "bold"
        }}
      >
        Acessar Loja
      </a>
    </div>
  );
}