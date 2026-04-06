import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useProducts';
import { ProductsTable } from '@/components/organisms/ProductsTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { CATEGORIES, type Product, type ProductCategory, type VolumeBonus } from '@/types/product';
import { supabase } from '@/integrations/supabase/client';
import { formatPrice } from '@/lib/format';

const emptyProduct = (): Omit<Product, 'id'> => ({
  name: '', category: 'floral' as ProductCategory, price: 0, image: '', description: '', longDescription: '',
  notes: { top: [], middle: [], base: [] }, longevity: '', projection: '',
  occasions: [], volumes: {}, new: false, bestseller: false, volumeBonus: undefined, available: true,
});

export default function AdminProducts() {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Product, 'id'>>(emptyProduct());
  const [volumeInput, setVolumeInput] = useState('');
  const [volumePriceInput, setVolumePriceInput] = useState('');
  const [uploading, setUploading] = useState(false);

  const openCreate = useCallback(() => {
    setEditingId(null);
    setForm(emptyProduct());
    setDialogOpen(true);
  }, []);

  const openEdit = useCallback((p: Product) => {
    setEditingId(p.id);
    setForm({ ...p });
    setDialogOpen(true);
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('product-images').upload(path, file);
    if (error) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from('product-images').getPublicUrl(path);
    setForm(prev => ({ ...prev, image: data.publicUrl }));
    setUploading(false);
  };

  const addVolume = () => {
    if (!volumeInput.trim() || !volumePriceInput) return;
    setForm(prev => ({ ...prev, volumes: { ...prev.volumes, [volumeInput.trim()]: parseFloat(volumePriceInput) } }));
    setVolumeInput('');
    setVolumePriceInput('');
  };

  const removeVolume = (key: string) => {
    setForm(prev => {
      const v = { ...prev.volumes };
      delete v[key];
      return { ...prev, volumes: v };
    });
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast({ title: 'Name required', variant: 'destructive' });
      return;
    }
    try {
      if (editingId) {
        await updateProduct.mutateAsync({ ...form, id: editingId } as Product);
        toast({ title: 'Product updated' });
      } else {
        await createProduct.mutateAsync(form);
        toast({ title: 'Product created' });
      }
      setDialogOpen(false);
    } catch (err) {
      toast({ title: 'Error', description: (err as Error).message, variant: 'destructive' });
    }
  };

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast({ title: 'Product deleted' });
    } catch (err) {
      toast({ title: 'Error', description: (err as Error).message, variant: 'destructive' });
    }
  }, [deleteProduct, toast]);

  const handleToggleAvailability = useCallback(async (product: Product) => {
    try {
      await updateProduct.mutateAsync({ ...product, available: !product.available });
      toast({
        title: product.available ? 'Marked as out of stock' : 'Marked as available',
      });
    } catch (err) {
      toast({ title: 'Error', description: (err as Error).message, variant: 'destructive' });
    }
  }, [updateProduct, toast]);

  const updateNotes = (type: 'top' | 'middle' | 'base', value: string) => {
    setForm(prev => ({
      ...prev,
      notes: { ...prev.notes, [type]: value.split(',').map(s => s.trim()).filter(Boolean) },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Products</h1>
        <Button onClick={openCreate} className="bg-primary text-primary-foreground hover:bg-primary/90 font-body">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <ProductsTable
        onEdit={openEdit}
        onDelete={handleDelete}
        onToggleAvailability={handleToggleAvailability}
      />

      {/* Product Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background">
          <DialogHeader>
            <DialogTitle className="font-heading">{editingId ? 'Edit Product' : 'New Product'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={v => setForm(prev => ({ ...prev, category: v as ProductCategory }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Base Price</Label>
                <Input type="number" step="0.01" value={form.price} onChange={e => setForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))} />
              </div>
              <div className="space-y-2">
                <Label>Image</Label>
                <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                {form.image && <img src={form.image} alt="Preview" className="h-16 w-16 rounded object-cover" />}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Short Description</Label>
              <Input value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Long Description</Label>
              <Textarea value={form.longDescription} onChange={e => setForm(prev => ({ ...prev, longDescription: e.target.value }))} rows={3} />
            </div>

            {/* Notes */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Top Notes (comma-separated)</Label>
                <Input value={form.notes.top.join(', ')} onChange={e => updateNotes('top', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Heart Notes</Label>
                <Input value={form.notes.middle.join(', ')} onChange={e => updateNotes('middle', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Base Notes</Label>
                <Input value={form.notes.base.join(', ')} onChange={e => updateNotes('base', e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Longevity</Label>
                <Input value={form.longevity} onChange={e => setForm(prev => ({ ...prev, longevity: e.target.value }))} placeholder="e.g. 6-8 hours" />
              </div>
              <div className="space-y-2">
                <Label>Projection</Label>
                <Input value={form.projection} onChange={e => setForm(prev => ({ ...prev, projection: e.target.value }))} placeholder="e.g. Moderate" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Occasions (comma-separated)</Label>
              <Input
                value={form.occasions.join(', ')}
                onChange={e => setForm(prev => ({ ...prev, occasions: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                placeholder="e.g. Evening, Date Night, Special Events"
              />
            </div>

            {/* Volumes */}
            <div className="space-y-2">
              <Label>Volumes & Prices</Label>
              <div className="flex gap-2">
                <Input value={volumeInput} onChange={e => setVolumeInput(e.target.value)} placeholder="e.g. 50ml" className="flex-1" />
                <Input type="number" step="0.01" value={volumePriceInput} onChange={e => setVolumePriceInput(e.target.value)} placeholder="Price" className="w-28" />
                <Button type="button" variant="outline" onClick={addVolume}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(form.volumes).map(([vol, price]) => (
                  <span key={vol} className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
                    {vol}: {formatPrice(Number(price))}
                    <button onClick={() => removeVolume(vol)} className="text-destructive ml-1">&times;</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={form.new} onCheckedChange={v => setForm(prev => ({ ...prev, new: v }))} />
                <Label>New</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.bestseller} onCheckedChange={v => setForm(prev => ({ ...prev, bestseller: v }))} />
                <Label>Bestseller</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={form.available}
                  onCheckedChange={v => setForm(prev => ({ ...prev, available: v }))}
                />
                <Label className={form.available ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}>
                  {form.available ? 'Available' : 'Out of Stock'}
                </Label>
              </div>
            </div>

            {/* Volume Bonus */}
            <div className="space-y-3 rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm font-semibold">Volume Bonus Offer</Label>
                  <p className="text-xs text-muted-foreground font-body">Reward customers who choose a higher volume with free extra ml.</p>
                </div>
                <Switch
                  checked={!!form.volumeBonus}
                  onCheckedChange={v => setForm(prev => ({
                    ...prev,
                    volumeBonus: v ? { threshold: 50, bonus: 10 } : undefined,
                  }))}
                />
              </div>
              {form.volumeBonus && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Min. volume to qualify (ml)</Label>
                    <Input
                      type="number"
                      min={1}
                      value={form.volumeBonus.threshold}
                      onChange={e => setForm(prev => ({
                        ...prev,
                        volumeBonus: { ...(prev.volumeBonus as VolumeBonus), threshold: parseInt(e.target.value) || 0 },
                      }))}
                      placeholder="e.g. 50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Free bonus (ml)</Label>
                    <Input
                      type="number"
                      min={1}
                      value={form.volumeBonus.bonus}
                      onChange={e => setForm(prev => ({
                        ...prev,
                        volumeBonus: { ...(prev.volumeBonus as VolumeBonus), bonus: parseInt(e.target.value) || 0 },
                      }))}
                      placeholder="e.g. 10"
                    />
                  </div>
                </div>
              )}
            </div>

            <Button onClick={handleSubmit} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body" disabled={createProduct.isPending || updateProduct.isPending}>
              {editingId ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
