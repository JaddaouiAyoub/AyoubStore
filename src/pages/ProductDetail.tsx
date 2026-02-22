import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Check, 
  Shield, 
  Truck, 
  RotateCcw,
  Battery,
  Cpu,
  ChevronRight,
  Minus,
  Plus,
  AlertCircle,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { allProducts } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { getRelatedProducts } from '@/utils/filters';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  
  const product = allProducts.find(p => p.id === id);
  const relatedProducts = product ? getRelatedProducts(allProducts, product, 4) : [];
  
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setSelectedImage(0);
      setQuantity(1);
    }
  }, [product]);

  if (!product || !selectedVariant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Produit non trouvé</h1>
          <p className="text-gray-500 mb-4">Le produit que vous recherchez n'existe pas.</p>
          <Link to="/products">
            <Button>Retour aux produits</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedVariant.stock === 0) {
      toast.error('Produit en rupture de stock');
      return;
    }

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      quantity
    });

    toast.success(`${product.name} ajouté au panier`, {
      description: `${selectedVariant.color} ${selectedVariant.capacity || ''} × ${quantity}`
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href
      });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Lien copié dans le presse-papiers');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      <Header />

      <main className="pt-24 pb-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-blue-600">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-blue-600">Produits</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images Gallery */}
            <div>
              <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-blue-600 text-white">Nouveau</Badge>
                  )}
                  {product.isUsed && (
                    <Badge className="bg-amber-500 text-white">Occasion</Badge>
                  )}
                  {selectedVariant.stock === 0 && (
                    <Badge variant="destructive">Rupture</Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Main Image */}
                <motion.div
                  className="w-full h-full flex items-center justify-center p-8 cursor-zoom-in"
                  onClick={() => setIsZoomed(true)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={selectedVariant.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </div>

              {/* Thumbnails */}
              {selectedVariant.images.length > 1 && (
                <div className="flex gap-3">
                  {selectedVariant.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-blue-600 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Brand & Rating */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-1">({product.reviewCount} avis)</span>
                </div>
              </div>

              {/* Name */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Short Description */}
              <p className="text-gray-600 mb-6">
                {product.shortDescription}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {selectedVariant.price.toLocaleString()} MAD
                </span>
                {product.isUsed && (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                    Occasion {product.condition}
                  </Badge>
                )}
              </div>

              {/* Used Product Info */}
              {product.isUsed && product.batteryInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-amber-900">Occasion certifiée</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Battery className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-amber-800">
                        Batterie: {product.batteryInfo.healthPercentage}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-amber-800">
                        {product.batteryInfo.cycleCount} cycles
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-amber-800">
                        Face ID: {product.batteryInfo.faceIdWorking ? 'OK' : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-amber-800">
                        Garantie: {product.warrantyMonths} mois
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Variants */}
              <div className="space-y-4 mb-6">
                {/* Colors */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Couleur: <span className="text-gray-900">{selectedVariant.color}</span>
                  </label>
                  <div className="flex gap-2">
                    {product.variants
                      .filter((v, i, arr) => arr.findIndex(t => t.color === v.color) === i)
                      .map(variant => (
                        <button
                          key={variant.color}
                          onClick={() => {
                            const sameColorVariant = product.variants.find(v => 
                              v.color === variant.color && 
                              v.capacity === selectedVariant.capacity
                            ) || product.variants.find(v => v.color === variant.color);
                            if (sameColorVariant) setSelectedVariant(sameColorVariant);
                          }}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            selectedVariant.color === variant.color
                              ? 'border-blue-600 ring-2 ring-blue-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ backgroundColor: variant.colorCode }}
                          title={variant.color}
                        />
                      ))}
                  </div>
                </div>

                {/* Capacities */}
                {selectedVariant.capacity && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Capacité: <span className="text-gray-900">{selectedVariant.capacity}</span>
                    </label>
                    <div className="flex gap-2">
                      {product.variants
                        .filter((v, i, arr) => arr.findIndex(t => t.capacity === v.capacity) === i)
                        .map(variant => (
                          <button
                            key={variant.capacity}
                            onClick={() => {
                              const sameCapacityVariant = product.variants.find(v => 
                                v.capacity === variant.capacity && 
                                v.color === selectedVariant.color
                              ) || product.variants.find(v => v.capacity === variant.capacity);
                              if (sameCapacityVariant) setSelectedVariant(sameCapacityVariant);
                            }}
                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                              selectedVariant.capacity === variant.capacity
                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                : 'border-gray-200 text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            {variant.capacity}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-6">
                {selectedVariant.stock > 0 ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-green-600">
                      En stock ({selectedVariant.stock} disponible{selectedVariant.stock > 1 ? 's' : ''})
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-sm text-red-600">Rupture de stock</span>
                  </>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700">Quantité:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= selectedVariant.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <Button
                  onClick={handleAddToCart}
                  disabled={selectedVariant.stock === 0}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 h-14 text-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Ajouter au panier
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={selectedVariant.stock === 0}
                  variant="outline"
                  className="flex-1 h-14 text-lg"
                >
                  Acheter maintenant
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs text-gray-600">Livraison 24-48h</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs text-gray-600">{product.warrantyMonths} mois garantie</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-xs text-gray-600">14j retours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent">
                <TabsTrigger value="description" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                  Description
                </TabsTrigger>
                <TabsTrigger value="specs" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                  Spécifications
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
                  Avis ({product.reviewCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div className="max-w-3xl">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="specs" className="mt-6">
                <div className="max-w-2xl">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key} className="border-b">
                          <td className="py-3 text-gray-500 w-1/3">{key}</td>
                          <td className="py-3 text-gray-900">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.reviews.slice(0, 4).map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.userName}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                      {review.verified && (
                        <div className="flex items-center gap-1 mt-2">
                          <Check className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-600">Achat vérifié</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Produits similaires
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
          >
            <img
              src={selectedVariant.images[selectedImage]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
