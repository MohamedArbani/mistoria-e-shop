import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HeroSection } from '@/components/organisms/HeroSection';
import { StatsCounter } from '@/components/organisms/StatsCounter';
import { TimelineSection } from '@/components/organisms/TimelineSection';
import { FeaturesGrid } from '@/components/organisms/FeaturesGrid';
import { ProductCarousel } from '@/components/organisms/ProductCarousel';
import { NewsletterSection } from '@/components/organisms/NewsletterSection';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';

export default function Index() {
  const { data: products = [] } = useProducts();
  const featured = products.filter(p => p.bestseller || p.new).slice(0, 4);
  const allProducts = products.slice(0, 8);

  return (
    <div>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Stats Counter */}
      <StatsCounter />

      {/* 3. Elevate Your Senses — Featured products */}
      {featured.length > 0 && (
        <section className="py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6 lg:sticky lg:top-24"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-primary font-body">Featured</p>
                <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
                  Elevate Your <span className="italic text-primary">Senses</span>
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Discover our finest selection of luxury fragrances, each crafted to perfection.
                </p>
                <Link to="/collections">
                  <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 font-body uppercase tracking-wider mt-4">
                    Explore More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>

              <div className="lg:col-span-2">
                <ProductGrid products={featured} showFilters={false} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Journey of Elegance */}
      <TimelineSection />

      {/* 5. Tradition Meets Innovation */}
      <FeaturesGrid />

      {/* 6. Limited Editions CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold">
              Limited Editions <span className="italic text-primary">Unveiled</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg">
              Exclusive fragrances created in limited quantities. Once they're gone, they're gone forever.
            </p>
            <Link to="/collections">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body uppercase tracking-wider px-10 mt-4">
                Discover the Collection
              </Button>
            </Link>
            <div className="w-24 h-px bg-primary/40 mx-auto mt-8" />
          </motion.div>
        </div>
      </section>

      {/* 7. Product Carousel */}
      <ProductCarousel products={allProducts} title="Our Collection" subtitle="Handpicked for You" />

      {/* 8. Newsletter */}
      <NewsletterSection />
    </div>
  );
}
