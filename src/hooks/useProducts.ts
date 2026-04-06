import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';
import { mapDbProduct, type Product, type ProductCategory } from '@/types/product';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []).map(mapDbProduct);
    },
  });
}

export interface ProductsTableParams {
  page: number;
  perPage: number;
  sort: { id: string; desc: boolean }[];
  name: string | null;
  categories: string[] | null;
}

export function useProductsTable({ page, perPage, sort, name, categories }: ProductsTableParams) {
  return useQuery({
    queryKey: ['products', 'table', { page, perPage, sort, name, categories }],
    placeholderData: (prev) => prev,
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*', { count: 'exact' });

      if (name) {
        query = query.ilike('name', `%${name}%`);
      }

      if (categories && categories.length > 0) {
        query = query.in('category', categories as ProductCategory[]);
      }

      if (sort.length > 0) {
        for (const s of sort) {
          if (s.id === 'name' || s.id === 'price') {
            query = query.order(s.id, { ascending: !s.desc });
          }
        }
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const from = (page - 1) * perPage;
      const to = from + perPage - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;
      if (error) throw error;

      return {
        products: (data ?? []).map(mapDbProduct),
        count: count ?? 0,
      };
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error) throw error;
      return mapDbProduct(data);
    },
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Omit<Product, 'id'>) => {
      const { data, error } = await supabase.from('products').insert([{
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        description: product.description,
        long_description: product.longDescription,
        notes_top: product.notes.top,
        notes_middle: product.notes.middle,
        notes_base: product.notes.base,
        longevity: product.longevity,
        projection: product.projection,
        occasions: product.occasions,
        volumes: product.volumes as unknown as Json,
        is_new: product.new,
        is_bestseller: product.bestseller,
        volume_bonus: (product.volumeBonus ?? null) as unknown as Json,
        is_available: product.available,
      }]).select().single();
      if (error) throw error;
      return mapDbProduct(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      const { error } = await supabase.from('products').update({
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        description: product.description,
        long_description: product.longDescription,
        notes_top: product.notes.top,
        notes_middle: product.notes.middle,
        notes_base: product.notes.base,
        longevity: product.longevity,
        projection: product.projection,
        occasions: product.occasions,
        volumes: product.volumes,
        is_new: product.new,
        is_bestseller: product.bestseller,
        volumes: product.volumes as unknown as Json,
        volume_bonus: (product.volumeBonus ?? null) as unknown as Json,
        is_available: product.available,
      }).eq('id', product.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  });
}
