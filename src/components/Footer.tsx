import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CreditCard,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react';

const footerLinks = {
  products: [
    { name: 'iPhones', href: '/products?brand=Apple&category=smartphone' },
    { name: 'Samsung', href: '/products?brand=Samsung' },
    { name: 'Google Pixel', href: '/products?brand=Google' },
    { name: 'MacBooks', href: '/products?category=laptop' },
    { name: 'Accessoires', href: '/products?category=accessory' },
    { name: 'Packs', href: '/packs' },
  ],
  support: [
    { name: 'Centre d\'aide', href: '#' },
    { name: 'Livraison', href: '#' },
    { name: 'Retours', href: '#' },
    { name: 'Garantie', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'FAQ', href: '#' },
  ],
  company: [
    { name: 'À propos', href: '#' },
    { name: 'Carrières', href: '#' },
    { name: 'Presse', href: '#' },
    { name: 'Partenaires', href: '#' },
    { name: 'Blog', href: '#' },
  ],
  legal: [
    { name: 'Conditions générales', href: '#' },
    { name: 'Politique de confidentialité', href: '#' },
    { name: 'Cookies', href: '#' },
    { name: 'Mentions légales', href: '#' },
  ],
};

const features = [
  { icon: Truck, title: 'Livraison express', description: '24-48h partout en Algérie' },
  { icon: Shield, title: 'Garantie officielle', description: '12 à 24 mois sur tous les produits' },
  { icon: RotateCcw, title: 'Retours faciles', description: '14 jours pour changer d\'avis' },
  { icon: CreditCard, title: 'Paiement sécurisé', description: 'CB, CCP, ou paiement à la livraison' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Features Bar */}
      <div className="border-b border-gray-800">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{feature.title}</h4>
                  <p className="text-gray-400 text-xs mt-0.5">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl tracking-tight">
                Ayoub<span className="text-blue-400">Store</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Votre destination premium pour smartphones, laptops et accessoires tech. 
              Produits authentiques, garantie officielle et service client d'excellence.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+212700547163" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4 text-blue-400" />
                +212 7 00 54 71 63
              </a>
              <a href="mailto:contact@ayoubstore.dz" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                <Mail className="w-4 h-4 text-blue-400" />
                contact@ayoubstore.ma
              </a>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-blue-400" />
                Casablanca - Maroc
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Produits</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Entreprise</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Légal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2024 AyoubStore. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span>Paiement sécurisé par</span>
                <div className="flex gap-2">
                  {['Visa', 'Mastercard', 'CCP'].map((card) => (
                    <span key={card} className="px-2 py-1 bg-gray-800 rounded text-xs">
                      {card}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
