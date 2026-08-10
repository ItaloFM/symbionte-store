import { useState, useRef, useCallback } from 'react';
import './ProductCarousel.css';

export default function ProductCarousel({ images = [], alt = '', isVip = false }) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'
  const timeoutRef = useRef(null);

  const goTo = useCallback(
    (index, dir) => {
      if (animating || index === active) return;
      setDirection(dir);
      setAnimating(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setActive(index);
        setAnimating(false);
      }, 320);
    },
    [animating, active]
  );

  const prev = () => {
    const idx = (active - 1 + images.length) % images.length;
    goTo(idx, 'prev');
  };

  const next = () => {
    const idx = (active + 1) % images.length;
    goTo(idx, 'next');
  };

  if (!images.length) return null;

  // se só tem 1 imagem, mostra sem controles
  const single = images.length === 1;

  return (
    <div className={`pc-root${isVip ? ' pc-root--vip' : ''}`}>
      {/* Imagem principal */}
      <div className="pc-stage">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} — foto ${i + 1}`}
            className={`pc-img
              ${i === active ? 'pc-img--active' : ''}
              ${animating && i === active ? `pc-img--out-${direction}` : ''}
            `}
          />
        ))}

        {/* Setas */}
        {!single && (
          <>
            <button
              className="pc-arrow pc-arrow--prev"
              onClick={prev}
              aria-label="Imagem anterior"
            >
              ‹
            </button>
            <button
              className="pc-arrow pc-arrow--next"
              onClick={next}
              aria-label="Próxima imagem"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {!single && (
        <div className="pc-thumbs">
          {images.map((src, i) => (
            <button
              key={i}
              className={`pc-thumb${i === active ? ' pc-thumb--active' : ''}${isVip ? ' pc-thumb--vip' : ''}`}
              onClick={() => goTo(i, i > active ? 'next' : 'prev')}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === active ? 'true' : undefined}
            >
              <img src={src} alt={`${alt} miniatura ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
