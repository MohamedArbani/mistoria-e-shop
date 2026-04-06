import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { ContactFormSection } from '@/components/organisms/ContactFormSection';

export default function Contact() {
  const { data: settings } = useSettings();
  const whatsapp = settings?.whatsapp_number || '';
  const email = settings?.email || '';

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative py-24 section-alt border-b border-border overflow-hidden">
        {/* Decorative radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-primary/6 blur-3xl" />
        </div>

        <div className="container relative text-center space-y-5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-body">Get in Touch</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            Contact <span className="italic text-primary">Us</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground max-w-md mx-auto font-body leading-relaxed"
          >
            Have questions about our fragrances or need help with an order?<br className="hidden sm:block" />
            We're here for you — always.
          </motion.p>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
            className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent origin-center"
          />
        </div>
      </section>

      {/* ── Form + Channels ──────────────────────────────── */}
      <ContactFormSection whatsapp={whatsapp} email={email} />
    </div>
  );
}
