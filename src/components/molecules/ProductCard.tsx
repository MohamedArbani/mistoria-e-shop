import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/types/product';
import { CategoryBadge } from '@/components/atoms/CategoryBadge';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

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
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground font-heading text-lg">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10" />
          
          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {product.new && (
              <Badge className="bg-primary text-primary-foreground border-0 text-xs">NEW</Badge>
            )}
            {product.bestseller && (
              <Badge className="bg-accent text-accent-foreground border-0 text-xs">BESTSELLER</Badge>
            )}
          </div>

          {/* Quick add */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 right-3 rounded-full bg-background/90 p-2.5 text-foreground opacity-0 shadow-lg backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground"
            aria-label="Quick add to cart"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 space-y-1">
          <CategoryBadge category={product.category} />
          <h3 className="font-heading text-lg font-medium text-foreground">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
          <p className="font-heading text-lg font-semibold text-primary">
            ${displayPrice.toFixed(2)}
            {volumes.length > 1 && <span className="text-xs text-muted-foreground font-body ml-1">from</span>}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
