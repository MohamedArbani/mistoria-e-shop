export interface VolumeBonus {
  /** Minimum volume in ml to qualify for the bonus (e.g. 50 means "buy 50ml or more") */
  threshold: number;
  /** Extra ml the customer receives for free */
  bonus: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'floral' | 'woody' | 'oriental' | 'fresh' | 'unisex' | 'sweet';
  price: number;
  image: string;
  description: string;
  longDescription: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  longevity: string;
  projection: string;
  occasions: string[];
  volumes: Record<string, number>; // e.g. { "50ml": 49.99, "100ml": 79.99 }
  new?: boolean;
  bestseller?: boolean;
  volumeBonus?: VolumeBonus;
}

export type ProductCategory = Product['category'];

export const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'floral', label: 'Floral' },
  { value: 'woody', label: 'Woody' },
  { value: 'oriental', label: 'Oriental' },
  { value: 'fresh', label: 'Fresh' },
  { value: 'unisex', label: 'Unisex' },
  { value: 'sweet', label: 'Sweet' },
];

export interface CartItem {
  product: Product;
  volume: string;
  price: number;
  quantity: number;
}

// Map DB row to Product
export function mapDbProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category as Product['category'],
    price: Number(row.price),
    image: row.image || '',
    description: row.description || '',
    longDescription: row.long_description || '',
    notes: {
      top: row.notes_top || [],
      middle: row.notes_middle || [],
      base: row.notes_base || [],
    },
    longevity: row.longevity || '',
    projection: row.projection || '',
    occasions: row.occasions || [],
    volumes: (row.volumes as Record<string, number>) || {},
    new: row.is_new || false,
    bestseller: row.is_bestseller || false,
    volumeBonus: row.volume_bonus
      ? (row.volume_bonus as VolumeBonus)
      : undefined,
  };
}
