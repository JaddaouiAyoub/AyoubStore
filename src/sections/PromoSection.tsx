import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function PromoSection() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Promo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative p-8 lg:p-12">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-400" />
                <Badge className="bg-white/20 text-white border-0">
                  Offre limitée
                </Badge>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                -10% sur votre première commande
              </h2>
              <p className="text-blue-100 mb-8 max-w-md">
                Inscrivez-vous à notre newsletter et recevez 10% de réduction sur votre premier achat. 
                Offre valable sur tous les produits.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button className="bg-white text-blue-700 hover:bg-gray-100 font-semibold">
                    Profiter de l'offre
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Newsletter Form */}
              <div className="mt-8 flex gap-3">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
                  S'inscrire
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Secondary Promo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative bg-gray-900 rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-50"
              style={{ backgroundImage: 'url(/promo/occasion-promo.jpg)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />

            <div className="relative p-8 lg:p-12 h-full flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-green-400" />
                <Badge className="bg-green-500 text-white border-0">
                  Stock limité
                </Badge>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                iPhone occasion certifié
              </h2>
              <p className="text-gray-300 mb-8 max-w-md">
                Des iPhones d'occasion testés et garantis 6 mois. Batterie vérifiée, 
                Face ID fonctionnel. Économisez jusqu'à 40%.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products?condition=used">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Voir les occasions
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-8 flex gap-8">
                <div>
                  <p className="text-2xl font-bold text-white">92%</p>
                  <p className="text-sm text-gray-400">Batterie min</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">6</p>
                  <p className="text-sm text-gray-400">Mois garantie</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">-40%</p>
                  <p className="text-sm text-gray-400">Économie</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
