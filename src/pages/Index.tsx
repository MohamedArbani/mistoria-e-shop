import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Heart } from 'lucide-react';
import { HeroSection } from '@/components/organisms/HeroSection';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Sparkles, title: 'Premium Ingredients', desc: 'Sourced from the finest regions worldwide' },
  { icon: Shield, title: '100% Authentic', desc: 'Every fragrance guaranteed genuine' },
  { icon: Heart, title: 'Crafted with Love', desc: 'Each scent tells a unique story' },
];

export default function Index() {
  const { data: products = [] } = useProducts();
  const featured = products.filter(p => p.bestseller || p.new).slice(0, 4);

  return (
    <div>
      <HeroSection />

      {/* Features */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center space-y-3"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-primary font-body mb-2">Featured</p>
                <h2 className="font-heading text-3xl font-bold">Our Finest Selection</h2>
              </div>
              <Link to="/collections">
                <Button variant="ghost" className="text-primary hover:text-primary/80 font-body">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <ProductGrid products={featured} showFilters={false} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="container text-center max-w-2xl mx-auto space-y-6">
          <h2 className="font-heading text-4xl font-bold">Find Your Perfect Fragrance</h2>
          <p className="text-muted-foreground font-body">
            Browse our complete collection and discover scents that speak to your soul.
          </p>
          <Link to="/collections">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body uppercase tracking-wider">
              Explore Collections
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
