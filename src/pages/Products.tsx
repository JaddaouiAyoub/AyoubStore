import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Search, 
  X, 
  ChevronDown, 
  SlidersHorizontal,
  Grid3X3,
  List,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { allProducts, brands, colors, capacities } from '@/data/products';
import { filterProducts, sortProducts } from '@/utils/filters';
import type { FilterState } from '@/types';

const sortOptions = [
  { value: 'popularity', label: 'Popularité' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'newest', label: 'Nouveautés' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtres
  const [filters, setFilters] = useState<FilterState>({
    brands: searchParams.get('brand') ? [searchParams.get('brand')!] : [],
    categories: searchParams.get('category') ? [searchParams.get('category')!] : [],
    priceRange: [0, 3000000],
    condition: [],
    colors: [],
    capacities: [],
    inStockOnly: false,
    searchQuery: searchParams.get('search') || '',
    sortBy: 'popularity'
  });

  // Mettre à jour la recherche depuis les params
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
      setFilters(prev => ({ ...prev, searchQuery: search }));
    }
  }, [searchParams]);

  // Produits filtrés et triés
  const filteredProducts = useMemo(() => {
    let products = filterProducts(allProducts, filters);
    products = sortProducts(products, filters.sortBy);
    return products;
  }, [filters]);

  // Nombre de filtres actifs
  const activeFiltersCount = 
    filters.brands.length + 
    filters.categories.length + 
    filters.condition.length +
    filters.colors.length +
    filters.capacities.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 3000000 ? 1 : 0);

  const toggleFilter = (type: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[type] as string[];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      categories: [],
      priceRange: [0, 3000000],
      condition: [],
      colors: [],
      capacities: [],
      inStockOnly: false,
      searchQuery: '',
      sortBy: 'popularity'
    });
    setSearchQuery('');
    setSearchParams({});
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, searchQuery }));
  };

  // Composant filtres
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Marques */}
      <div>
        <h4 className="font-semibold mb-3">Marques</h4>
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => toggleFilter('brands', brand)}
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Prix */}
      <div>
        <h4 className="font-semibold mb-3">Prix</h4>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
          max={3000000}
          step={50000}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{filters.priceRange[0].toLocaleString()} MAD</span>
          <span>{filters.priceRange[1].toLocaleString()} MAD</span>
        </div>
      </div>

      {/* Condition */}
      <div>
        <h4 className="font-semibold mb-3">État</h4>
        <div className="space-y-2">
          {[
            { value: 'new', label: 'Neuf' },
            { value: 'used', label: 'Occasion' }
          ].map(condition => (
            <label key={condition.value} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.condition.includes(condition.value as 'new' | 'used')}
                onCheckedChange={() => toggleFilter('condition', condition.value)}
              />
              <span className="text-sm">{condition.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Couleurs */}
      <div>
        <h4 className="font-semibold mb-3">Couleurs</h4>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button
              key={color.name}
              onClick={() => toggleFilter('colors', color.name)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                filters.colors.includes(color.name) 
                  ? 'border-blue-600 ring-2 ring-blue-200' 
                  : 'border-gray-200'
              }`}
              style={{ backgroundColor: color.code }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Capacités */}
      <div>
        <h4 className="font-semibold mb-3">Capacité</h4>
        <div className="flex flex-wrap gap-2">
          {capacities.map(capacity => (
            <button
              key={capacity}
              onClick={() => toggleFilter('capacities', capacity)}
              className={`px-3 py-1 text-sm rounded-full border transition-all ${
                filters.capacities.includes(capacity)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
              }`}
            >
              {capacity}
            </button>
          ))}
        </div>
      </div>

      {/* Stock */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => 
              setFilters(prev => ({ ...prev, inStockOnly: checked as boolean }))
            }
          />
          <span className="text-sm">En stock uniquement</span>
        </label>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <Header />

      <main className="pt-24 pb-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tous nos produits
            </h1>
            
            {/* Search & Filters Bar */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setFilters(prev => ({ ...prev, searchQuery: '' }));
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </div>
              </form>

              {/* Actions */}
              <div className="flex gap-3">
                {/* Mobile Filter */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden relative">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtres
                      {activeFiltersCount > 0 && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                          {activeFiltersCount}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filtres</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      {sortOptions.find(o => o.value === filters.sortBy)?.label}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {sortOptions.map(option => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setFilters(prev => ({ ...prev, sortBy: option.value as any }))}
                      >
                        {option.label}
                        {filters.sortBy === option.value && <Check className="w-4 h-4 ml-2" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* View Mode */}
                <div className="hidden sm:flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-sm text-gray-500">Filtres actifs:</span>
                {filters.brands.map(brand => (
                  <Badge key={brand} variant="secondary" className="cursor-pointer" onClick={() => toggleFilter('brands', brand)}>
                    {brand} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {filters.categories.map(cat => (
                  <Badge key={cat} variant="secondary" className="cursor-pointer" onClick={() => toggleFilter('categories', cat)}>
                    {cat} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {filters.condition.map(cond => (
                  <Badge key={cond} variant="secondary" className="cursor-pointer" onClick={() => toggleFilter('condition', cond)}>
                    {cond === 'new' ? 'Neuf' : 'Occasion'} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Tout effacer
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filtres</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Réinitialiser
                    </button>
                  )}
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-500">
                  {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>

              <AnimatePresence mode="wait">
                {filteredProducts.length > 0 ? (
                  <motion.div
                    key="products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`grid gap-6 ${
                      viewMode === 'grid'
                        ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                        : 'grid-cols-1'
                    }`}
                  >
                    {filteredProducts.map((product, index) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        index={index}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Aucun produit trouvé
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Essayez de modifier vos filtres ou votre recherche
                    </p>
                    <Button onClick={clearFilters}>
                      Réinitialiser les filtres
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
