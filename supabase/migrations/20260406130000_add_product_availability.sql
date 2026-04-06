-- Add availability flag to products table
-- true = available for purchase (default), false = out of stock / unavailable
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS is_available BOOLEAN NOT NULL DEFAULT true;
