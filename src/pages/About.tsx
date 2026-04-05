import { motion } from 'framer-motion';
import aboutImage from '@/assets/about-store.jpg';

export default function About() {
  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-body">Our Story</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold">About MISTORIA</h1>
          </div>

          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={aboutImage}
              alt="MISTORIA luxury perfume store interior"
              loading="lazy"
              width={1280}
              height={720}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-muted-foreground font-body leading-relaxed text-lg">
              MISTORIA was born from a passion for the extraordinary. We believe that fragrance 
              is more than a scent — it's a story, an emotion, a memory waiting to be created.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              Every bottle in our collection is the result of meticulous craftsmanship. We source 
              the finest raw materials from around the world — from the delicate roses of Grasse 
              to the rich oud of the Middle East — and blend them into compositions that transcend 
              the ordinary.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              Our master perfumers bring decades of expertise to each creation, ensuring that 
              every MISTORIA fragrance tells a unique story. Whether you're drawn to the ethereal 
              lightness of our floral compositions or the deep complexity of our oriental blends, 
              you'll find a scent that speaks to your soul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border">
            {[
              { number: '50+', label: 'Unique Fragrances' },
              { number: '15+', label: 'Years of Expertise' },
              { number: '10K+', label: 'Happy Customers' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl font-bold text-primary">{stat.number}</p>
                <p className="text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
