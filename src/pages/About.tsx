import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import aboutImage from '@/assets/about-store.jpg';

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const numMatch = value.match(/(\d+)/);
  const num = numMatch ? parseInt(numMatch[1]) : 0;
  const suffix = value.replace(/\d+/, '');
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, num]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-4xl font-bold text-primary">{count}{suffix}</p>
      <p className="text-sm text-muted-foreground font-body mt-2">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 section-alt border-b border-border">
        <div className="container text-center space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm uppercase tracking-[0.3em] text-primary font-body"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-bold"
          >
            About MISTORIA
          </motion.h1>
        </div>
      </section>

      <div className="container max-w-5xl py-16">
        {/* Image with parallax feel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="aspect-[21/9] overflow-hidden rounded-2xl mb-16"
        >
          <img
            src={aboutImage}
            alt="MISTORIA luxury perfume store interior"
            loading="lazy"
            width={1280}
            height={720}
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Two-column editorial */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-heading text-3xl font-bold">
              A Passion for the <span className="italic text-primary">Extraordinary</span>
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed">
              MISTORIA was born from a passion for the extraordinary. We believe that fragrance
              is more than a scent — it's a story, an emotion, a memory waiting to be created.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-muted-foreground font-body leading-relaxed">
              Every bottle in our collection is the result of meticulous craftsmanship. We source
              the finest raw materials from around the world — from the delicate roses of Grasse
              to the rich oud of the Middle East — and blend them into compositions that transcend
              the ordinary.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              Our master perfumers bring decades of expertise to each creation, ensuring that
              every MISTORIA fragrance tells a unique story.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-b border-border"
        >
          <AnimatedStat value="50+" label="Unique Fragrances" />
          <AnimatedStat value="15+" label="Years of Expertise" />
          <AnimatedStat value="10K+" label="Happy Customers" />
        </motion.div>
      </div>
    </div>
  );
}
