import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-perfume.jpg';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury perfume collection by MISTORIA"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm uppercase tracking-[0.3em] text-amber-300/90 font-body"
            >
              The Art of Fragrance
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]"
            >
              Sculpting Dreams<br />
              <span className="italic text-amber-300">in a Bottle</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-white/70 font-body font-light max-w-lg leading-relaxed"
            >
              Each MISTORIA fragrance is a masterpiece — meticulously crafted to evoke emotion,
              memory, and the extraordinary in every drop.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/collections">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body uppercase tracking-wider px-8">
                  View All Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white/40 text-black hover:bg-white/60 dark:text-white dark:hover:bg-white/10 font-body uppercase tracking-wider">
                  Our Story
                </Button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2 text-white/60">
                <ShieldCheck className="h-4 w-4 text-amber-300" />
                <span className="text-xs font-body">100% Authentic</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Award className="h-4 w-4 text-amber-300" />
                <span className="text-xs font-body">Premium Quality</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side floating stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hidden lg:flex flex-col items-end gap-4"
          >
            {[
              { value: '100K+', label: 'Trusted Clients' },
              { value: '80K+', label: 'Luxury Perfumes' },
              { value: '10Y+', label: 'Years of History' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.15 }}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl px-6 py-4 text-right"
              >
                <p className="font-heading text-2xl font-bold text-amber-300">{stat.value}</p>
                <p className="text-xs text-white/60 font-body">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
}
