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
    <div className="py-12">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-body">Get in Touch</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold">Contact Us</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Have questions about our fragrances or need help with an order? We're here for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WhatsApp */}
            <div className="rounded-lg border border-border bg-card p-8 text-center space-y-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <MessageCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold">WhatsApp</h3>
              <p className="text-sm text-muted-foreground">{whatsapp || 'Not configured'}</p>
              <Button onClick={openWhatsApp} className="bg-emerald-600 hover:bg-emerald-700 text-white font-body" disabled={!whatsapp}>
                Chat on WhatsApp
              </Button>
            </div>

            {/* Email */}
            <div className="rounded-lg border border-border bg-card p-8 text-center space-y-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold">Email</h3>
              <p className="text-sm text-muted-foreground">{email || 'Not configured'}</p>
              <a href={`mailto:${email}`} className='block'>
                <Button variant="outline" className="font-body" disabled={!email}>
                  Send Email
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
