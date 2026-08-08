import Iridescence from '../Iridescence/Iridescence';
import AccordionGallery from '../AccordionGallery/AccordionGallery';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import img1 from '../../assets/ChatGPT Image 7_08_2026, 14_51_39.png';
import img2 from '../../assets/shoe1.png';
import img3 from '../../assets/shoe2.png';
import img4 from '../../assets/shoe3.png';
import img5 from '../../assets/shoe4.png';

import './HeroSection.css';

const GALLERY_ITEMS = [
  { image: img2, label: 'Symbionte - Anti-Venom', alt: 'Symbionte - Anti-Venom Collection' },
  { image: img3, label: 'Symbionte — Spidey', alt: 'Symbionte - Spidey Collection' },
  { image: img1, label: 'Symbionte', alt: 'Chrome graffiti art' },
  { image: img4, label: 'Symbionte — Klyntar', alt: 'Symbionte — Klyntar Collectionr' },
  { image: img5, label: 'Symbionte — King in Black', alt: 'Symbionte — King in Black' },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = e => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section className="hero">
      <div className="hero__background">
        <Iridescence
          color={[1, 1, 1]}
          speed={0.6}
          amplitude={0.12}
          mouseReact={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="hero__dim" />

      <div className="hero__content">
        <div className="hero__text">
          <p className="hero__label">Bem vindo a Klyntar</p>
          <h1 className="hero__title">Criados para<br />Serem um só.</h1>
          <p className="hero__subtitle">
            Vestir é temporário. Tornar-se é permanente.
          </p>
          <div className="hero__actions">
            <button className="hero__btn hero__btn--primary" onClick={() => navigate('/colecao')}>Ver Coleção</button>
            <button className="hero__btn hero__btn--secondary">Saiba Mais</button>
          </div>
        </div>

        <div className="hero__gallery-wrap">
          <AccordionGallery
            items={GALLERY_ITEMS}
            defaultIndex={2}
            height={isMobile ? 260 : 500}
            accentColor="#c0c8d0"
            overlayColor="#000000"
            textColor="#ffffff"
            expandRatio={0.52}
            grayscale={true}
            showLabels={true}
            gap={8}
            radius={12}
          />
        </div>
      </div>
    </section>
  );
}
