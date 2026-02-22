// Formatteur de prix en MAD (Dinar Algérien)
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Formatteur de prix compact
export const formatPriceCompact = (price: number): string => {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M MAD`;
  }
  if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}K MAD`;
  }
  return `${price} MAD`;
};

// Formatteur de date
export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(dateString));
};

// Formatteur de date relative
export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Aujourd\'hui';
  if (diffInDays === 1) return 'Hier';
  if (diffInDays < 7) return `Il y a ${diffInDays} jours`;
  if (diffInDays < 30) return `Il y a ${Math.floor(diffInDays / 7)} semaines`;
  
  return formatDate(dateString);
};

// Tronquer du texte
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Générer un slug
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// Calculer la remise
export const calculateDiscount = (originalPrice: number, discountPercentage: number): number => {
  return Math.round(originalPrice * (1 - discountPercentage / 100));
};

// Générer un ID unique
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
