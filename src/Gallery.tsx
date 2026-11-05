import { useEffect, useRef, useState } from 'react';
import photos from './photos';
import art from './ki-art.json';
import './Gallery.css';

type Picture = { title: string; src: string; thumbnail?: string };

function ImageViewer({ images, initialIndex, onClose }: { images: Picture[]; initialIndex: number; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(initialIndex);
  const move = (offset: number) => setIndex(current => (current + offset + images.length) % images.length);
  useEffect(() => {
    const element = dialog.current!;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element.close(); document.body.style.overflow = previousOverflow; };
  }, []);
  return (
    <dialog ref={dialog} className="gallery-viewer" aria-label="Bildansicht" onCancel={onClose}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      }}>
      <button className="viewer-close" onClick={onClose} aria-label="Bildansicht schließen" autoFocus>✕</button>
      <button className="viewer-prev" onClick={() => move(-1)} aria-label="Vorheriges Bild">‹</button>
      <figure>
        <img src={images[index].src} alt={images[index].title} draggable={false} />
        <figcaption aria-live="polite">{images[index].title}<span>{index + 1} / {images.length}</span></figcaption>
      </figure>
      <button className="viewer-next" onClick={() => move(1)} aria-label="Nächstes Bild">›</button>
    </dialog>
  );
}

export default function Gallery() {
  const [category, setCategory] = useState<'photo' | 'art'>('photo');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const images: Picture[] = category === 'photo' ? photos : art;
  return (
    <div className="creative-gallery">
      <p className="eyebrow">Momente & Fantasie</p>
      <h1 className="page-title">Fotografie & Ki Kunst</h1>
      <p className="page-text">Eingefangene Augenblicke und neue Bildwelten – zwei Wege, Ideen und Stimmungen sichtbar zu machen.</p>
      <div className="gallery-categories" role="group" aria-label="Bildrubrik auswählen">
        <button className={category === 'photo' ? 'selected' : ''} aria-pressed={category === 'photo'} onClick={() => { setCategory('photo'); setSelectedIndex(null); }}>Fotografie <span>{photos.length}</span></button>
        <button className={category === 'art' ? 'selected' : ''} aria-pressed={category === 'art'} onClick={() => { setCategory('art'); setSelectedIndex(null); }}>Ki Kunst <span>{art.length}</span></button>
      </div>
      <section aria-labelledby="gallery-heading">
        <h2 id="gallery-heading">{category === 'photo' ? 'Fotografie' : 'Ki Kunst'}</h2>
        {category === 'photo' ? <p className="page-text">Neben Musik und digitalen Projekten ist Fotografie für mich ein weiterer kreativer Ausdruck. Hier entstehen Eindrücke, Stimmungen und kleine Momente, die für sich sprechen.</p> :
          <div className="art-origin"><p>Die hier gezeigten Bilder wurden mit künstlicher Intelligenz erstellt. Der überwiegende Teil entstand nach Ideen von <strong>Peter Jahn</strong> und <strong>Diana Jacob</strong>. Einige wenige Bilder basieren auf Ideen unbekannter Künstler.</p></div>}
        <div className="photo-grid">
          {images.map((picture, index) => (
            <button key={picture.src} className="photo-card gallery-card" onClick={() => setSelectedIndex(index)} aria-label={`${picture.title} vergrößern`}>
              <img src={picture.thumbnail ?? picture.src} alt={picture.title} className="photo-image protected-image" loading="lazy" decoding="async" draggable={false} />
              {category === 'art' && <span className="gallery-caption">{picture.title}</span>}
            </button>
          ))}
        </div>
      </section>
      {selectedIndex !== null && <ImageViewer images={images} initialIndex={selectedIndex} onClose={() => setSelectedIndex(null)} />}
    </div>
  );
}
