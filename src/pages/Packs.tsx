import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Sparkles, Package, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PackCard from '@/components/PackCard';
import { packs, allProducts } from '@/data/products';

export default function Packs() {
  // Calculer les économies pour chaque pack
  const packsWithSavings = packs.map(pack => {
    const originalPrice = pack.items.reduce((sum, item) => {
      const product = allProducts.find(p => p.id === item.productId);
      const variant = product?.variants.find(v => v.id === item.variantId);
      return sum + (variant?.price || 0) * item.quantity;
    }, 0);
    const discountedPrice = originalPrice * (1 - pack.discountPercentage / 100);
    const savings = originalPrice - discountedPrice;
    return { ...pack, originalPrice, discountedPrice, savings };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mb-16">
          <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative py-16 px-8 lg:px-16 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <Gift className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Nos packs exclusifs
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-blue-100 max-w-2xl mx-auto mb-8"
              >
                Des bundles soigneusement sélectionnés pour vous offrir le meilleur rapport qualité-prix. 
                Économisez jusqu'à 15% sur nos packs premium.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-8"
              >
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{packs.length}</p>
                  <p className="text-blue-200">Packs disponibles</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">15%</p>
                  <p className="text-blue-200">Économie max</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">12</p>
                  <p className="text-blue-200">Mois garantie</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Why Packs */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Économies garanties',
                description: 'Jusqu\'à 15% de réduction par rapport à l\'achat séparé des produits.'
              },
              {
                icon: Package,
                title: 'Packaging premium',
                description: 'Vos produits livrés dans un coffret cadeau exclusif AyoubStore.'
              },
              {
                icon: Check,
                title: 'Compatibilité assurée',
                description: 'Tous les produits dans nos packs sont testés et compatibles entre eux.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Packs Grid */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choisissez votre pack
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Des combinaisons parfaites pour une expérience complète. 
              Chaque pack inclut des produits premium à prix réduit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packsWithSavings.map((pack, index) => (
              <PackCard key={pack.id} pack={pack} index={index} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-3xl p-8 lg:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Vous ne trouvez pas le pack parfait ?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Contactez-nous pour créer un pack personnalisé selon vos besoins. 
              Notre équipe vous proposera les meilleures combinaisons.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Créer un pack sur mesure
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
