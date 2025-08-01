import { useState, useEffect } from 'react';

export default function Home() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') setPosition((prev) => prev + 10);
      if (e.key === 'ArrowLeft') setPosition((prev) => prev - 10);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ height: '100vh', background: '#f0f0f0' }}>
      <h1 style={{ textAlign: 'center' }}>🚖 Turbo Taxis</h1>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '300px',
          overflow: 'hidden',
          marginTop: '50px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: `${position}px`,
            width: '100px',
            height: '100px',
            background: 'yellow',
            borderRadius: '10px',
            textAlign: 'center',
            lineHeight: '100px',
            fontWeight: 'bold',
          }}
        >
          TAXI
        </div>
      </div>
    </div>
  );
}