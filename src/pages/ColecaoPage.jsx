import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Ferrofluid from '../components/Ferrofluid/Ferrofluid';
import TiltedCard from '../components/TiltedCard/TiltedCard';
import { PRODUCTS, SECTIONS } from '../data/products';
import './ColecaoPage.css';
import Logo from "../assets/Logo.png";

export default function ColecaoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 520);

  // Responsividade
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 520px)');
    const handler = e => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Scroll até a seção quando há hash na URL (ex: /colecao#spidey)
  useEffect(() => {
    if (!location.hash) return;
    const sectionId = location.hash.replace('#', '');
    // Pequeno delay para garantir que o DOM já renderizou
    const timer = setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [location.hash]);

  return (
    <div className="colecao-root">
      {/* Fundo Ferrofluid fixo */}
      <div className="colecao-bg">
        <Ferrofluid
          colors={['#ffffff', '#aaaaaa', '#555555']}
          speed={0.4}
          scale={1.6}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={2.5}
          shimmer={1.5}
          glow={2}
          flowDirection="down"
          opacity={1}
          mouseInteraction={true}
          mouseStrength={1}
          mouseRadius={0.35}
          mouseDampening={0.15}
        />
      </div>

      {/* Overlay escuro */}
      <div className="colecao-dim" />

      {/* Conteúdo scrollável */}
      <main className="colecao-content">
        <img
          src={Logo}
          alt="Symbionte"
          className="colecao-logo"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />

        {SECTIONS.map(section => (
          // id em cada section para o scroll funcionar
          <section key={section.id} id={section.id} className="colecao-section">
            <h2 className={`colecao-section-title ${section.id === 'king-in-black' ? 'vip' : ''}`}>
              {section.label}
              {section.id === 'king-in-black' && <span className="vip-badge">VIP</span>}
            </h2>

            <div className="colecao-grid">
              {PRODUCTS.filter(p => section.ids.includes(p.id)).map(product => (
                <div
                  key={product.id}
                  className={`colecao-card-wrap ${product.isShoe ? 'colecao-card-wrap--shoe' : ''}`}
                  onClick={() => navigate(`/colecao/${product.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <TiltedCard
                    imageSrc={product.image}
                    altText={product.name}
                    captionText={product.caption}
                    containerHeight={isMobile ? '180px' : '300px'}
                    containerWidth={isMobile ? '100%' : '220px'}
                    imageHeight={isMobile ? '180px' : '300px'}
                    imageWidth={isMobile ? '100%' : '220px'}
                    objectFit="cover"
                    scaleOnHover={1.08}
                    rotateAmplitude={12}
                    showMobileWarning={false}
                    showTooltip={false}
                  />
                  <div className="colecao-card-info">
                    <span className="colecao-card-name">{product.name}</span>
                    <span className={`colecao-card-price ${section.id === 'king-in-black' ? 'price-gold' : ''}`}>
                      {product.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
