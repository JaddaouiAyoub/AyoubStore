import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max',
    subtitle: 'Puce A17 Pro. Design titane.',
    description: 'L\'expérience iPhone ultime avec la puce la plus puissante jamais créée.',
    image: '/hero/iphone-15-pro-hero.jpg',
    cta: { text: 'Découvrir', href: '/product/iphone-15-pro-max' },
    secondaryCta: { text: 'Voir tous les iPhones', href: '/products?brand=Apple&category=smartphone' },
    theme: 'dark'
  },
  {
    id: 2,
    title: 'MacBook Pro M3',
    subtitle: 'Puissance pro portable.',
    description: 'Autonomie record, écran Liquid Retina XDR et puce M3 révolutionnaire.',
    image: '/hero/macbook-pro-hero.jpg',
    cta: { text: 'Acheter maintenant', href: '/product/macbook-pro-14-m3' },
    secondaryCta: { text: 'Comparer les modèles', href: '/products?category=laptop' },
    theme: 'light'
  },
  {
    id: 3,
    title: 'Galaxy S24 Ultra',
    subtitle: 'Galaxy AI révolutionnaire.',
    description: 'L\'intelligence artificielle au service de votre quotidien avec S Pen intégré.',
    image: '/hero/s24-ultra-hero.jpg',
    cta: { text: 'Explorer', href: '/product/samsung-s24-ultra' },
    secondaryCta: { text: 'Tous les Samsung', href: '/products?brand=Samsung' },
    theme: 'dark'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const slide = slides[currentSlide];
  const isDark = slide.theme === 'dark';

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        {slides.map((s, index) => (
          <motion.div
            key={s.id}
            initial={false}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${s.image})` }}
            />
            {/* Overlay */}
            <div className={`absolute inset-0 ${
              s.theme === 'dark' 
                ? 'bg-gradient-to-b from-black/60 via-black/30 to-black/80' 
                : 'bg-gradient-to-b from-white/20 via-transparent to-white/60'
            }`} />
          </motion.div>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <div className="max-w-4xl mx-auto">
          {/* Subtitle */}
          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-lg md:text-xl font-medium mb-4 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            {slide.subtitle}
          </motion.p>

          {/* Title */}
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {slide.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            key={`desc-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {slide.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            key={`cta-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to={slide.cta.href}>
              <Button
                size="lg"
                className={`${
                  isDark 
                    ? 'bg-white text-gray-900 hover:bg-gray-100' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } px-8 py-6 text-lg font-semibold rounded-full`}
              >
                {slide.cta.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={slide.secondaryCta.href}>
              <Button
                size="lg"
                variant="outline"
                className={`${
                  isDark 
                    ? 'border-white/30 text-white hover:bg-white/10' 
                    : 'border-gray-300 text-gray-900 hover:bg-gray-100'
                } px-8 py-6 text-lg rounded-full`}
              >
                {slide.secondaryCta.text}
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className="group relative"
            >
              <div className={`w-12 h-1 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? isDark ? 'bg-white' : 'bg-gray-900'
                  : isDark ? 'bg-white/30' : 'bg-gray-300'
              }`}>
                {index === currentSlide && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: 'linear' }}
                    className={`absolute inset-0 rounded-full origin-left ${
                      isDark ? 'bg-blue-400' : 'bg-blue-600'
                    }`}
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`flex flex-col items-center gap-2 ${
              isDark ? 'text-white/60' : 'text-gray-500'
            }`}
          >
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
