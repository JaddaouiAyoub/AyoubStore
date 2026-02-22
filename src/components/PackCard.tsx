import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Sparkles, ChevronRight } from 'lucide-react';
import type { Pack } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { allProducts } from '@/data/products';
import { toast } from 'sonner';

interface PackCardProps {
  pack: Pack;
  index?: number;
}

export default function PackCard({ pack, index = 0 }: PackCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  // Calculer le prix original et le prix réduit
  const originalPrice = pack.items.reduce((sum, item) => {
    const product = allProducts.find(p => p.id === item.productId);
    const variant = product?.variants.find(v => v.id === item.variantId);
    return sum + (variant?.price || 0) * item.quantity;
  }, 0);

  const discountedPrice = originalPrice * (1 - pack.discountPercentage / 100);
  const savings = originalPrice - discountedPrice;

  const handleAddPackToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Ajouter chaque item du pack
    pack.items.forEach(item => {
      addItem({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        isPack: true,
        packId: pack.id
      });
    });

    toast.success(`Pack ${pack.name} ajouté au panier`, {
      description: `Économie de ${savings.toLocaleString()} MAD`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative p-6">
          {/* Badge */}
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
              <Sparkles className="w-3 h-3 mr-1" />
              {pack.badge}
            </Badge>
            <Badge className="bg-green-500 text-white border-0">
              -{pack.discountPercentage}%
            </Badge>
          </div>

          {/* Pack Image */}
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-video bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden mb-4"
          >
            <img
              src={pack.image}
              alt={pack.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Content */}
          <h3 className="text-xl font-bold text-white mb-2">
            {pack.name}
          </h3>
          <p className="text-blue-100 text-sm mb-4 line-clamp-2">
            {pack.description}
          </p>

          {/* Items List */}
          <div className="space-y-2 mb-4">
            {pack.items.slice(0, 3).map((item, idx) => {
              const product = allProducts.find(p => p.id === item.productId);
              return (
                <div key={idx} className="flex items-center gap-2 text-sm text-blue-100">
                  <Package className="w-4 h-4 flex-shrink-0" />
                  <span className="line-clamp-1">{product?.name}</span>
                  {item.quantity > 1 && (
                    <span className="text-blue-200">x{item.quantity}</span>
                  )}
                </div>
              );
            })}
            {pack.items.length > 3 && (
              <p className="text-sm text-blue-200">
                +{pack.items.length - 3} autres produits
              </p>
            )}
          </div>

          {/* Pricing */}
          <div className="flex items-end gap-3 mb-4">
            <span className="text-2xl font-bold text-white">
              {discountedPrice.toLocaleString()} MAD
            </span>
            <span className="text-sm text-blue-200 line-through">
              {originalPrice.toLocaleString()} MAD
            </span>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <Button
              onClick={handleAddPackToCart}
              className="flex-1 bg-white text-blue-700 hover:bg-blue-50 font-semibold"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ajouter le pack
            </Button>
            <Link to={`/packs`}>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Savings */}
          <div className="mt-4 pt-4 border-t border-white/20 text-center">
            <p className="text-sm text-blue-100">
              Économisez <span className="font-bold text-white">{savings.toLocaleString()} MAD</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
