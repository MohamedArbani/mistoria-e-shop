import { motion } from 'framer-motion';
import { Gem, Palette, Crown, Sparkles, Clock, Award } from 'lucide-react';

const features = [
  { icon: Gem, title: 'Exclusivity Redefined', desc: 'Limited production runs ensure each fragrance remains rare and coveted.' },
  { icon: Palette, title: 'Artisanal Elegance', desc: 'Hand-blended by master perfumers using traditional techniques.' },
  { icon: Crown, title: 'Limited Edition Luxury', desc: 'Seasonal collections that capture fleeting moments of beauty.' },
  { icon: Sparkles, title: 'Rare & Exquisite', desc: 'Ingredients sourced from the most remote corners of the world.' },
  { icon: Clock, title: 'Time-Honored Craft', desc: 'Centuries-old methods meet contemporary innovation.' },
  { icon: Award, title: 'Award-Winning', desc: 'Recognized globally for exceptional quality and artistry.' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturesGrid() {
  return (
    <section className="py-24 section-alt">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
              Tradition Meets <br /><span className="italic text-primary">Innovation</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-body leading-relaxed max-w-md lg:ml-auto"
          >
            We honor the ancient art of perfumery while embracing modern science, 
            creating fragrances that are both timeless and contemporary.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group rounded-xl border border-border bg-card p-8 space-y-4 transition-all duration-300 hover:border-primary/40 hover:gold-glow"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
