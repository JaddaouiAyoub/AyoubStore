import type { Product, Pack, FilterState } from '@/types';

export const filterProducts = (products: Product[], filters: FilterState): Product[] => {
  return products.filter(product => {
    // Filtre par marque
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }

    // Filtre par catégorie
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }

    // Filtre par prix
    const minPrice = Math.min(...product.variants.map(v => v.price));
    const maxPrice = Math.max(...product.variants.map(v => v.price));
    if (minPrice > filters.priceRange[1] || maxPrice < filters.priceRange[0]) {
      return false;
    }

    // Filtre par condition (neuf/occasion)
    if (filters.condition.length > 0) {
      const condition = product.isUsed ? 'used' : 'new';
      if (!filters.condition.includes(condition)) {
        return false;
      }
    }

    // Filtre par couleur
    if (filters.colors.length > 0) {
      const hasColor = product.variants.some(v => 
        filters.colors.some(color => v.color.toLowerCase().includes(color.toLowerCase()))
      );
      if (!hasColor) return false;
    }

    // Filtre par capacité
    if (filters.capacities.length > 0) {
      const hasCapacity = product.variants.some(v => 
        v.capacity && filters.capacities.includes(v.capacity)
      );
      if (!hasCapacity) return false;
    }

    // Filtre stock
    if (filters.inStockOnly) {
      const hasStock = product.variants.some(v => v.stock > 0);
      if (!hasStock) return false;
    }

    // Filtre recherche
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    return true;
  });
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.basePrice - b.basePrice);
    case 'price-desc':
      return sorted.sort((a, b) => b.basePrice - a.basePrice);
    case 'popularity':
      return sorted.sort((a, b) => b.popularity - a.popularity);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    default:
      return sorted;
  }
};

export const searchProducts = (products: Product[], query: string): Product[] => {
  if (!query.trim()) return products;
  
  const lowerQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery)
  );
};

export const getProductById = (products: Product[], id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getPackById = (packs: Pack[], id: string): Pack | undefined => {
  return packs.find(p => p.id === id);
};

export const getRelatedProducts = (products: Product[], currentProduct: Product, limit = 4): Product[] => {
  return products
    .filter(p => 
      p.id !== currentProduct.id && 
      (p.category === currentProduct.category || p.brand === currentProduct.brand)
    )
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};
