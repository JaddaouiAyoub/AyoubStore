import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  ArrowRight, 
  Trash2, 
  Minus, 
  Plus, 
  Package,
  Truck,
  Shield,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCartStore, useCartDetails } from '@/store/cartStore';

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const { cartDetails, totalPrice, totalItems } = useCartDetails();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const shippingCost = totalPrice > 500000 ? 0 : 2500;
  const finalTotal = totalPrice + shippingCost;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      navigate('/checkout');
    }, 500);
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-50"
      >
        <Header />
        <main className="pt-24 pb-16">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-2xl mx-auto text-center py-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                Votre panier est vide
              </h1>
              <p className="text-gray-500 mb-8">
                Découvrez nos produits et ajoutez-les à votre panier pour passer commande.
              </p>
              <Link to="/products">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Explorer les produits
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <Header />

      <main className="pt-24 pb-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/products">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Mon panier ({totalItems} article{totalItems > 1 ? 's' : ''})
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-lg">Articles</h2>
                    <button
                      onClick={() => {
                        clearCart();
                        toast.success('Panier vidé');
                      }}
                      className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Vider le panier
                    </button>
                  </div>
                </div>

                <div className="divide-y">
                  <AnimatePresence mode="popLayout">
                    {cartDetails.map((item) => (
                      <motion.div
                        key={`${item.productId}-${item.variantId}`}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="p-6 flex gap-4"
                      >
                        {/* Image */}
                        <Link 
                          to={`/product/${item.productId}`}
                          className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <Link 
                                to={`/product/${item.productId}`}
                                className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                              >
                                {item.name}
                              </Link>
                              {!item.isPack && 'color' in item && (
                                <p className="text-sm text-gray-500 mt-1">
                                  {item.color} {'capacity' in item && item.capacity && `• ${item.capacity}`}
                                </p>
                              )}
                              {item.isPack && (
                                <Badge className="mt-1 bg-blue-100 text-blue-700">
                                  Pack
                                </Badge>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                removeItem(item.productId, item.variantId);
                                toast.success('Article retiré');
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity */}
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-10 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="font-bold text-gray-900">
                                {(item.price * item.quantity).toLocaleString()} MAD
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-sm text-gray-500">
                                  {item.price.toLocaleString()} MAD / unité
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white rounded-xl p-4 text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs text-gray-600">Livraison 24-48h</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs text-gray-600">Garantie incluse</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <Package className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs text-gray-600">Retours 14 jours</p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <h2 className="font-semibold text-lg mb-6">Résumé de la commande</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span>{totalPrice.toLocaleString()} MAD</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Livraison</span>
                    <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                      {shippingCost === 0 ? 'Gratuite' : `${shippingCost.toLocaleString()} MAD`}
                    </span>
                  </div>
                  {shippingCost === 0 && (
                    <p className="text-xs text-green-600">
                      Livraison gratuite pour les commandes +500 000 MAD
                    </p>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">{finalTotal.toLocaleString()} MAD</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Taxes incluses
                  </p>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg"
                >
                  {isCheckingOut ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Passer la commande
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <Link to="/products">
                  <Button variant="outline" className="w-full mt-3">
                    Continuer mes achats
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
