import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-perfume.jpg';

export function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <img
        src={heroImage}
        alt="Luxury perfume collection by MISTORIA"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 flex h-full items-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl space-y-6"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm uppercase tracking-[0.3em] text-amber-300 font-body"
            >
              The Art of Fragrance
            </motion.p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-tight">
              Discover Your <br />
              <span className="italic text-amber-300">Signature</span> Scent
            </h1>
            <p className="text-lg text-white/80 font-body font-light max-w-lg">
              Each MISTORIA fragrance is a journey — meticulously crafted to evoke emotion, 
              memory, and the extraordinary.
            </p>
            <div className="flex gap-4 pt-2">
              <Link to="/collections">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body uppercase tracking-wider">
                  Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white/40 text-black dark:text-white hover:bg-white/10 font-body uppercase tracking-wider">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
