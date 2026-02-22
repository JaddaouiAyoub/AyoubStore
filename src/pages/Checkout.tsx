import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Check, 
  CreditCard, 
  Truck, 
  MapPin, 
  User,
  Phone,
  Mail,
  Shield,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCartStore, useCartDetails } from '@/store/cartStore';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'card' | 'cod' | 'ccp';
}

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const { cartDetails, totalPrice } = useCartDetails();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod'
  });

  const shippingCost = totalPrice > 500000 ? 0 : 2500;
  const finalTotal = totalPrice + shippingCost;

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50"
      >
        <Header />
        <main className="pt-24 pb-16">
          <div className="w-full px-4 text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
            <Link to="/products">
              <Button>Continuer mes achats</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </motion.div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'shipping') {
      setStep('payment');
      return;
    }

    setIsSubmitting(true);
    
    // Simuler le traitement de la commande
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setStep('confirmation');
    clearCart();
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Finaliser la commande
            </h1>
          </div>

          {/* Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-blue-600' : 'text-green-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'shipping' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                }`}>
                  {step === 'shipping' ? '1' : <Check className="w-4 h-4" />}
                </div>
                <span className="hidden sm:inline font-medium">Livraison</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300" />
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-blue-600' : step === 'confirmation' ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'payment' ? 'bg-blue-600 text-white' : step === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-300'
                }`}>
                  {step === 'confirmation' ? <Check className="w-4 h-4" /> : '2'}
                </div>
                <span className="hidden sm:inline font-medium">Paiement</span>
              </div>
              <div className="w-12 h-0.5 bg-gray-300" />
              <div className={`flex items-center gap-2 ${step === 'confirmation' ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-300'
                }`}>
                  {step === 'confirmation' ? <Check className="w-4 h-4" /> : '3'}
                </div>
                <span className="hidden sm:inline font-medium">Confirmation</span>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 'confirmation' ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-12 h-12 text-green-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Commande confirmée !
                </h2>
                <p className="text-gray-600 mb-8">
                  Merci pour votre commande. Vous recevrez un email de confirmation avec les détails de votre achat.
                  <br />
                  Notre équipe vous contactera pour confirmer la livraison.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Retour à l'accueil
                    </Button>
                  </Link>
                  <Link to="/products">
                    <Button size="lg" variant="outline">
                      Continuer mes achats
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="lg:col-span-2"
                >
                  <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6">
                    {step === 'shipping' ? (
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          Adresse de livraison
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Prénom *
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="text"
                                required
                                value={formData.firstName}
                                onChange={(e) => updateFormData('firstName', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Votre prénom"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nom *
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="text"
                                required
                                value={formData.lastName}
                                onChange={(e) => updateFormData('lastName', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Votre nom"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email *
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => updateFormData('email', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="votre@email.com"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Téléphone *
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => updateFormData('phone', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="05XX XX XX XX"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Adresse *
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              required
                              value={formData.address}
                              onChange={(e) => updateFormData('address', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Votre adresse complète"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Ville *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.city}
                              onChange={(e) => updateFormData('city', e.target.value)}
                              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Alger"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Code postal
                            </label>
                            <input
                              type="text"
                              value={formData.postalCode}
                              onChange={(e) => updateFormData('postalCode', e.target.value)}
                              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="16000"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                          Mode de paiement
                        </h2>

                        <div className="space-y-3">
                          <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                            formData.paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                          }`}>
                            <input
                              type="radio"
                              name="payment"
                              value="cod"
                              checked={formData.paymentMethod === 'cod'}
                              onChange={(e) => updateFormData('paymentMethod', e.target.value as any)}
                              className="w-5 h-5 text-blue-600"
                            />
                            <div className="flex-1">
                              <p className="font-medium">Paiement à la livraison</p>
                              <p className="text-sm text-gray-500">Payez en espèces à la réception</p>
                            </div>
                            <Truck className="w-6 h-6 text-gray-400" />
                          </label>

                          <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                            formData.paymentMethod === 'ccp' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                          }`}>
                            <input
                              type="radio"
                              name="payment"
                              value="ccp"
                              checked={formData.paymentMethod === 'ccp'}
                              onChange={(e) => updateFormData('paymentMethod', e.target.value as any)}
                              className="w-5 h-5 text-blue-600"
                            />
                            <div className="flex-1">
                              <p className="font-medium">CCP / BaridiMob</p>
                              <p className="text-sm text-gray-500">Virement par CCP</p>
                            </div>
                            <CreditCard className="w-6 h-6 text-gray-400" />
                          </label>

                          <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                            formData.paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                          }`}>
                            <input
                              type="radio"
                              name="payment"
                              value="card"
                              checked={formData.paymentMethod === 'card'}
                              onChange={(e) => updateFormData('paymentMethod', e.target.value as any)}
                              className="w-5 h-5 text-blue-600"
                            />
                            <div className="flex-1">
                              <p className="font-medium">Carte bancaire</p>
                              <p className="text-sm text-gray-500">Visa, Mastercard (simulation)</p>
                            </div>
                            <CreditCard className="w-6 h-6 text-gray-400" />
                          </label>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                          <p className="text-sm text-amber-800">
                            <strong>Note:</strong> Ceci est une démonstration. Aucun paiement réel ne sera effectué.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-4 mt-8">
                      {step === 'payment' && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep('shipping')}
                          className="flex-1"
                        >
                          Retour
                        </Button>
                      )}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 h-12"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : step === 'shipping' ? (
                          'Continuer'
                        ) : (
                          'Confirmer la commande'
                        )}
                      </Button>
                    </div>
                  </form>
                </motion.div>

                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-1"
                >
                  <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                    <h2 className="font-semibold text-lg mb-6">Résumé</h2>

                    {/* Items */}
                    <div className="space-y-4 mb-6 max-h-64 overflow-auto">
                      {cartDetails.map((item) => (
                        <div key={`${item.productId}-${item.variantId}`} className="flex gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              {item.quantity} × {item.price.toLocaleString()} MAD
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Sous-total</span>
                        <span>{totalPrice.toLocaleString()} MAD</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Livraison</span>
                        <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                          {shippingCost === 0 ? 'Gratuite' : `${shippingCost.toLocaleString()} MAD`}
                        </span>
                      </div>
                    </div>

                    <div className="border-t mt-4 pt-4">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-blue-600">{finalTotal.toLocaleString()} MAD</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span>Paiement sécurisé</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Truck className="w-4 h-4 text-blue-600" />
                        <span>Livraison 24-48h</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span>Garantie 12 mois</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
