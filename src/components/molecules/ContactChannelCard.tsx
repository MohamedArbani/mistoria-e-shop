import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactChannelCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  value: string;
  actionLabel: string;
  onAction: () => void;
  iconBgClassName?: string;
  iconClassName?: string;
  actionClassName?: string;
  disabled?: boolean;
  delay?: number;
}

export function ContactChannelCard({
  icon: Icon,
  title,
  description,
  value,
  actionLabel,
  onAction,
  iconBgClassName = 'bg-primary/10',
  iconClassName = 'text-primary',
  actionClassName,
  disabled = false,
  delay = 0,
}: ContactChannelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="group relative flex flex-col items-center text-center gap-4 rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/40 hover:gold-glow overflow-hidden"
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-primary/5 transition-all duration-300 group-hover:bg-primary/10" />

      <div className={`relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full ${iconBgClassName} transition-transform duration-300 group-hover:scale-110`}>
        <Icon className={`h-7 w-7 ${iconClassName}`} />
      </div>

      <div className="relative z-10 space-y-1">
        <h3 className="font-heading text-xl font-semibold">{title}</h3>
        <p className="text-xs text-muted-foreground font-body">{description}</p>
      </div>

      <p className="relative z-10 text-sm font-body font-medium text-foreground/80 min-h-[1.25rem]">
        {value || 'Not configured'}
      </p>

      <Button
        onClick={onAction}
        disabled={disabled}
        className={`relative z-10 w-full font-body uppercase tracking-wider text-xs ${actionClassName}`}
      >
        {actionLabel}
      </Button>
    </motion.div>
  );
}
