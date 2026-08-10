import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HeroSection from './components/HeroSection/HeroSection'
import CardNav from './components/navbar/navbar'
import Logo from './assets/Logo.png'
import ColecaoPage from './pages/ColecaoPage'
import ProductPage from './pages/ProductPage'
import NotFoundPage from './pages/NotFoundPage'
import { CartProvider } from './context/CartContext'
import CartDrawer from './components/CartDrawer/CartDrawer'

const NAV_ITEMS = [
  {
    label: 'Coleção',
    bgColor: '#111111',
    textColor: '#ffffff',
    links: [
      { label: 'Nova temporada', href: '#', ariaLabel: 'Nova temporada' },
      { label: 'Mais vendidos',  href: '#', ariaLabel: 'Mais vendidos' },
      { label: 'Lançamentos',   href: '#', ariaLabel: 'Lançamentos' },
    ],
  },
  {
    label: 'Lookbook',
    bgColor: '#1a1a1a',
    textColor: '#ffffff',
    links: [
      { label: 'Verão 2026',   href: '#', ariaLabel: 'Lookbook verão 2026' },
      { label: 'Collab drops', href: '#', ariaLabel: 'Collab drops' },
      { label: 'Editorial',    href: '#', ariaLabel: 'Editorial' },
    ],
  },
  {
    label: 'Sobre',
    bgColor: '#0d0d0d',
    textColor: '#ffffff',
    links: [
      { label: 'A marca',   href: '#', ariaLabel: 'A marca' },
      { label: 'Contato',   href: '#', ariaLabel: 'Contato' },
      { label: 'Carreiras', href: '#', ariaLabel: 'Carreiras' },
    ],
  },
]

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* Drawer disponível em todas as rotas */}
        <CartDrawer />

        <Routes>
          <Route path="/" element={
            <>
              <CardNav
                logo={Logo}
                logoAlt="Symbionte"
                items={NAV_ITEMS}
                baseColor="rgba(255, 255, 255, 0.08)"
                menuColor="#ffffff"
                buttonBgColor="#ffffff"
                buttonTextColor="#0a0a0a"
              />
              <HeroSection />
            </>
          } />
          <Route path="/colecao" element={<ColecaoPage />} />
          <Route path="/colecao/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
