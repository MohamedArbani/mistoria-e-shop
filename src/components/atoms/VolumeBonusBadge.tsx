import { Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VolumeBonus } from '@/types/product';

interface VolumeBonusBadgeProps {
  volumeBonus: VolumeBonus;
  /** When the user has already selected a qualifying volume, show an activated state */
  active?: boolean;
  className?: string;
}

export function VolumeBonusBadge({ volumeBonus, active = false, className }: VolumeBonusBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-body font-semibold transition-colors',
        active
          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-950/40 dark:text-emerald-300'
          : 'border-amber-400 bg-amber-50 text-amber-700 dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-300',
        className,
      )}
    >
      <Gift className="size-3 flex-shrink-0" />
      <span>
        {active
          ? `+${volumeBonus.bonus}ml free included!`
          : `+${volumeBonus.bonus}ml free on ${volumeBonus.threshold}ml+`}
      </span>
    </div>
  );
}
