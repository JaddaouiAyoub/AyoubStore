import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Battery, Check } from 'lucide-react';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  const defaultVariant = product.variants[0];
  const hasStock = product.variants.some(v => v.stock > 0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!hasStock) {
      toast.error('Produit en rupture de stock');
      return;
    }

    addItem({
      productId: product.id,
      variantId: defaultVariant.id,
      quantity: 1
    });

    toast.success(`${product.name} ajouté au panier`, {
      description: `${defaultVariant.color} ${defaultVariant.capacity || ''}`
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
      <Link to={`/product/${product.id}`}>
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
          {/* Image Container */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                  Nouveau
                </Badge>
              )}
              {product.isUsed && (
                <Badge variant="secondary" className="bg-amber-500 hover:bg-amber-600 text-white">
                  Occasion
                </Badge>
              )}
              {!hasStock && (
                <Badge variant="destructive">
                  Rupture
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsLiked(!isLiked);
                toast.success(isLiked ? 'Retiré des favoris' : 'Ajouté aux favoris');
              }}
              className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </motion.button>

            {/* Product Image */}
            <motion.div
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full flex items-center justify-center p-6"
            >
              <img
                src={defaultVariant.images[0]}
                alt={product.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </motion.div>

            {/* Quick Add Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4"
            >
              <Button
                onClick={handleAddToCart}
                disabled={!hasStock}
                className="bg-white text-gray-900 hover:bg-blue-600 hover:text-white transition-colors shadow-lg"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Brand */}
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              {product.brand}
            </p>

            {/* Name */}
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviewCount})</span>
            </div>

            {/* Used Product Info */}
            {product.isUsed && product.batteryInfo && (
              <div className="flex items-center gap-3 mb-3 text-xs">
                <div className="flex items-center gap-1 text-green-600">
                  <Battery className="w-3.5 h-3.5" />
                  <span>{product.batteryInfo.healthPercentage}%</span>
                </div>
                <div className="flex items-center gap-1 text-blue-600">
                  <Check className="w-3.5 h-3.5" />
                  <span>Face ID OK</span>
                </div>
              </div>
            )}

            {/* Price & Stock */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-gray-900">
                  {defaultVariant.price.toLocaleString()} MAD
                </span>
                {product.isUsed && (
                  <span className="text-xs text-gray-500 block">
                    Occasion {product.condition}
                  </span>
                )}
              </div>

              {/* Color Dots */}
              {product.variants.length > 1 && (
                <div className="flex gap-1">
                  {product.variants.slice(0, 4).map((variant) => (
                    <div
                      key={variant.id}
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: variant.colorCode }}
                      title={variant.color}
                    />
                  ))}
                  {product.variants.length > 4 && (
                    <span className="text-xs text-gray-400">+{product.variants.length - 4}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
