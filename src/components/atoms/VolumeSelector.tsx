import { useState } from 'react';
import { cn } from '@/lib/utils';

interface VolumeSelectorProps {
  volumes: Record<string, number>;
  selectedVolume: string;
  onSelect: (volume: string, price: number) => void;
}

export function VolumeSelector({ volumes, selectedVolume, onSelect }: VolumeSelectorProps) {
  const entries = Object.entries(volumes);
  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {entries.map(([volume, price]) => (
        <button
          key={volume}
          onClick={() => onSelect(volume, price)}
          className={cn(
            'rounded-md border px-3 py-1.5 text-sm font-body transition-all',
            selectedVolume === volume
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background text-foreground hover:border-primary/50'
          )}
        >
          {volume}
        </button>
      ))}
    </div>
  );
}
