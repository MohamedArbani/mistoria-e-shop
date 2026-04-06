import { motion } from 'framer-motion';
import { useProducts } from '@/hooks/useProducts';
import { ProductGrid } from '@/components/organisms/ProductGrid';

export default function Collections() {
  const { data: products = [], isLoading } = useProducts();

  return (
    <div>
      {/* Hero banner */}
      <section className="py-20 section-alt border-b border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-body">Collections</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold">Our Fragrances</h1>
            <p className="text-muted-foreground max-w-lg mx-auto font-body">
              Explore our curated collection of luxury perfumes, each one a masterpiece.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="py-12">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3 animate-pulse">
                  <div className="aspect-[3/4] rounded-xl bg-muted" />
                  <div className="h-4 w-20 rounded bg-muted" />
                  <div className="h-5 w-40 rounded bg-muted" />
                  <div className="h-4 w-24 rounded bg-muted" />
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
}
