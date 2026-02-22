import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, CartState, Product, Pack } from '@/types';
import { allProducts, packs } from '@/data/products';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item: CartItem) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          i => i.productId === item.productId && 
               i.variantId === item.variantId && 
               i.isPack === item.isPack
        );

        if (existingItemIndex >= 0) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += item.quantity;
          set({ items: updatedItems });
        } else {
          set({ items: [...currentItems, item] });
        }
      },

      removeItem: (productId: string, variantId: string) => {
        set({
          items: get().items.filter(
            item => !(item.productId === productId && item.variantId === variantId)
          )
        });
      },

      updateQuantity: (productId: string, variantId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set({
          items: get().items.map(item =>
            item.productId === productId && item.variantId === variantId
              ? { ...item, quantity }
              : item
          )
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: (products: Product[] = allProducts, packList: Pack[] = packs) => {
        return get().items.reduce((total, item) => {
          if (item.isPack && item.packId) {
            const pack = packList.find(p => p.id === item.packId);
            if (pack) {
              const packTotal = pack.items.reduce((packSum, packItem) => {
                const product = products.find(p => p.id === packItem.productId);
                if (product) {
                  const variant = product.variants.find(v => v.id === packItem.variantId);
                  if (variant) {
                    return packSum + (variant.price * packItem.quantity);
                  }
                }
                return packSum;
              }, 0);
              const discountMultiplier = 1 - (pack.discountPercentage / 100);
              return total + (packTotal * discountMultiplier * item.quantity);
            }
          } else {
            const product = products.find(p => p.id === item.productId);
            if (product) {
              const variant = product.variants.find(v => v.id === item.variantId);
              if (variant) {
                return total + (variant.price * item.quantity);
              }
            }
          }
          return total;
        }, 0);
      }
    }),
    {
      name: 'ayoubstore-cart',
      version: 1
    }
  )
);

// Hook pour récupérer les détails du panier
export const useCartDetails = () => {
  const { items } = useCartStore();
  
  const cartDetails = items.map(item => {
    if (item.isPack && item.packId) {
      const pack = packs.find(p => p.id === item.packId);
      if (pack) {
        const originalPrice = pack.items.reduce((sum, packItem) => {
          const product = allProducts.find(p => p.id === packItem.productId);
          const variant = product?.variants.find(v => v.id === packItem.variantId);
          return sum + (variant?.price || 0) * packItem.quantity;
        }, 0);
        const discountedPrice = originalPrice * (1 - pack.discountPercentage / 100);
        return {
          ...item,
          name: pack.name,
          image: pack.image,
          price: discountedPrice,
          originalPrice,
          isPack: true
        };
      }
    }
    
    const product = allProducts.find(p => p.id === item.productId);
    const variant = product?.variants.find(v => v.id === item.variantId);
    
    return {
      ...item,
      name: product?.name || 'Produit inconnu',
      image: variant?.images[0] || '',
      color: variant?.color || '',
      capacity: variant?.capacity || '',
      price: variant?.price || 0,
      isPack: false
    };
  });

  const totalPrice = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return { cartDetails, totalPrice, totalItems };
};
