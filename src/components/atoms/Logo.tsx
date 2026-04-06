import { Link } from 'react-router-dom';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
        <path d="M14 2C14 2 8 6 8 14C8 18 10 22 14 26C18 22 20 18 20 14C20 6 14 2 14 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M14 6C14 6 11 9 11 14C11 17 12 20 14 23C16 20 17 17 17 14C17 9 14 6 14 6Z" fill="currentColor" opacity="0.3"/>
        <circle cx="14" cy="14" r="2" fill="currentColor"/>
      </svg>
      <span className="font-heading text-2xl font-bold tracking-[0.2em] text-foreground">MISTORIA</span>
    </Link>
  );
}
