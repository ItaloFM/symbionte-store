import { useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { BsCart3 } from 'react-icons/bs';
import { useCart } from '../../context/CartContext';
import './navbar.css';

const NAV_BUTTONS = [
    { label: 'Anti Venom',    hash: 'anti-venom',    cls: 'btn-silver' },
    { label: 'Spidey',        hash: 'spidey',        cls: 'btn-spidey' },
    { label: 'Klyntar',       hash: 'klyntar',       cls: 'btn-black' },
    { label: 'King in Black', hash: 'king-in-black', cls: 'btn-gold' },
];

const CardNav = ({
    logo,
    logoAlt = 'Logo',
    items,
    className = '',
    ease = 'power3.out',
    baseColor = '#fff',
    menuColor,
}) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef(null);
    const cardsRef = useRef([]);
    const tlRef = useRef(null);
    const navigate = useNavigate();
    const { totalItems, toggleCart } = useCart();

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 200;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            // 60px topbar + 2 linhas de botões (48px cada) + gaps + padding
            // 2 botões por linha × 2 linhas + 1 linha carrinho = 3 linhas × 48px + gaps
            return 60 + (48 * 3) + (8 * 2) + (12 * 2); // ≈ 232px
        }
        return 260;
    };

    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 60, overflow: 'hidden' });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });
        tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
        tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;
        return () => { tl?.kill(); tlRef.current = null; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ease, items]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;
            if (isExpanded) {
                gsap.set(navRef.current, { height: calculateHeight() });
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) { newTl.progress(1); tlRef.current = newTl; }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) tlRef.current = newTl;
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
            tl.reverse();
        }
    };

    const setCardRef = i => el => { if (el) cardsRef.current[i] = el; };

    return (
        <div className={`card-nav-container ${className}`}>
            <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
                <div className="card-nav-top">
                    {/* Hamburger (mobile) */}
                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
                        onClick={toggleMenu}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); } }}
                        role="button"
                        aria-label={isExpanded ? 'Fechar menu' : 'Abrir menu'}
                        aria-expanded={isExpanded}
                        tabIndex={0}
                        style={{ color: menuColor || '#000' }}
                    >
                        <div className="hamburger-line" />
                        <div className="hamburger-line" />
                    </div>

                    {/* Logo → home */}
                    <div
                        className="logo-container"
                        onClick={() => navigate('/')}
                        style={{ cursor: 'pointer' }}
                        role="link"
                        aria-label="Ir para a página inicial"
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === 'Enter') navigate('/'); }}
                    >
                        <img src={logo} alt={logoAlt} className="logo" />
                    </div>

                    {/* Botões de coleção → /colecao#section */}
                    <div className="card-nav-buttons">
                        {NAV_BUTTONS.map(({ label, hash, cls }) => (
                            <Link key={hash} to={`/colecao#${hash}`} className="card-nav-link">
                                <button type="button" className={`card-nav-cta-button ${cls}`}>
                                    {label}
                                </button>
                            </Link>
                        ))}

                        {/* Ícone do carrinho */}
                        <button
                            type="button"
                            className="cart-icon-btn"
                            onClick={toggleCart}
                            aria-label={`Abrir carrinho${totalItems > 0 ? ` — ${totalItems} itens` : ''}`}
                        >
                            <BsCart3 className="cart-icon" />
                            {totalItems > 0 && (
                                <span className="cart-badge">{totalItems > 99 ? '99+' : totalItems}</span>
                            )}
                        </button>
                    </div>
                </div>

                <div className="card-nav-content" aria-hidden={!isExpanded}>
                    {/* Mobile: botões de coleção + carrinho */}
                    <div className="mobile-nav-menu">
                        {NAV_BUTTONS.map(({ label, hash, cls }) => (
                            <Link
                                key={hash}
                                to={`/colecao#${hash}`}
                                className="card-nav-link"
                                onClick={() => { setIsHamburgerOpen(false); setIsExpanded(false); }}
                            >
                                <button type="button" className={`card-nav-cta-button mobile-menu-btn ${cls}`}>
                                    {label}
                                </button>
                            </Link>
                        ))}

                        <button
                            type="button"
                            className="card-nav-cta-button mobile-menu-btn btn-silver mobile-cart-btn"
                            onClick={() => { toggleCart(); setIsHamburgerOpen(false); setIsExpanded(false); }}
                            aria-label="Abrir carrinho"
                        >
                            <BsCart3 style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                            Carrinho
                            {totalItems > 0 && (
                                <span className="mobile-cart-count">{totalItems}</span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
