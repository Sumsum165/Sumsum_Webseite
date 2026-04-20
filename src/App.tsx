import { useState } from "react";
import "./App.css";
import bee from "./assets/bee.png";

type Page = "home" | "music" | "app";

const songs = [
  {
    title: "Leise hier",
    src: "/videos/leise-hier.mp4",
    description: "Ein ruhiger, gefühlvoller Song mit stiller Atmosphäre.",
  },
  {
    title: "Die Starken",
    src: "/videos/die-starken.mp4",
    description: "Ein Song über Stärke und Haltung.",
  },
  {
    title: "Ohne viele Worte",
    src: "/videos/ohne-viele-worte.mp4",
    description: "Leise Töne, klare Gefühle.",
  },
  {
    title: "Genau hier",
    src: "/videos/genau-hier.mp4",
    description: "Ein Song über Ankommen und Nähe.",
  },
  {
    title: "Ich bin genug",
    src: "/videos/ich-bin-genug.mp4",
    description: "Persönlich und kraftvoll.",
  },
  {
    title: "Ich fall und ich steh",
    src: "/videos/ich-fall-und-ich-steh.mp4",
    description: "Über Rückschläge und Weitermachen.",
  },
  {
    title: "Ein kleiner Stein",
    src: "/videos/ein-kleiner-stein.mp4",
    description: "Über kleine Dinge mit großer Wirkung.",
  },
  {
    title: "Der erste Stein",
    src: "/videos/der-erste-stein.mp4",
    description: "Ein Song über Veränderung.",
  },
  {
    title: "Immer noch an meiner Seite",
    src: "/videos/immer-noch-an-meiner-seite.mp4",
    description: "Über Nähe, die bleibt.",
  },
  {
    title: "Wir sehen dich",
    src: "/videos/wir-sehen-dich.mp4",
    description: "Ein Song über Wahrnehmung und Wert.",
  },
];

function Header({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <header className="header">
      <div className="logo" onClick={() => setPage("home")}>
        <img src={bee} alt="Sumsum Logo" />
        <span>Sumsum</span>
      </div>

      <nav>
        <button onClick={() => setPage("music")}>Musik</button>
        <button onClick={() => setPage("app")}>App</button>
      </nav>
    </header>
  );
}
function pauseOtherVideos(currentVideo: HTMLVideoElement) {
  const allVideos = document.querySelectorAll("video");

  allVideos.forEach((video) => {
    if (video !== currentVideo) {
      video.pause();
    }
  });
}
export default function App() {
  const [page, setPage] = useState<Page>("home");

  if (page === "music") {
    return (
      <main className="main page-layout">
        <Header setPage={setPage} />
        <div className="overlay" />

        <section className="content-page">
          <h1 className="page-title">🎵 Musik</h1>
          <p className="page-text">
            Hier findest du meine Songs – direkt als Video.
          </p>

          <div className="song-grid">
            {songs.map((song) => (
              <article key={song.title} className="song-card">
                <h2>{song.title}</h2>
                <p>{song.description}</p>

                <video
                  className="media-player"
                  src={song.src}
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                  onClick={(e) => {
                    e.currentTarget.muted = false;
                    e.currentTarget.play();
                  }}
                  onPlay={(e) => pauseOtherVideos(e.currentTarget)}
                  controls
                />
              </article>
            ))}
          </div>

          <button className="btn secondary back-btn" onClick={() => setPage("home")}>
            ← Zurück
          </button>
        </section>
      </main>
    );
  }

  if (page === "app") {
  return (
    <main className="main page-layout">
      <Header setPage={setPage} />
      <div className="overlay" />

      <section className="content-page">
        <h1 className="page-title">📱 Sumsum App</h1>

        <p className="page-text">
          Sumsum hilft dir, Rezepte ganz einfach zu sammeln, zu organisieren und
          jederzeit wiederzufinden. Ob Screenshots, Fotos oder Ideen – alles an
          einem Ort, übersichtlich und schnell verfügbar.
        </p>

        <div className="buttons">
          <a
            href="https://incredible-cactus-9ec9e4.netlify.app"
            target="_blank"
            rel="noreferrer"
          >
            <button className="btn primary">App starten</button>
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=com.sumsum.rezeptverwaltung"
            target="_blank"
            rel="noreferrer"
          >
            <button className="btn secondary">Zum Play Store</button>
          </a>
        </div>

        {/* Videos */}
        <div className="app-video-grid">
          <video
            className="media-player"
            src="/app/app-video.mp4"
            onPlay={(e) => pauseOtherVideos(e.currentTarget)}
            controls
          />

          <video
            className="media-player"
            src="/app/app-video-bubblegum.mp4"
            onPlay={(e) => pauseOtherVideos(e.currentTarget)}
            controls
          />

          <video
            className="media-player"
            src="/app/app-video-electro-pop.mp4"
            onPlay={(e) => pauseOtherVideos(e.currentTarget)}
            controls
          />
        </div>

        <button
          className="btn secondary back-btn"
          onClick={() => setPage("home")}
        >
          ← Zurück
        </button>
      </section>
    </main>
  );
}

  return (
    <main className="main">
      <Header setPage={setPage} />
      <div className="overlay" />

      <section className="hero">
        <h1 className="title">Sumsum</h1>
        <p className="subtitle">Musik. Ideen. Herzensprojekte.</p>

        <div className="buttons">
          <button className="btn primary" onClick={() => setPage("music")}>
            🎵 Musik entdecken
          </button>

          <button className="btn secondary" onClick={() => setPage("app")}>
            📱 App ansehen
          </button>
        </div>
      </section>
    </main>
  );
}