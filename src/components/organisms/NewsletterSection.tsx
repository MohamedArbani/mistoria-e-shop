import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-body">Stay Connected</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Subscribe For Latest Updates
          </h2>
          <p className="text-muted-foreground font-body">
            Be the first to know about new collections, exclusive offers, and the art of perfumery.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-card border-border font-body"
              required
            />
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body shrink-0">
              <Send className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
