import { useState } from "react";
import "./App.css";
import Gallery from "./Gallery";
import bee from "./assets/bee.png";
import CursorGlow from "./CursorGlow";
import MusicLibrary from "./MusicLibrary";

type Page = "home" | "music" | "app" | "fotografie";

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="18"
    height="18"
  >
    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="18"
    height="18"
  >
    <path d="M19.589 6.686a4.793 4.793 0 01-3.77-1.87v8.17a6.003 6.003 0 11-5.19-5.94v2.53a3.47 3.47 0 102.36 3.31V2h2.62a4.79 4.79 0 004.04 2.21v2.476z"/>
  </svg>
);
function Header({
  setPage,
  page,
}: {
  setPage: (page: Page) => void;
  page: Page;
}) {
  return (
    <header className="header">
      <CursorGlow />
      <button type="button" className="logo" aria-label="Sumsum – Startseite" onClick={() => setPage("home")}>
        <img src={bee} alt="Sumsum Logo" />
        <span>Sumsum</span>
      </button>

      <nav aria-label="Hauptnavigation">
  <button
    className={page === "music" ? "active" : ""}
    onClick={() => setPage("music")}
  >
    Musik
  </button>

  <button
    className={page === "app" ? "active" : ""}
    onClick={() => setPage("app")}
  >
    App
  </button>
  <button
  className={page === "fotografie" ? "active" : ""}
  onClick={() => setPage("fotografie")}
>
  Fotografie
</button>

<div className="social-icons">
  <a aria-label="Instagram" href="https://www.instagram.com/sumsum165?igsh=ODZzNm8xZ3gyd3o0" target="_blank" rel="noreferrer">
    <InstagramIcon />
  </a>

  <a aria-label="TikTok" href="https://www.tiktok.com/@sumsum8856?_r=1&_t=ZG-95jvqS2GDcO" target="_blank" rel="noreferrer">
    <TikTokIcon />
  </a>
</div>

</nav>
    </header>
  );
}
function pauseOtherVideos(currentVideo: HTMLMediaElement) {
  const allVideos = document.querySelectorAll<HTMLMediaElement>("video, audio");

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
        <Header setPage={setPage} page={page} />
        <div className="overlay" />

        <section className="content-page fade-in music-page">
          <MusicLibrary />
          <button className="btn secondary back-btn" onClick={() => setPage("home")}>
            ← Zur Startseite
          </button>
        </section>
      </main>
    );
  }

  if (page === "fotografie") {
  return (
    <main className="main page-layout">
      <CursorGlow />
      <Header setPage={setPage} page={page} />
      <div className="overlay" />

      <section className="content-page fade-in"><Gallery /><button className="btn secondary back-btn" onClick={() => setPage("home")}>← Zurück</button></section>
    </main>
  );
}

  if (page === "app") {
  return (
    <main className="main page-layout">
      <Header setPage={setPage} page={page} />
      <div className="overlay" />

      <section className="content-page fade-in">
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
     <Header setPage={setPage} page={page} />
      <div className="overlay" />

      <section className="hero hero-profile fade-in">
        <div className="hero-copy">
        <p className="eyebrow">Willkommen in meiner kreativen Welt</p>
        <h1 className="title">Sumsum</h1>
        <p className="subtitle">Musik. Ideen. Herzensprojekte.</p>

<p className="intro-text">
  Manche Dinge entstehen leise.  
  Zwischen Gedanken, Momenten und kleinen Ideen.  

  Musik, die etwas ausdrückt, ohne laut zu sein.  
  Projekte, die wachsen dürfen, ohne perfekt zu starten.  

  Und plötzlich entsteht etwas Größeres.
</p>

        <div className="buttons">
          <button className="btn primary" onClick={() => setPage("music")}>
            🎵 Musik entdecken
          </button>

          <button className="btn secondary" onClick={() => setPage("app")}>
            📱 App ansehen
          </button>
        </div>
        </div>
        <figure className="portrait-frame">
          <img src="/images/sasum-portrait.jpg" alt="Porträt von Sumsum in warmer Atmosphäre mit Büchern, Musik und einer schwarzen Katze" width="1024" height="1536" fetchPriority="high" />
        </figure>
      </section>
    </main>
  );
}
