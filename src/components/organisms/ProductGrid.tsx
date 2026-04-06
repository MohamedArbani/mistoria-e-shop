import { useMemo } from 'react';
import { useQueryStates, parseAsString, parseAsStringLiteral } from 'nuqs';
import { ProductCard } from '@/components/molecules/ProductCard';
import { SearchBar } from '@/components/molecules/SearchBar';
import { CATEGORIES, type Product, type ProductCategory } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  showFilters?: boolean;
}

const categoryValues = ['all', ...CATEGORIES.map(c => c.value)] as const;

export function ProductGrid({ products, showFilters = true }: ProductGridProps) {
  const [{ search, category }, setFilters] = useQueryStates({
    search: parseAsString.withDefault(''),
    category: parseAsStringLiteral(categoryValues).withDefault('all'),
  });

  const setSearch = (value: string) => setFilters({ search: value || null });
  const setActiveCategory = (value: typeof categoryValues[number]) =>
    setFilters({ category: value === 'all' ? null : value });

  const filtered = useMemo(() => {
    let result = products;
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.includes(q)
      );
    }
    return result;
  }, [products, category, search]);

  return (
    <div className="space-y-8">
      {showFilters && (
        <div className="space-y-4">
          <SearchBar value={search} onChange={setSearch} />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-body transition-all border',
                category === 'all'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-muted-foreground border-border hover:border-primary/50'
              )}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-body transition-all border',
                  category === cat.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/50'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground font-body">
          No fragrances found. Try adjusting your search or filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
