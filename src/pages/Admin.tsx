import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  LayoutDashboard, 
  Package, 
  Plus, 
  Edit, 
  Trash2,
  LogOut,
  Search,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAdminStore } from '@/store/adminStore';
import { allProducts, packs } from '@/data/products';

// Login Component
function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const login = useAdminStore(state => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        toast.success('Connexion réussie');
      } else {
        toast.error('Identifiants incorrects');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin AyoubStore</h1>
            <p className="text-gray-500 mt-2">Connectez-vous pour accéder au dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom d'utilisateur
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 h-12"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Se connecter'
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 text-center">
              <strong>Demo:</strong> admin / ayoubstore2024
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Dashboard Component
function AdminDashboard() {
  const logout = useAdminStore(state => state.logout);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'packs' | 'orders'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Stats
  const stats = {
    totalProducts: allProducts.length,
    totalPacks: packs.length,
    totalOrders: 156,
    revenue: 24500000,
    users: 1240
  };

  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white z-50">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <span className="font-bold text-lg">A</span>
            </div>
            <div>
              <p className="font-semibold">AyoubStore</p>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'overview' ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'products' ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
            >
              <Package className="w-5 h-5" />
              Produits
            </button>
            <button
              onClick={() => setActiveTab('packs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'packs' ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              Packs
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === 'orders' ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              Commandes
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors text-red-400"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Vue d'ensemble</h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  title="Produits"
                  value={stats.totalProducts}
                  icon={Package}
                  color="blue"
                />
                <StatCard
                  title="Packs"
                  value={stats.totalPacks}
                  icon={ShoppingCart}
                  color="green"
                />
                <StatCard
                  title="Commandes"
                  value={stats.totalOrders}
                  icon={TrendingUp}
                  color="purple"
                />
                <StatCard
                  title="Revenus"
                  value={`${(stats.revenue / 1000000).toFixed(1)}M MAD`}
                  icon={DollarSign}
                  color="amber"
                />
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
                <div className="space-y-4">
                  {[
                    { action: 'Nouvelle commande', item: 'iPhone 15 Pro Max', time: 'Il y a 5 min', type: 'order' },
                    { action: 'Produit ajouté', item: 'Samsung S24 Ultra', time: 'Il y a 1h', type: 'product' },
                    { action: 'Stock mis à jour', item: 'AirPods Pro 2', time: 'Il y a 2h', type: 'stock' },
                    { action: 'Nouveau client', item: 'Ahmed M.', time: 'Il y a 3h', type: 'user' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'order' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'product' ? 'bg-green-100 text-green-600' :
                          activity.type === 'stock' ? 'bg-amber-100 text-amber-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {activity.type === 'order' ? <ShoppingCart className="w-5 h-5" /> :
                           activity.type === 'product' ? <Package className="w-5 h-5" /> :
                           activity.type === 'stock' ? <TrendingUp className="w-5 h-5" /> :
                           <Users className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-500">{activity.item}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Produits</h1>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un produit
                </Button>
              </div>

              {/* Search */}
              <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Produit</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Marque</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Prix</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Stock</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.variants[0].images[0]}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary">{product.brand}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          {product.basePrice.toLocaleString()} MAD
                        </td>
                        <td className="px-6 py-4">
                          <span className={`${
                            product.variants.some(v => v.stock > 0) ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {product.variants.reduce((sum, v) => sum + v.stock, 0)} unités
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'packs' && (
            <motion.div
              key="packs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Packs</h1>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer un pack
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packs.map((pack) => (
                  <div key={pack.id} className="bg-white rounded-2xl shadow-sm p-6">
                    <img
                      src={pack.image}
                      alt={pack.name}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-2">{pack.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{pack.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-700">
                        -{pack.discountPercentage}%
                      </Badge>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-blue-100 rounded-lg text-blue-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded-lg text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Commandes</h1>
              
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Gestion des commandes
                </h2>
                <p className="text-gray-500">
                  Cette fonctionnalité sera disponible dans la prochaine mise à jour.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon: Icon, color }: { 
  title: string; 
  value: string | number; 
  icon: React.ElementType;
  color: 'blue' | 'green' | 'purple' | 'amber';
}) {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
}

// Main Admin Component
export default function Admin() {
  const isAuthenticated = useAdminStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
