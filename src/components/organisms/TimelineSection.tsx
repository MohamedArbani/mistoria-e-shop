import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-perfume.jpg';

export function TimelineSection() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary font-body">Our Legacy</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
              Journey of <span className="italic text-primary">Elegance</span>
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed max-w-md">
              From the vibrant souks of the East to the ateliers of Europe, MISTORIA weaves 
              tradition and innovation into every bottle. Each fragrance is a chapter in our 
              ongoing story of excellence.
            </p>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
                <span className="ml-2 text-sm font-body text-foreground font-semibold">5.0</span>
              </div>
              <span className="text-sm text-muted-foreground font-body">10K+ bought last month</span>
            </div>

            <Link to="/about">
              <Button variant="outline" className="mt-4 border-primary/30 text-primary hover:bg-primary/10 font-body uppercase tracking-wider">
                View Full Details
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src={heroImage}
                alt="MISTORIA luxury perfume"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 gold-glow">
              <p className="font-heading text-2xl font-bold text-primary">10Y+</p>
              <p className="text-xs text-muted-foreground font-body">Years of Excellence</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
