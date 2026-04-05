import { Link } from 'react-router-dom';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`font-heading text-2xl font-bold tracking-[0.2em] text-foreground ${className}`}>
      MISTORIA
    </Link>
  );
}
