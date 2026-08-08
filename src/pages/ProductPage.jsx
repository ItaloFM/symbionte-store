import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import Ferrofluid from '../components/Ferrofluid/Ferrofluid';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="pp-not-found">
        <p>Produto não encontrado.</p>
        <button onClick={() => navigate('/colecao')}>← Voltar</button>
      </div>
    );
  }

  const isVip = product.collectionId === 'king-in-black';

  const handleAdd = () => {
    if (!selectedSize) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pp-root">
      {/* Fundo */}
      <div className="pp-bg">
        <Ferrofluid
          colors={['#ffffff', '#aaaaaa', '#444444']}
          speed={0.35}
          scale={1.8}
          turbulence={0.9}
          fluidity={0.12}
          rimWidth={0.18}
          sharpness={2.8}
          shimmer={1.2}
          glow={1.8}
          flowDirection="down"
          opacity={1}
          mouseInteraction={true}
          mouseStrength={0.8}
          mouseRadius={0.4}
          mouseDampening={0.2}
        />
      </div>
      <div className="pp-dim" />

      {/* Conteúdo */}
      <main className="pp-content">

        {/* Botão voltar */}
        <button className="pp-back" onClick={() => navigate('/colecao')}>
          ← Voltar à Coleção
        </button>

        <div className="pp-layout">

          {/* Imagem */}
          <div className={`pp-image-wrap ${product.isShoe ? 'pp-image-wrap--shoe' : ''}`}>
            <img src={product.image} alt={product.name} className={`pp-image ${product.isShoe ? 'pp-image--shoe' : ''}`} />
          </div>

          {/* Detalhes */}
          <div className="pp-details">

            {/* Badge de coleção */}
            <span className={`pp-collection-badge ${isVip ? 'vip' : ''}`}>
              {product.collection}
              {isVip && <span className="pp-vip-tag">VIP</span>}
            </span>

            <h1 className="pp-name">{product.name}</h1>

            <p className={`pp-price ${isVip ? 'price-gold' : ''}`}>
              {product.price}
            </p>

            <p className="pp-description">{product.description}</p>

            {/* Separador */}
            <div className="pp-divider" />

            {/* Seletor de tamanho */}
            <div className="pp-size-section">
              <p className="pp-size-label">
                Tamanho
                {selectedSize && <span className="pp-size-selected"> — {selectedSize}</span>}
              </p>
              <div className="pp-size-grid">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`pp-size-btn ${selectedSize === size ? 'active' : ''} ${isVip ? 'vip' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Botão comprar */}
            <button
              className={`pp-buy-btn ${isVip ? 'vip' : ''} ${!selectedSize ? 'disabled' : ''} ${added ? 'added' : ''}`}
              onClick={handleAdd}
              disabled={!selectedSize}
            >
              {added ? '✓ Adicionado ao Carrinho' : 'Adicionar ao Carrinho'}
            </button>

            {!selectedSize && (
              <p className="pp-size-hint">Selecione um tamanho para continuar</p>
            )}

            {/* Info extra */}
            <div className="pp-meta">
              <div className="pp-meta-item">
                <span className="pp-meta-label">Coleção</span>
                <span className="pp-meta-value">{product.collection}</span>
              </div>
              <div className="pp-meta-item">
                <span className="pp-meta-label">Tipo</span>
                <span className="pp-meta-value">{product.isShoe ? 'Calçado' : 'Vestuário'}</span>
              </div>
              <div className="pp-meta-item">
                <span className="pp-meta-label">Disponibilidade</span>
                <span className="pp-meta-value pp-meta-stock">Em estoque</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
