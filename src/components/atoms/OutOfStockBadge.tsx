import { PackageX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OutOfStockBadgeProps {
  className?: string;
}

export function OutOfStockBadge({ className }: OutOfStockBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center text-nowrap gap-1.5 rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1 text-xs font-body font-semibold text-destructive dark:border-destructive/60 dark:bg-destructive/20',
        className,
      )}
    >
      <PackageX className="size-3 flex-shrink-0" />
      Out of Stock
    </div>
  );
}
