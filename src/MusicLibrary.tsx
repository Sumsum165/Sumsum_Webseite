import { useEffect, useRef, useState } from "react";
import catalogue from "./songs.json";
import "./MusicLibrary.css";

type Version = { label: string; audio: string; video: string; cover: string };
type Song = { id: string; title: string; description: string; category: string; language: string; versions: Version[] };
type VideoSelection = { title: string; version: Version };
const songs: Song[] = catalogue;
const categories = ["Alle", "Ruhe & Gefühl", "Kraft & Selbstvertrauen", "Sprechgesang", "Rhythmus & Energie"];
const pageSize = 9;

function pauseOthers(current?: HTMLMediaElement) {
  document.querySelectorAll<HTMLMediaElement>("audio, video").forEach(media => {
    if (media !== current) media.pause();
  });
}

function SongCard({ song, onVideo }: { song: Song; onVideo: (selection: VideoSelection) => void }) {
  const [versionIndex, setVersionIndex] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const version = song.versions[versionIndex];
  return (
    <article className="track-card" aria-labelledby={`title-${song.id}`}>
      <div className="track-heading">
        <img className="track-cover" src={version.cover} alt="" width="80" height="80" loading="lazy" />
        <div>
          <span className="track-category">{song.category}</span>
          <h2 id={`title-${song.id}`}>{song.title}</h2>
          <span className="track-language">{song.language === "en" ? "Englisch" : "Deutsch"}</span>
        </div>
      </div>
      <p className="track-description">{song.description}</p>
      {song.versions.length > 1 && (
        <label className="version-choice">
          Fassung
          <select aria-label={`Fassung von ${song.title}`} value={versionIndex} onChange={event => {
            setVersionIndex(Number(event.target.value));
            setAudioError(false);
          }}>
            {song.versions.map((item, index) => <option key={item.audio} value={index}>{item.label}</option>)}
          </select>
        </label>
      )}
      <div className="track-playback">
        <audio key={version.audio} controls preload="none" src={version.audio}
          aria-label={`${song.title} – ${version.label} anhören`}
          onPlay={event => pauseOthers(event.currentTarget)} onError={() => setAudioError(true)} />
        {audioError && <p className="media-error" role="alert">Der Song konnte nicht geladen werden. Versuche es mit dem Video.</p>}
        <button type="button" className="video-link" aria-label={`Video ansehen: ${song.title} – ${version.label}`} onClick={() => {
          pauseOthers();
          onVideo({ title: song.title, version });
        }}><span aria-hidden="true">▷</span> Video ansehen</button>
      </div>
    </article>
  );
}

function VideoDialog({ selection, onClose }: { selection: VideoSelection; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);
  return (
    <dialog ref={dialogRef} className="music-dialog" aria-labelledby="video-title" onClose={onClose} onClick={event => {
      if (event.target === event.currentTarget) dialogRef.current?.close();
    }}>
      <div className="dialog-header">
        <div><p className="eyebrow">{selection.version.label}</p><h2 id="video-title">{selection.title}</h2></div>
        <button type="button" className="dialog-close" onClick={() => dialogRef.current?.close()} aria-label="Video schließen" autoFocus>✕</button>
      </div>
      <video controls playsInline preload="metadata" src={selection.version.video} poster={selection.version.cover}
        onPlay={event => pauseOthers(event.currentTarget)} onError={() => setError(true)} />
      {error && <p className="media-error" role="alert">Das Video konnte nicht geladen werden. Bitte versuche es später erneut.</p>}
    </dialog>
  );
}

export default function MusicLibrary() {
  const [category, setCategory] = useState("Alle");
  const [language, setLanguage] = useState("all");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(pageSize);
  const [video, setVideo] = useState<VideoSelection | null>(null);
  const search = query.trim().toLocaleLowerCase("de");
  const filtered = songs.filter(song =>
    (category === "Alle" || song.category === category) &&
    (language === "all" || song.language === language) &&
    `${song.title} ${song.description}`.toLocaleLowerCase("de").includes(search)
  );
  const reset = () => { setCategory("Alle"); setLanguage("all"); setQuery(""); setLimit(pageSize); };
  return (
    <>
      <div className="library-heading">
        <div><p className="eyebrow">Sumsum · Meine Songs</p><h1 className="page-title">Musik für deinen Moment.</h1>
          <p className="page-text">Leise Gedanken. Starke Gefühle. Finde einen Song, der dich begleitet.</p></div>
        <span className="library-total">{songs.length} Songs zum Entdecken</span>
      </div>
      <div className="music-toolbar">
        <div className="category-filters" role="group" aria-label="Songs nach Rubrik filtern">
          {categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => { setCategory(item); setLimit(pageSize); }}>{item}</button>)}
        </div>
        <div className="search-row">
          <label className="song-search"><span>Song suchen</span><input type="search" value={query} placeholder="Titel oder Stichwort eingeben …" onChange={event => { setQuery(event.target.value); setLimit(pageSize); }} /></label>
          <label className="language-filter"><span>Sprache</span><select value={language} onChange={event => { setLanguage(event.target.value); setLimit(pageSize); }}>
            <option value="all">Alle Sprachen</option><option value="de">Deutsch</option><option value="en">Englisch</option>
          </select></label>
        </div>
      </div>
      <div className="results-row"><p role="status">{filtered.length === 1 ? "1 Song" : `${filtered.length} Songs`}{filtered.length > limit ? ` · ${limit} werden angezeigt` : ""}</p>
        {(category !== "Alle" || language !== "all" || query) && <button type="button" className="reset-filters" onClick={reset}>Auswahl zurücksetzen</button>}
      </div>
      {filtered.length ? <div className="track-grid">{filtered.slice(0, limit).map(song => <SongCard key={song.id} song={song} onVideo={setVideo} />)}</div> :
        <div className="empty-results"><h2>Hier ist es gerade ganz still.</h2><p>Zu dieser Auswahl gibt es keinen Song. Probiere einen anderen Suchbegriff oder eine andere Rubrik.</p><button type="button" className="btn secondary" onClick={reset}>Alle Songs anzeigen</button></div>}
      {filtered.length > limit && <button type="button" className="btn secondary more-songs" onClick={() => setLimit(value => value + pageSize)}>Weitere Songs anzeigen ({filtered.length - limit}) ↓</button>}
      {video && <VideoDialog selection={video} onClose={() => setVideo(null)} />}
    </>
  );
}
