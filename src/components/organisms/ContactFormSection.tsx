import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Send, CheckCircle2, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface ContactFormSectionProps {
  whatsapp: string;
  email: string;
  hoursWeekdays?: string;
  hoursWeekend?: string;
}

interface FormState {
  name: string;
  senderEmail: string;
  subject: string;
  message: string;
}

const initialForm: FormState = {
  name: '',
  senderEmail: '',
  subject: '',
  message: '',
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

export function ContactFormSection({ whatsapp, email, hoursWeekdays, hoursWeekend }: ContactFormSectionProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Build mailto: URL so the message reaches the store email inbox directly
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.senderEmail}`,
      '',
      form.message,
    ].join('\n');

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');

    // Slight delay for polish
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success('Message ready to send — your email client has been opened!');
    }, 600);
  };

  const handleReset = () => {
    setForm(initialForm);
    setSubmitted(false);
  };

  const openWhatsApp = () => {
    const num = whatsapp.replace(/[^0-9]/g, '');
    if (num) window.open(`https://wa.me/${num}`, '_blank');
  };

  const openEmail = () => {
    if (email) window.open(`mailto:${email}`, '_blank');
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 pointer-events-none" />

      <div className="container max-w-6xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-stretch">

          {/* ── LEFT: Message Form ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="rounded-2xl border border-border bg-card p-8 md:p-10 shadow-sm"
          >
            <div className="mb-8 space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-body">Send a Message</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold">We'd Love to Hear From You</h2>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                Fill in the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center gap-5 py-14 text-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold">Message Ready!</h3>
                  <p className="text-sm text-muted-foreground font-body max-w-sm">
                    Your email client has been opened with the message pre-filled. Just hit send!
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="font-body border-primary/30 hover:bg-primary/10 text-xs uppercase tracking-wider"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <motion.div variants={fieldVariants} className="space-y-1.5">
                    <label className="text-xs font-body uppercase tracking-wider text-muted-foreground">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <Input
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={set('name')}
                      className="bg-background border-border font-body"
                    />
                  </motion.div>
                  <motion.div variants={fieldVariants} className="space-y-1.5">
                    <label className="text-xs font-body uppercase tracking-wider text-muted-foreground">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="you@example.com"
                      value={form.senderEmail}
                      onChange={set('senderEmail')}
                      className="bg-background border-border font-body"
                    />
                  </motion.div>
                </div>

                <motion.div variants={fieldVariants} className="space-y-1.5">
                  <label className="text-xs font-body uppercase tracking-wider text-muted-foreground">
                    Subject <span className="text-primary">*</span>
                  </label>
                  <Input
                    required
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={set('subject')}
                    className="bg-background border-border font-body"
                  />
                </motion.div>

                <motion.div variants={fieldVariants} className="space-y-1.5">
                  <label className="text-xs font-body uppercase tracking-wider text-muted-foreground">
                    Message <span className="text-primary">*</span>
                  </label>
                  <Textarea
                    required
                    rows={6}
                    placeholder="Tell us about your enquiry, order, or feedback..."
                    value={form.message}
                    onChange={set('message')}
                    className="bg-background border-border font-body resize-none"
                  />
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body uppercase tracking-wider"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                        Preparing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>

          {/* ── RIGHT: Sidebar ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="rounded-2xl border border-border bg-card p-8 flex flex-col gap-6"
          >
            {/* Header */}
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-body">Direct Channels</p>
              <h2 className="font-heading text-2xl font-bold mt-1">Reach Us Instantly</h2>
            </div>

            {/* WhatsApp row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="group flex items-center gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/10"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 transition-transform duration-300 group-hover:scale-110">
                <MessageCircle className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading text-sm font-semibold">WhatsApp</p>
                <p className="text-xs text-muted-foreground font-body truncate mt-0.5">{whatsapp || 'Not configured'}</p>
              </div>
              <Button
                onClick={openWhatsApp}
                disabled={!whatsapp}
                size="sm"
                className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-body text-xs uppercase tracking-wide"
              >
                Chat
              </Button>
            </motion.div>

            {/* Email row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.45 }}
              className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading text-sm font-semibold">Email</p>
                <p className="text-xs text-muted-foreground font-body truncate mt-0.5">{email || 'Not configured'}</p>
              </div>
              <Button
                onClick={openEmail}
                disabled={!email}
                size="sm"
                variant="outline"
                className="shrink-0 font-body text-xs uppercase tracking-wide border-primary/30 hover:bg-primary/10"
              >
                Send
              </Button>
            </motion.div>

            <div className="h-px bg-border" />

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.26, duration: 0.45 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-heading text-sm font-semibold mb-2.5">Business Hours</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-body">Mon – Sat</span>
                    <span className="text-xs font-body font-medium">{hoursWeekdays || '9 AM – 9 PM'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-body">Sunday</span>
                    <span className="text-xs font-body font-medium">{hoursWeekend || '10 AM – 6 PM'}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Response-time badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-3 rounded-xl bg-primary/5 border border-primary/10 p-4"
            >
              <Zap className="h-4 w-4 text-primary shrink-0" />
              <p className="text-xs text-muted-foreground font-body">
                Average response time:{' '}
                <span className="text-primary font-medium">under 2 hours</span>
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
