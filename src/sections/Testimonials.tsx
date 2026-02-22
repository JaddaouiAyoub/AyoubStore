import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Ahmed M.',
    location: 'Alger',
    avatar: '/avatars/avatar-1.jpg',
    rating: 5,
    text: 'Service impeccable ! J\'ai commandé un iPhone 15 Pro Max, livré en 24h avec emballage premium. Le produit est authentique et la garantie Apple est bien activée.',
    product: 'iPhone 15 Pro Max'
  },
  {
    id: 2,
    name: 'Sarah K.',
    location: 'Oran',
    avatar: '/avatars/avatar-2.jpg',
    rating: 5,
    text: 'Le pack iPhone + AirPods est une excellente affaire. J\'ai économisé plus de 100 000 MAD. Le service client est très réactif et professionnel.',
    product: 'Pack iPhone Premium'
  },
  {
    id: 3,
    name: 'Youssef B.',
    location: 'Constantine',
    avatar: '/avatars/avatar-3.jpg',
    rating: 5,
    text: 'J\'ai acheté un MacBook Pro M3 pour le travail. Livraison rapide, produit neuf scellé. AyoubStore est devenu mon magasin tech de référence.',
    product: 'MacBook Pro 14" M3'
  },
  {
    id: 4,
    name: 'Lina D.',
    location: 'Annaba',
    avatar: '/avatars/avatar-4.jpg',
    rating: 5,
    text: 'iPhone 14 d\'occasion acheté ici. L\'état de la batterie était exactement comme indiqué (92%). Face ID fonctionne parfaitement. Très satisfaite !',
    product: 'iPhone 14 Pro Max Occasion'
  },
  {
    id: 5,
    name: 'Karim A.',
    location: 'Blida',
    avatar: '/avatars/avatar-5.jpg',
    rating: 5,
    text: 'Galaxy S24 Ultra reçu en parfait état. Le suivi de commande est précis et l\'équipe m\'a tenu informé à chaque étape. Bravo !',
    product: 'Samsung Galaxy S24 Ultra'
  }
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
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
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
              Témoignages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Ce que disent nos clients
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl">
              Plus de 10 000 clients satisfaits nous font confiance. Découvrez leurs expériences.
            </p>
          </div>
          <div className="flex gap-3">
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
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-80 md:w-96 snap-start"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-blue-200 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-700 mb-6 line-clamp-4">
                  "{testimonial.text}"
                </p>

                {/* Product Tag */}
                <div className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
                  {testimonial.product}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '10K+', label: 'Clients satisfaits' },
            { value: '4.9/5', label: 'Note moyenne' },
            { value: '24h', label: 'Livraison express' },
            { value: '12', label: 'Mois de garantie' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
