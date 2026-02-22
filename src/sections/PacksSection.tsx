import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PackCard from '@/components/PackCard';
import { packs } from '@/data/products';

export default function PacksSection() {
  const sortedPacks = [...packs].sort((a, b) => b.popularity - a.popularity);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
                Packs exclusifs
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Économisez avec nos packs
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl">
              Des bundles soigneusement sélectionnés pour vous offrir le meilleur rapport qualité-prix. 
              Jusqu'à 15% de réduction sur les packs premium.
            </p>
          </div>
          <Link to="/packs">
            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
            >
              Tous les packs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Packs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedPacks.map((pack, index) => (
            <PackCard key={pack.id} pack={pack} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <div className="text-left">
              <p className="text-white font-semibold">Vous ne trouvez pas votre pack idéal ?</p>
              <p className="text-gray-400 text-sm">Contactez-nous pour créer un pack personnalisé</p>
            </div>
            <Link to="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Créer mon pack
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
