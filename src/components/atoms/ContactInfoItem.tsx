import { type LucideIcon } from 'lucide-react';

interface ContactInfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  iconBgClassName?: string;
  iconClassName?: string;
}

export function ContactInfoItem({
  icon: Icon,
  label,
  value,
  iconBgClassName = 'bg-primary/10',
  iconClassName = 'text-primary',
}: ContactInfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBgClassName}`}>
        <Icon className={`h-4 w-4 ${iconClassName}`} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-body">{label}</p>
        <p className="font-body text-sm font-medium mt-0.5">{value || '—'}</p>
      </div>
    </div>
  );
}
