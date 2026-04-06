import { Link } from 'react-router-dom';
import { SvgLogo } from './SvgLogo';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <SvgLogo />
      <span className="font-heading text-2xl font-bold tracking-[0.2em] text-foreground">MISTORIA</span>
    </Link>
  );
}
