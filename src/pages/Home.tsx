import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/sections/Hero';
import FeaturedProducts from '@/sections/FeaturedProducts';
import Categories from '@/sections/Categories';
import PacksSection from '@/sections/PacksSection';
import Testimonials from '@/sections/Testimonials';
import PromoSection from '@/sections/PromoSection';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Header />
      
      <main>
        <Hero />
        <FeaturedProducts />
        <Categories />
        <PacksSection />
        <Testimonials />
        <PromoSection />
      </main>
      
      <Footer />
    </motion.div>
  );
}
