import { Badge } from '@/components/ui/badge';
import type { ProductCategory } from '@/types/product';

const categoryColors: Record<ProductCategory, string> = {
  floral: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  woody: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  oriental: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  fresh: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  unisex: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
  sweet: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
};

export function CategoryBadge({ category }: { category: ProductCategory }) {
  return (
    <Badge className={`${categoryColors[category]} border-0 font-body text-xs uppercase tracking-wider`}>
      {category}
    </Badge>
  );
}
