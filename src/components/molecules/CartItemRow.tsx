import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types/product';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export function CartItemRow({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-3 py-3 border-b border-border">
      <div className="h-20 w-16 rounded-md bg-muted overflow-hidden flex-shrink-0">
        {item.product.image ? (
          <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
            No img
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-heading text-sm font-medium truncate">{item.product.name}</h4>
        <p className="text-xs text-muted-foreground">{item.volume}</p>
        <p className="text-sm font-semibold text-primary">${item.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => updateQuantity(item.product.id, item.volume, item.quantity - 1)}
            className="h-6 w-6 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="text-sm w-6 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.product.id, item.volume, item.quantity + 1)}
            className="h-6 w-6 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Plus className="h-3 w-3" />
          </button>
          <button
            onClick={() => removeItem(item.product.id, item.volume)}
            className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
