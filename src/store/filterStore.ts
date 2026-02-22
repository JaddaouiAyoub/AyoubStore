import { create } from 'zustand';
import type { FilterState } from '@/types';

export const useFilterStore = create<FilterState>(() => ({
  brands: [],
  categories: [],
  priceRange: [0, 3000000],
  condition: [],
  colors: [],
  capacities: [],
  inStockOnly: false,
  searchQuery: '',
  sortBy: 'popularity'
}));

export const setFilters = (filters: Partial<FilterState>) => {
  useFilterStore.setState(state => ({ ...state, ...filters }));
};

export const resetFilters = () => {
  useFilterStore.setState({
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
};
