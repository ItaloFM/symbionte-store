import { useNavigate } from 'react-router-dom';
import Ferrofluid from '../components/Ferrofluid/Ferrofluid';
import TiltedCard from '../components/TiltedCard/TiltedCard';
import { PRODUCTS, SECTIONS } from '../data/products';
import './ColecaoPage.css';

export default function ColecaoPage() {
  const navigate = useNavigate();

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
        <h1 className="colecao-title">Coleção Symbionte</h1>

        {SECTIONS.map(section => (
          <section key={section.id} className="colecao-section">
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
                    containerHeight="300px"
                    containerWidth="220px"
                    imageHeight="300px"
                    imageWidth="220px"
                    objectFit="cover"
                    scaleOnHover={1.08}
                    rotateAmplitude={12}
                    showMobileWarning={false}
                    showTooltip={true}
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
