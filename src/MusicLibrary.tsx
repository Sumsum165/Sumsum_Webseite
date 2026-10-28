import { useEffect, useRef, useState } from "react";
import catalogue from "./songs.json";
import "./MusicLibrary.css";

type Version = { label: string; audio?: string; video?: string; cover?: string; duration?: number; videoLabel?: string; description?: string };
type Song = { id: string; title: string; description: string; category: string; language: string; versions: Version[]; newAddition?: boolean; credits?: string };
type VideoSelection = { title: string; version: Version; credits?: string };
const songs: Song[] = catalogue;
const categories = [...new Set(songs.map(song => song.category))].sort((a, b) => a.localeCompare(b, "de"));
const languageNames: Record<string, string> = { de: "Deutsch", en: "Englisch", it: "Italienisch", unknown: "Ohne Sprachzuordnung" };
const languages = [...new Set(songs.map(song => song.language))];
const pageSize = 9;

function downloadName(title: string, version: Version, extension: "mp3" | "mp4") {
  const parts = ["SaSum", title, version.label === "Original" ? "" : version.label, "sumsum165.de"];
  return `${parts.filter(Boolean).join(" - ").replace(/[<>:"/\\|?*\u0000-\u001f]/g, "").replace(/\s+/g, " ").trim()}.${extension}`;
}

function pauseOthers(current?: HTMLMediaElement) {
  document.querySelectorAll<HTMLMediaElement>("audio, video").forEach(media => {
    if (media !== current) media.pause();
  });
}

function SongCard({ song, onVideo }: { song: Song; onVideo: (selection: VideoSelection) => void }) {
  const [versionIndex, setVersionIndex] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const version = song.versions[versionIndex];
  const description = version.description ?? song.description;
  return (
    <article className="track-card" aria-labelledby={`title-${song.id}`}>
      <div className="track-heading">
        {version.cover ? <img className="track-cover" src={version.cover} alt="" width="80" height="80" loading="lazy" /> :
          <div className="track-cover cover-placeholder" aria-hidden="true"><span>♫</span><small>SaSum</small></div>}
        <div>
          <span className="track-category">{song.category}</span>
          <h2 id={`title-${song.id}`}>{song.title}</h2>
          <span className="track-artist">SaSum · sumsum165.de</span>
          <span className="track-language">{[song.language === "unknown" ? "" : languageNames[song.language], version.duration ? `${Math.floor(version.duration / 60)}:${String(version.duration % 60).padStart(2, "0")}` : ""].filter(Boolean).join(" · ")}</span>
        </div>
      </div>
      {description && <p className="track-description">{description}</p>}
      {song.credits && <p className="track-credits">{song.credits}</p>}
      {song.newAddition && <p className="new-track-badge">Neu in der Sammlung{song.versions.length > 1 ? " · mit weiteren Fassungen" : ""}</p>}
      {song.versions.length === 1 && version.label !== "Original" && <p className="single-version-label">{version.label}</p>}
      {song.versions.length > 1 && (
        <label className="version-choice">
          Fassung
          <select aria-label={`Fassung von ${song.title}`} value={versionIndex} onChange={event => {
            setVersionIndex(Number(event.target.value));
            setAudioError(false);
          }}>
            {song.versions.map((item, index) => <option key={item.audio || item.video} value={index}>{item.label}</option>)}
          </select>
        </label>
      )}
      <div className="track-playback">
        {version.audio && <audio key={version.audio} controls controlsList="nodownload" preload="none" src={version.audio}
          aria-label={`${song.title} – ${version.label} anhören`}
          onPlay={event => pauseOthers(event.currentTarget)} onError={() => setAudioError(true)} />}
        {audioError && <p className="media-error" role="alert">Der Song konnte nicht geladen werden. {version.video ? "Versuche es mit dem Video." : "Bitte lade die Seite erneut."}</p>}
        {version.video && <button type="button" className="video-link" aria-label={`${version.videoLabel || "Video ansehen"}: ${song.title} – ${version.label}`} onClick={() => {
          pauseOthers();
          onVideo({ title: song.title, version, credits: song.credits });
        }}><span aria-hidden="true">▷</span> {version.videoLabel || "Video ansehen"}</button>}
        <div className="track-downloads">
          {version.audio && <a href={version.audio} download={downloadName(song.title, version, "mp3")} aria-label={`MP3 herunterladen: ${song.title} – ${version.label}`}>↓ MP3 herunterladen</a>}
          {version.video && <a href={version.video} download={downloadName(song.title, version, "mp4")} aria-label={`MP4 herunterladen: ${song.title} – ${version.label}`}>↓ MP4 herunterladen</a>}
        </div>
        <p className="track-usage">Für deinen privaten Gebrauch · <a href="#musik-nutzung">Nutzungshinweise</a></p>
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
      <video controls controlsList="nodownload" playsInline preload="metadata" src={selection.version.video} poster={selection.version.cover}
        onPlay={event => pauseOthers(event.currentTarget)} onError={() => setError(true)} />
      {selection.credits && <p className="track-credits">{selection.credits}</p>}
      <p className="dialog-attribution">SaSum · sumsum165.de · Für deinen privaten Gebrauch</p>
      <a className="dialog-download" href={selection.version.video} download={downloadName(selection.title, selection.version, "mp4")}>↓ MP4 herunterladen</a>
      {error && <p className="media-error" role="alert">Das Video konnte nicht geladen werden. Bitte versuche es später erneut.</p>}
    </dialog>
  );
}

