import { useProducts } from '@/hooks/useProducts';
import { ProductGrid } from '@/components/organisms/ProductGrid';

export default function Collections() {
  const { data: products = [], isLoading } = useProducts();

  return (
    <div className="py-12">
      <div className="container">
        <div className="mb-10 space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-body">Collections</p>
          <h1 className="font-heading text-4xl font-bold">Our Fragrances</h1>
          <p className="text-muted-foreground max-w-lg">
            Explore our curated collection of luxury perfumes, each one a masterpiece.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3 animate-pulse">
                <div className="aspect-[3/4] rounded-lg bg-muted" />
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
  );
}
