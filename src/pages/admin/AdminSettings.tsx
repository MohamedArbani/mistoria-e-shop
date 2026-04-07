import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { useSettings, useUpdateSetting } from '@/hooks/useSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function AdminSettings() {
  const { data: settings, isLoading } = useSettings();
  const updateSetting = useUpdateSetting();

  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [storeName, setStoreName] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [hoursWeekdays, setHoursWeekdays] = useState('');
  const [hoursWeekend, setHoursWeekend] = useState('');

  useEffect(() => {
    if (settings) {
      setWhatsapp(settings.whatsapp_number || '');
      setEmail(settings.email || '');
      setStoreName(settings.store_name || '');
      setAboutText(settings.about_text || '');
      setHoursWeekdays(settings.hours_weekdays || '');
      setHoursWeekend(settings.hours_weekend || '');
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      await Promise.all([
        updateSetting.mutateAsync({ key: 'whatsapp_number', value: whatsapp }),
        updateSetting.mutateAsync({ key: 'email', value: email }),
        updateSetting.mutateAsync({ key: 'store_name', value: storeName }),
        updateSetting.mutateAsync({ key: 'about_text', value: aboutText }),
        updateSetting.mutateAsync({ key: 'hours_weekdays', value: hoursWeekdays }),
        updateSetting.mutateAsync({ key: 'hours_weekend', value: hoursWeekend }),
      ]);
      toast.success('Settings saved!');
    } catch (err) {
      toast.error(err.message ?? 'Failed to save settings');
    }
  };

  if (isLoading) return <div className="animate-pulse text-muted-foreground">Loading settings...</div>;

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="font-heading text-2xl font-bold">Store Settings</h1>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>WhatsApp Number</Label>
          <Input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="+1234567890" />
          <p className="text-xs text-muted-foreground">Include country code. This is where checkout orders are sent.</p>
        </div>

        <div className="space-y-2">
          <Label>Contact Email</Label>
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="contact@mistoria.com" />
        </div>

        <div className="space-y-2">
          <Label>Store Name</Label>
          <Input value={storeName} onChange={e => setStoreName(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>About Text</Label>
          <Textarea value={aboutText} onChange={e => setAboutText(e.target.value)} rows={4} />
        </div>

        <div className="space-y-2">
          <Label>Business Hours — Mon to Sat</Label>
          <Input
            value={hoursWeekdays}
            onChange={e => setHoursWeekdays(e.target.value)}
            placeholder="9 AM – 9 PM"
          />
        </div>

        <div className="space-y-2">
          <Label>Business Hours — Sunday</Label>
          <Input
            value={hoursWeekend}
            onChange={e => setHoursWeekend(e.target.value)}
            placeholder="10 AM – 6 PM"
          />
        </div>

        <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90 font-body" disabled={updateSetting.isPending}>
          <Save className="mr-2 h-4 w-4" /> Save Settings
        </Button>
      </div>
    </div>
  );
}
