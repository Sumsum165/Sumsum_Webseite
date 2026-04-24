import { useState } from "react";
import "./App.css";
import bee from "./assets/bee.png";
import CursorGlow from "./CursorGlow";

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
  {
    title: "Der erste Stein",
    src: "/videos/der-erste-stein-rock.mp4",
    description: "Ein Song über Veränderung./Rock-Version.",
  }, 
];
const photos = [
  {
    title: "Fotografie 1",
    src: "/fotografie/foto1.jpg",
  },
  {
    title: "Fotografie 2",
    src: "/fotografie/foto2.jpg",
  },
  {
    title: "Fotografie 3",
    src: "/fotografie/foto3.jpg",
  },
  {
    title: "Fotografie 4",
    src: "/fotografie/foto4.jpg",
  },
  {
    title: "Fotografie 5",
    src: "/fotografie/foto5.jpg",
  },
  {
    title: "Fotografie 6",
    src: "/fotografie/foto6.jpg",
  },
  {
    title: "Fotografie 7",
    src: "/fotografie/foto7.jpg",
  },
  {
    title: "Fotografie 8",
    src: "/fotografie/foto8.jpg",
  },
  {
    title: "Fotografie 9",
    src: "/fotografie/foto9.jpg",
  },
  {
    title: "Fotografie 10",
    src: "/fotografie/foto10.jpg",
  },
  {
    title: "Fotografie 11",
    src: "/fotografie/foto11.jpg",
  },
  {
    title: "Fotografie 12",
    src: "/fotografie/foto12.jpg",
  },
  {
    title: "Fotografie 13",
    src: "/fotografie/foto13.jpg",
  },
  {
    title: "Fotografie 14",
    src: "/fotografie/foto14.jpg",
  },
  {
    title: "Fotografie 15",
    src: "/fotografie/foto15.jpg",
  },
  {
    title: "Fotografie 16",
    src: "/fotografie/foto16.jpg",
  },
];
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
      <div className="logo" onClick={() => setPage("home")}>
        <img src={bee} alt="Sumsum Logo" />
        <span>Sumsum</span>
      </div>

      <nav>
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
  <a href="https://www.instagram.com/sumsum165?igsh=ODZzNm8xZ3gyd3o0" target="_blank" rel="noreferrer">
    <InstagramIcon />
  </a>

  <a href="https://www.tiktok.com/@sumsum8856?_r=1&_t=ZG-95jvqS2GDcO" target="_blank" rel="noreferrer">
    <TikTokIcon />
  </a>
</div>

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (page === "music") {
    return (
      <main className="main page-layout">
        <Header setPage={setPage} page={page} />
        <div className="overlay" />

        <section className="content-page fade-in">
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

  if (page === "fotografie") {
  return (
    <main className="main page-layout">
      <CursorGlow />
      <Header setPage={setPage} page={page} />
      <div className="overlay" />

      <section
  className="content-page fade-in"
  onContextMenu={(e) => e.preventDefault()}
>
        <h1 className="page-title">📷 Fotografie</h1>

        <p className="page-text">
          Neben Musik und digitalen Projekten ist Fotografie für mich ein weiterer
          kreativer Ausdruck. Hier entstehen Eindrücke, Stimmungen und kleine
          Momente, die für sich sprechen.
        </p>

        <div className="photo-grid">
          {selectedIndex !== null && (
  <div
    className="lightbox"
    onClick={() => setSelectedIndex(null)}
  >
    <img
      src={photos[selectedIndex].src}
      className="lightbox-image"
      onClick={(e) => e.stopPropagation()}
    />

    <button
      className="nav left"
      onClick={(e) => {
        e.stopPropagation();
        setSelectedIndex((prev) =>
          prev === 0 ? photos.length - 1 : prev! - 1
        );
      }}
    >
      ‹
    </button>

    <button
      className="nav right"
      onClick={(e) => {
        e.stopPropagation();
        setSelectedIndex((prev) =>
          prev === photos.length - 1 ? 0 : prev! + 1
        );
      }}
    >
      ›
    </button>
  </div>
)}
          {photos.map((photo, index) => (
            <article key={photo.src} className="photo-card">
              <img
  src={photo.src}
  alt={photo.title}
  className="photo-image protected-image"
  onClick={() => setSelectedIndex(index)}
  onContextMenu={(e) => e.preventDefault()}
  draggable={false}
/>
            </article>
          ))}
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

      <section className="hero fade-in">
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
      </section>
    </main>
  );
}