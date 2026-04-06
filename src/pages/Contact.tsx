import { motion } from 'framer-motion';
import { MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/hooks/useSettings';

export default function Contact() {
  const { data: settings } = useSettings();
  const whatsapp = settings?.whatsapp_number || '';
  const email = settings?.email || '';

  const openWhatsApp = () => {
    const num = whatsapp.replace(/[^0-9]/g, '');
    if (num) window.open(`https://wa.me/${num}`, '_blank');
  };

  return (
    <div>
      <section className="py-20 section-alt border-b border-border">
        <div className="container text-center space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm uppercase tracking-[0.3em] text-primary font-body"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-bold"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-lg mx-auto font-body"
          >
            Have questions about our fragrances or need help with an order? We're here for you.
          </motion.p>
        </div>
      </section>

      <div className="container max-w-3xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-card p-8 text-center space-y-4 transition-all hover:border-primary/30 hover:gold-glow"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
              <MessageCircle className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="font-heading text-xl font-semibold">WhatsApp</h3>
            <p className="text-sm text-muted-foreground font-body">{whatsapp || 'Not configured'}</p>
            <Button onClick={openWhatsApp} className="bg-emerald-600 hover:bg-emerald-700 text-white font-body" disabled={!whatsapp}>
              Chat on WhatsApp
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-card p-8 text-center space-y-4 transition-all hover:border-primary/30 hover:gold-glow"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold">Email</h3>
            <p className="text-sm text-muted-foreground font-body">{email || 'Not configured'}</p>
            <a href={`mailto:${email}`} className="block">
              <Button variant="outline" className="font-body border-primary/30 hover:bg-primary/10" disabled={!email}>
                Send Email
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