export default function MusicLibrary() {
  const [category, setCategory] = useState("Alle");
  const [language, setLanguage] = useState("all");
  const [query, setQuery] = useState("");
  const [onlyNew, setOnlyNew] = useState(false);
  const [sort, setSort] = useState("new");
  const [limit, setLimit] = useState(pageSize);
  const [video, setVideo] = useState<VideoSelection | null>(null);
  const search = query.trim().toLocaleLowerCase("de");
  const filtered = songs.filter(song =>
    (category === "Alle" || song.category === category) &&
    (language === "all" || song.language === language) &&
    (!onlyNew || song.newAddition) &&
    `${song.title} ${song.description} ${song.category} ${song.versions.map(version => version.label).join(" ")}`.toLocaleLowerCase("de").includes(search)
  ).sort((a, b) => sort === "title" ? a.title.localeCompare(b.title, "de") :
    Number(Boolean(b.newAddition)) - Number(Boolean(a.newAddition)) || Number(b.id.startsWith("track-")) - Number(a.id.startsWith("track-")));
  const reset = () => { setCategory("Alle"); setLanguage("all"); setQuery(""); setOnlyNew(false); setLimit(pageSize); };
  return (

    <>
      <div className="library-heading">
        <div><p className="eyebrow">Sumsum · Meine Songs</p><h1 className="page-title">Musik für deinen Moment.</h1>
          <p className="page-text">Leise Gedanken. Starke Gefühle. Finde einen Song, der dich begleitet.</p></div>
        <span className="library-total">{songs.length} Songs zum Entdecken</span>
      </div>
      <p className="library-usage">Musik von SaSum – zum privaten Hören und Mitnehmen. Bitte nicht als eigenes Werk ausgeben. <a href="#musik-nutzung">Mehr zur Nutzung</a></p>
      <div className="music-toolbar">
        <div className="category-filters" role="group" aria-label="Sammlung auswählen">
          <button type="button" aria-pressed={!onlyNew} onClick={() => { setOnlyNew(false); setLimit(pageSize); }}>Alle Songs</button>
          <button type="button" aria-pressed={onlyNew} onClick={() => { setOnlyNew(true); setLimit(pageSize); }}>Neu hinzugefügt</button>
        </div>
        <div className="search-row">
          <label className="song-search"><span>Song suchen</span><input type="search" value={query} placeholder="Titel oder Stichwort eingeben …" onChange={event => { setQuery(event.target.value); setLimit(pageSize); }} /></label>
          <label><span>Rubrik</span><select value={category} onChange={event => { setCategory(event.target.value); setLimit(pageSize); }}>
            <option value="Alle">Alle Rubriken</option>{categories.map(item => <option key={item} value={item}>{item}</option>)}
          </select></label>
          <label className="language-filter"><span>Sprache</span><select value={language} onChange={event => { setLanguage(event.target.value); setLimit(pageSize); }}>
            <option value="all">Alle Sprachen</option>{languages.map(item => <option key={item} value={item}>{languageNames[item] || item}</option>)}
          </select></label>
          <label><span>Reihenfolge</span><select value={sort} onChange={event => { setSort(event.target.value); setLimit(pageSize); }}><option value="new">Neue zuerst</option><option value="title">Titel A–Z</option></select></label>
        </div>
      </div>
      <div className="results-row"><p role="status">{filtered.length === 1 ? "1 Song" : `${filtered.length} Songs`}{filtered.length > limit ? ` · ${limit} werden angezeigt` : ""}</p>
        {(category !== "Alle" || language !== "all" || query || onlyNew) && <button type="button" className="reset-filters" onClick={reset}>Auswahl zurücksetzen</button>}
      </div>
      {filtered.length ? <div className="track-grid">{filtered.slice(0, limit).map(song => <SongCard key={song.id} song={song} onVideo={setVideo} />)}</div> :
        <div className="empty-results"><h2>Hier ist es gerade ganz still.</h2><p>Zu dieser Auswahl gibt es keinen Song. Probiere einen anderen Suchbegriff oder eine andere Rubrik.</p><button type="button" className="btn secondary" onClick={reset}>Alle Songs anzeigen</button></div>}
      {filtered.length > limit && <button type="button" className="btn secondary more-songs" onClick={() => setLimit(value => value + pageSize)}>Weitere Songs anzeigen ({filtered.length - limit}) ↓</button>}

<section id="musik-nutzung" className="music-info" aria-label="Downloads und Kontakt">
  <div className="music-info-section">
    <h2>♫ Musik zum Hören und Mitnehmen</h2>
    <p>
      Alle Songs und Videos auf dieser Seite kannst du
      kostenlos für deinen privaten Gebrauch genießen
      und herunterladen.
    </p>
    <p>
      Bitte respektiere meine kreative Arbeit:
      Eine Weiterveröffentlichung oder Verwendung in
      eigenen Projekten ist nur mit meiner vorherigen
      Zustimmung gestattet. Bitte gib meine Aufnahmen nicht als dein eigenes Werk aus
      und behalte die Künstler- und Quellenangaben bei.
    </p>
    <p>
      Herkunft: SaSum · <a href="https://sumsum165.de/">sumsum165.de</a>.
      Auch bei einer abgesprochenen Nutzung gehört diese Quellenangabe dazu.
    </p>
  </div>

  <div className="music-info-section">
    <h2>✉ Kontakt zu SaSum</h2>
    <p>
      Fragen zu meiner Musik, Interesse an einer
      Zusammenarbeit oder einfach ein paar persönliche
      Worte? Ich freue mich über deine Nachricht.
    </p>
    <a href="mailto:sumsum.app.kontakt@gmail.com">
      sumsum.app.kontakt@gmail.com
    </a>
  </div>

  <p className="music-info-copyright">
    © 2026 SaSum · sumsum165.de
  </p>
</section>

      {video && <VideoDialog selection={video} onClose={() => setVideo(null)} />}
    </>
  );
}
