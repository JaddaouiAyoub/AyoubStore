import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Package,
  User
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
  { name: 'Accueil', href: '/', icon: null },
  { name: 'Smartphones', href: '/products?category=smartphone', icon: Smartphone },
  { name: 'Laptops', href: '/products?category=laptop', icon: Laptop },
  { name: 'Accessoires', href: '/products?category=accessory', icon: Headphones },
  { name: 'Packs', href: '/packs', icon: Package },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const totalItems = useCartStore(state => state.getTotalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            </motion.div>
            <span className={`font-bold text-xl tracking-tight transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              Ayoub<span className="text-blue-600">Store</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                } ${location.pathname === item.href ? 'text-blue-600' : ''}`}
              >
                <span className="flex items-center gap-2">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.name}
                </span>
                {location.pathname === item.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Search - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className={`relative group ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-48 lg:w-64 pl-10 pr-4 py-2 text-sm rounded-full border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                    isScrolled 
                      ? 'bg-gray-100 border-gray-200 text-gray-900 placeholder:text-gray-500' 
                      : 'bg-white/10 border-white/20 text-white placeholder:text-white/60'
                  }`}
                />
              </div>
            </form>

            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`relative ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-white hover:bg-white/10'}`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1"
                      >
                        <Badge className="h-5 w-5 flex items-center justify-center p-0 bg-blue-600 text-white text-xs">
                          {totalItems}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Votre Panier
                  </SheetTitle>
                </SheetHeader>
                <CartPreview />
              </SheetContent>
            </Sheet>

            {/* Admin Login */}
            <Link to="/admin">
              <Button
                variant="ghost"
                size="icon"
                className={`hidden sm:flex ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-white hover:bg-white/10'}`}
              >
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  {item.name}
                </Link>
              ))}
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </form>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// Composant preview panier
function CartPreview() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const { cartDetails, totalPrice } = useCartDetails();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Votre panier est vide</h3>
        <p className="text-gray-500 mb-6">Découvrez nos produits et ajoutez-les à votre panier</p>
        <Button onClick={() => navigate('/products')} className="bg-blue-600 hover:bg-blue-700">
          Explorer les produits
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto py-4 space-y-4">
        {cartDetails.map((item) => (
          <motion.div
            key={`${item.productId}-${item.variantId}`}
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex gap-4 p-3 bg-gray-50 rounded-xl"
          >
            <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
              {!item.isPack && 'color' in item && (
                <p className="text-sm text-gray-500">
                  {item.color} {'capacity' in item && item.capacity && `• ${item.capacity}`}
                </p>
              )}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center bg-white rounded border hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center bg-white rounded border hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <span className="font-semibold text-blue-600">
                  {(item.price * item.quantity).toLocaleString()} MAD
                </span>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.productId, item.variantId)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-blue-600">{totalPrice.toLocaleString()} MAD</span>
        </div>
        <Button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
        >
          Passer la commande
        </Button>
      </div>
    </div>
  );
}

import { useCartDetails } from '@/store/cartStore';
