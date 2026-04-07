import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { CartItem, Product } from '@/types/product';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, volume: string, price: number) => void;
  removeItem: (productId: string, volume: string) => void;
  updateQuantity: (productId: string, volume: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product, volume: string, price: number) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.volume === volume);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.volume === volume
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, volume, price, quantity: 1 }];
    });
    toast.success(`Added to cart — ${product.name} (${volume})`);
    setIsOpen(true);
  }, [toast]);

  const removeItem = useCallback((productId: string, volume: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.volume === volume)));
  }, []);

  const updateQuantity = useCallback((productId: string, volume: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, volume);
      return;
    }
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId && i.volume === volume ? { ...i, quantity } : i
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
