-- Add volume_bonus column to products table
-- Stores optional bonus offer: { "threshold": 50, "bonus": 10 }
-- Meaning: "buy a volume >= 50ml and receive 10ml extra for free"
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS volume_bonus JSONB DEFAULT NULL;
