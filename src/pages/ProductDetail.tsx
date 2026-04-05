import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProduct } from '@/hooks/useProducts';
import { VolumeSelector } from '@/components/atoms/VolumeSelector';
import { CategoryBadge } from '@/components/atoms/CategoryBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id || '');
  const { addItem } = useCart();

  const [selectedVolume, setSelectedVolume] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(0);

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square rounded-lg bg-muted" />
          <div className="space-y-4">
            <div className="h-8 w-48 rounded bg-muted" />
            <div className="h-6 w-32 rounded bg-muted" />
            <div className="h-20 w-full rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-heading text-2xl">Product not found</h1>
        <Link to="/collections" className="text-primary mt-4 inline-block">Back to Collections</Link>
      </div>
    );
  }

  const volumes = product.volumes;
  const volumeEntries = Object.entries(volumes);
  const currentVolume = selectedVolume || volumeEntries[0]?.[0] || 'default';
  const currentPrice = selectedPrice || volumeEntries[0]?.[1] || product.price;

  const handleAddToCart = () => {
    addItem(product, currentVolume, currentPrice);
  };

  return (
    <div className="container py-12">
      <Link to="/collections" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 font-body">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Collections
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="aspect-square overflow-hidden rounded-lg bg-muted"
        >
          {product.image ? (
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground font-heading text-xl">
              No Image
            </div>
          )}
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CategoryBadge category={product.category} />
              {product.new && <Badge className="bg-primary text-primary-foreground border-0 text-xs">NEW</Badge>}
              {product.bestseller && <Badge className="bg-accent text-accent-foreground border-0 text-xs">BESTSELLER</Badge>}
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold">{product.name}</h1>
            <p className="font-heading text-2xl font-semibold text-primary">${currentPrice.toFixed(2)}</p>
          </div>

          <p className="text-muted-foreground font-body leading-relaxed">{product.longDescription || product.description}</p>

          {/* Volume selector */}
          {volumeEntries.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-body font-semibold uppercase tracking-wider">Size</label>
              <VolumeSelector
                volumes={volumes}
                selectedVolume={currentVolume}
                onSelect={(v, p) => { setSelectedVolume(v); setSelectedPrice(p); }}
              />
            </div>
          )}

          <Button onClick={handleAddToCart} size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body">
            <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
          </Button>

          {/* Notes */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-body mb-2">Top Notes</h4>
              <div className="space-y-1">
                {product.notes.top.map(n => <p key={n} className="text-sm">{n}</p>)}
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-body mb-2">Heart Notes</h4>
              <div className="space-y-1">
                {product.notes.middle.map(n => <p key={n} className="text-sm">{n}</p>)}
              </div>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-body mb-2">Base Notes</h4>
              <div className="space-y-1">
                {product.notes.base.map(n => <p key={n} className="text-sm">{n}</p>)}
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border text-sm">
            <div>
              <span className="text-muted-foreground font-body">Longevity:</span>
              <span className="ml-2 font-semibold">{product.longevity}</span>
            </div>
            <div>
              <span className="text-muted-foreground font-body">Projection:</span>
              <span className="ml-2 font-semibold">{product.projection}</span>
            </div>
          </div>

          {product.occasions.length > 0 && (
            <div className="pt-4 border-t border-border">
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-body mb-2">Best For</h4>
              <div className="flex flex-wrap gap-2">
                {product.occasions.map(o => (
                  <Badge key={o} variant="outline" className="font-body">{o}</Badge>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
