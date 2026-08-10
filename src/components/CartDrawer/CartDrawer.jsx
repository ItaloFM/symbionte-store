import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const drawerRef = useRef(null);

  // Fecha com ESC
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') closeCart(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeCart]);

  // Bloqueia scroll do body enquanto aberto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const formatPrice = num =>
    num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleCheckout = () => {
    closeCart();
    navigate('/colecao'); // placeholder — troca pela rota de checkout quando existir
  };

  return (
    <>
      {/* Overlay escuro */}
      <div
        className={`cd-overlay ${isOpen ? 'cd-overlay--visible' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Painel lateral */}
      <aside
        ref={drawerRef}
        className={`cd-drawer ${isOpen ? 'cd-drawer--open' : ''}`}
        aria-label="Carrinho de compras"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="cd-header">
          <div className="cd-header-title">
            <span className="cd-title">Carrinho</span>
            {totalItems > 0 && (
              <span className="cd-count">{totalItems} {totalItems === 1 ? 'item' : 'itens'}</span>
            )}
          </div>
          <button className="cd-close" onClick={closeCart} aria-label="Fechar carrinho">
            ✕
          </button>
        </div>

        {/* Itens */}
        <div className="cd-body">
          {items.length === 0 ? (
            <div className="cd-empty">
              <p className="cd-empty-icon">◻</p>
              <p className="cd-empty-text">Seu carrinho está vazio.</p>
              <button className="cd-empty-btn" onClick={() => { closeCart(); navigate('/colecao'); }}>
                Ver Coleção
              </button>
            </div>
          ) : (
            <ul className="cd-list">
              {items.map(({ product, size, qty }) => {
                const isVip = product.collectionId === 'king-in-black';
                return (
                  <li key={`${product.id}-${size}`} className="cd-item">
                    {/* Imagem */}
                    <div className="cd-item-img">
                      <img src={product.image} alt={product.name} />
                    </div>

                    {/* Info */}
                    <div className="cd-item-info">
                      <span className="cd-item-collection">{product.collection}</span>
                      <span className="cd-item-name">{product.name}</span>
                      <span className="cd-item-size">Tamanho: {size}</span>
                      <span className={`cd-item-price ${isVip ? 'cd-item-price--vip' : ''}`}>
                        {formatPrice(product.priceNum * qty)}
                      </span>
                    </div>

                    {/* Controles de quantidade */}
                    <div className="cd-item-controls">
                      <button
                        className="cd-qty-btn"
                        onClick={() => updateQty(product.id, size, -1)}
                        aria-label="Diminuir quantidade"
                      >
                        −
                      </button>
                      <span className="cd-qty">{qty}</span>
                      <button
                        className="cd-qty-btn"
                        onClick={() => updateQty(product.id, size, 1)}
                        aria-label="Aumentar quantidade"
                      >
                        +
                      </button>
                      <button
                        className="cd-remove-btn"
                        onClick={() => removeItem(product.id, size)}
                        aria-label={`Remover ${product.name}`}
                      >
                        🗑
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer com total e checkout */}
        {items.length > 0 && (
          <div className="cd-footer">
            <div className="cd-subtotal">
              <span className="cd-subtotal-label">Subtotal</span>
              <span className="cd-subtotal-value">{formatPrice(totalPrice)}</span>
            </div>
            <p className="cd-shipping-note">Frete calculado no checkout</p>
            <button className="cd-checkout-btn" onClick={handleCheckout}>
              Finalizar Compra
            </button>
            <button className="cd-clear-btn" onClick={clearCart}>
              Limpar carrinho
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
