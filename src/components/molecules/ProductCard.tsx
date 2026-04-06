import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types/product';
import { CategoryBadge } from '@/components/atoms/CategoryBadge';
import { VolumeBonusBadge } from '@/components/atoms/VolumeBonusBadge';
import { OutOfStockBadge } from '@/components/atoms/OutOfStockBadge';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const volumes = Object.entries(product.volumes);
  const firstVolume = volumes[0];
  const displayPrice = firstVolume ? firstVolume[1] : product.price;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.available) return;
    if (firstVolume) {
      addItem(product, firstVolume[0], firstVolume[1]);
    } else {
      addItem(product, 'default', product.price);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className={cn(
          'relative aspect-[3/4] overflow-hidden rounded-lg bg-muted',
          !product.available && 'opacity-70',
        )}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className={cn(
                'h-full w-full object-cover transition-transform duration-700 group-hover:scale-105',
                !product.available && 'grayscale',
              )}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground font-heading text-lg">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10" />

          {/* Out of stock overlay */}
          {!product.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[2px]">
              <OutOfStockBadge className="text-sm px-4 py-2" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute left-3 top-3 flex gap-1">
            {product.new && (
              <Badge className="bg-primary text-primary-foreground border-0 text-xs">NEW</Badge>
            )}
            {product.bestseller && (
              <Badge className="bg-secondary text-secondary-foreground border-0 text-xs">BESTSELLER</Badge>
            )}
          </div>

          {/* Quick add — hidden when out of stock */}
          {product.available && (
            <button
              onClick={handleQuickAdd}
              className="absolute bottom-3 right-3 rounded-full bg-background/90 p-2.5 text-foreground opacity-0 shadow-lg backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground"
              aria-label="Quick add to cart"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-3 space-y-1">
          <CategoryBadge category={product.category} />
          <h3 className="font-heading text-lg font-medium text-foreground">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
          <p className="font-heading text-lg font-semibold text-primary">
            {formatPrice(displayPrice)}
            {volumes.length > 1 && <span className="text-xs text-muted-foreground font-body ml-1">from</span>}
          </p>
          {product.volumeBonus && (
            <VolumeBonusBadge volumeBonus={product.volumeBonus} />
          )}
        </div>
      </Link>
    </motion.div>
  );
}
