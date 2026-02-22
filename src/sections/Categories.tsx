import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, Laptop, Headphones, Package, ArrowUpRight } from 'lucide-react';
import { allProducts, packs } from '@/data/products';

const categories = [
  {
    id: 'smartphone',
    name: 'Smartphones',
    description: 'iPhone, Samsung, Google Pixel',
    icon: Smartphone,
    image: '/categories/smartphones.jpg',
    count: allProducts.filter(p => p.category === 'smartphone').length,
    color: 'from-blue-600 to-blue-800',
    href: '/products?category=smartphone'
  },
  {
    id: 'laptop',
    name: 'PC & Laptops',
    description: 'MacBook, Dell, ultrabooks',
    icon: Laptop,
    image: '/categories/laptops.jpg',
    count: allProducts.filter(p => p.category === 'laptop').length,
    color: 'from-gray-700 to-gray-900',
    href: '/products?category=laptop'
  },
  {
    id: 'accessory',
    name: 'Accessoires',
    description: 'AirPods, casques, chargeurs',
    icon: Headphones,
    image: '/categories/accessories.jpg',
    count: allProducts.filter(p => p.category === 'accessory').length,
    color: 'from-purple-600 to-purple-800',
    href: '/products?category=accessory'
  },
  {
    id: 'pack',
    name: 'Packs',
    description: 'Bundles économiques',
    icon: Package,
    image: '/categories/packs.jpg',
    count: packs.length,
    color: 'from-green-600 to-green-800',
    href: '/packs'
  }
];

export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
            Nos catégories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            Explorez nos univers
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Du smartphone dernier cri aux accessoires essentiels, trouvez tout ce dont vous avez besoin.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={category.href}>
                <div className="group relative h-80 rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80 transition-opacity duration-300 group-hover:opacity-90`} />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowUpRight className="w-5 h-5 text-gray-900" />
                      </motion.div>
                    </div>

                    {/* Bottom */}
                    <div>
                      <span className="text-white/70 text-sm">
                        {category.count} produits
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-1">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-sm mt-2">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
