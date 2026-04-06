import { Link } from 'react-router-dom';
import { Logo } from '@/components/atoms/Logo';

const categories = [
  { name: 'Floral', value: 'floral' },
  { name: 'Woody', value: 'woody' },
  { name: 'Oriental', value: 'oriental' },
  { name: 'Fresh', value: 'fresh' },
  { name: 'Unisex', value: 'unisex' },
  { name: 'Sweet', value: 'sweet' },
];

const socials = [
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Pinterest', href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs font-body leading-relaxed">
              Crafting unforgettable scents since the beginning. Every bottle tells a story of elegance and passion.
            </p>
            <div className="flex gap-4 pt-2">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors font-body uppercase tracking-wider"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-3 text-sm text-muted-foreground font-body">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/collections" className="hover:text-primary transition-colors">Collections</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground font-body">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-3 text-sm text-muted-foreground font-body">
              {categories.map(cat => (
                <li key={cat.value}>
                  <Link to={`/collections?category=${cat.value}`} className="hover:text-primary transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()} MISTORIA. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground font-body">
            <Link to="/about" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
