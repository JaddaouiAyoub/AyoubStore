import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { allProducts } from '@/data/products';

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Produits populaires (triés par popularité)
  const popularProducts = [...allProducts]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 8);

  // Nouveautés
  const newProducts = allProducts
    .filter(p => p.isNew)
    .slice(0, 4);

  // Occasions certifiées
  const usedProducts = allProducts
    .filter(p => p.isUsed)
    .slice(0, 4);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-orange-500 uppercase tracking-wider">
                Les plus populaires
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Produits tendance
            </h2>
            <p className="text-gray-500 mt-2 max-w-lg">
              Découvrez nos produits les plus demandés, sélectionnés pour leur qualité et leur popularité.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <Link to="/products">
              <Button variant="outline" className="hidden sm:flex">
                Voir tout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Products Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {popularProducts.map((product, index) => (
            <div key={product.id} className="flex-shrink-0 w-72 snap-start">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        {/* New Products Grid */}
        {newProducts.length > 0 && (
          <div className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
                  Nouveautés
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                  Derniers arrivages
                </h2>
              </div>
              <Link to="/products?sort=newest">
                <Button variant="ghost" className="text-blue-600">
                  Voir tout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Used Products Section */}
        {usedProducts.length > 0 && (
          <div className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Occasions certifiées
                  </h2>
                  <p className="text-white/80 mt-2">
                    iPhones d'occasion testés et garantis. Batterie vérifiée, Face ID fonctionnel.
                  </p>
                </div>
                <Link to="/products?condition=used">
                  <Button className="bg-white text-orange-600 hover:bg-gray-100">
                    Explorer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {usedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
