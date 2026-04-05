import { Link } from 'react-router-dom';
import { Logo } from '@/components/atoms/Logo';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              Crafting unforgettable scents since the beginning. Every bottle tells a story.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/collections" className="hover:text-primary transition-colors">Collections</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Floral</li>
              <li>Woody</li>
              <li>Oriental</li>
              <li>Fresh</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} MISTORIA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
