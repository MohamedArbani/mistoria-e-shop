import { X, MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useSettings } from '@/hooks/useSettings';
import { CartItemRow } from '@/components/molecules/CartItemRow';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/format';

export function CartDrawer() {
  const { items, totalPrice, totalItems, isOpen, setIsOpen, clearCart } = useCart();
  const { data: settings } = useSettings();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (items.length === 0) return;

    const whatsappNumber = settings?.whatsapp_number?.replace(/[^0-9]/g, '') || '';
    if (!whatsappNumber) {
      toast({ title: 'Error', description: 'Store WhatsApp number not configured.', variant: 'destructive' });
      return;
    }

    const lines = items.map(i => {
      const volumeMl = parseInt(i.volume);
      const bonus = i.product.volumeBonus;
      const bonusQualifies =
        bonus && !isNaN(volumeMl) && volumeMl >= bonus.threshold;
      const bonusNote = bonusQualifies ? ` _(+${bonus!.bonus}ml free bonus included)_` : '';
      return `• ${i.product.name} (${i.volume}) x${i.quantity} — ${formatPrice(i.price * i.quantity)}${bonusNote}`;
    });
    const message = encodeURIComponent(
      `*MISTORIA Order*\n\n${lines.join('\n')}\n\n*Total: ${formatPrice(totalPrice)}*\n\nPlease confirm my order!`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    clearCart();
    setIsOpen(false);
    toast({ title: 'Order sent!', description: 'Your order was sent via WhatsApp.' });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md bg-background">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">Your Cart ({totalItems})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground font-body">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-2">
              {items.map(item => (
                <CartItemRow key={`${item.product.id}-${item.volume}`} item={item} />
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-lg font-heading font-semibold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>
              <Button onClick={handleCheckout} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-body" size="lg">
                <MessageCircle className="mr-2 h-4 w-4" />
                Checkout via WhatsApp
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
