import "./App.css";

export default function App() {
  return (
    <main className="main">
      <div className="overlay" />

      <section className="hero">
        <h1 className="title">Sumsum</h1>

        <p className="subtitle">
          Musik. Ideen. Herzensprojekte.
        </p>

        <div className="buttons">
          <button className="btn primary">🎵 Musik entdecken</button>
          <button className="btn secondary">📱 App ansehen</button>
        </div>
      </section>
    </main>
  );
}