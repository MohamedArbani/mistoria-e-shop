import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Browse our collections, select your preferred fragrance and size, add it to your cart, and proceed to checkout. Your order will be sent directly to us via WhatsApp for confirmation.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept various payment methods including bank transfer and cash on delivery. Payment details will be shared via WhatsApp after you place your order.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business day delivery. International shipping may take 7-14 business days.',
  },
  {
    q: 'Are your perfumes authentic?',
    a: 'Absolutely! Every fragrance sold at MISTORIA is 100% authentic. We source directly from authorized distributors and manufacturers.',
  },
  {
    q: 'Can I return or exchange a product?',
    a: 'We accept returns within 14 days of delivery for unopened products in their original packaging. Please contact us via WhatsApp or email for return instructions.',
  },
  {
    q: 'How should I store my perfume?',
    a: 'Store your fragrance in a cool, dry place away from direct sunlight and extreme temperatures. Keep the bottle upright and tightly closed when not in use.',
  },
  {
    q: 'What is the difference between eau de parfum and eau de toilette?',
    a: 'Eau de Parfum (EDP) contains 15-20% fragrance concentration, lasting 6-8 hours. Eau de Toilette (EDT) has 5-15% concentration and typically lasts 3-4 hours.',
  },
  {
    q: 'Do you offer gift wrapping?',
    a: 'Yes! We offer complimentary gift wrapping for all orders. Simply mention your preference in the WhatsApp order message.',
  },
];

export default function FAQ() {
  return (
    <div className="py-12">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-body">Support</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Find answers to the most common questions about our products and services.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="font-heading text-left text-base font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}
