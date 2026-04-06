import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2, Tag, Star, MoreHorizontal, CheckCircle2, XCircle } from 'lucide-react';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { CategoryBadge } from '@/components/atoms/CategoryBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CATEGORIES, type Product } from '@/types/product';
import { formatPrice, CURRENCY_SYMBOL } from '@/lib/format';

interface ProductColumnsOptions {
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggleAvailability: (product: Product) => void;
}

export function getProductColumns({
  onEdit,
  onDelete,
  onToggleAvailability,
}: ProductColumnsOptions): ColumnDef<Product>[] {
  return [
    {
      id: 'image',
      header: '',
      enableSorting: false,
      enableHiding: false,
      size: 60,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="size-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="size-full object-cover"
              />
            ) : (
              <div className="size-full flex items-center justify-center text-xs text-muted-foreground">
                —
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Name" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="font-heading font-semibold truncate">
            {row.getValue('name')}
          </span>
          {row.original.description && (
            <span className="text-xs text-muted-foreground truncate max-w-[280px]">
              {row.original.description}
            </span>
          )}
        </div>
      ),
      enableColumnFilter: true,
      meta: {
        label: 'Name',
        placeholder: 'Search products…',
        variant: 'text',
      },
    },
    {
      id: 'category',
      accessorKey: 'category',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Category" />
      ),
      cell: ({ row }) => (
        <CategoryBadge category={row.getValue('category')} />
      ),
      enableColumnFilter: true,
      meta: {
        label: 'Category',
        variant: 'multiSelect',
        options: CATEGORIES.map((c) => ({ label: c.label, value: c.value })),
      },
    },
    {
      id: 'price',
      accessorKey: 'price',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Price" />
      ),
      cell: ({ row }) => (
        <span className="font-body tabular-nums">
          {formatPrice(row.getValue('price') as number)}
        </span>
      ),
      enableSorting: true,
      meta: {
        label: 'Price',
        variant: 'number',
        unit: CURRENCY_SYMBOL,
      },
    },
    {
      id: 'tags',
      header: 'Tags',
      enableSorting: false,
      cell: ({ row }) => {
        const product = row.original;
        if (!product.new && !product.bestseller) return null;
        return (
          <div className="flex gap-1 flex-wrap">
            {product.new && (
              <Badge variant="secondary" className="font-body text-xs gap-1">
                <Tag className="size-3" />
                New
              </Badge>
            )}
            {product.bestseller && (
              <Badge className="font-body text-xs gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-0">
                <Star className="size-3" />
                Bestseller
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: 'available',
      header: 'Status',
      enableSorting: false,
      cell: ({ row }) => {
        const available = row.original.available;
        return available ? (
          <span className="inline-flex items-center gap-1 text-xs font-body font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-3.5" />
            Available
          </span>
        ) : (
          <span className="inline-flex text-nowrap items-center gap-1 text-xs font-body font-medium text-destructive">
            <XCircle className="size-3.5" />
            Out of Stock
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      enableHiding: false,
      enablePinning: true,
      size: 60,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="font-body">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(product)} className="gap-2">
                <Pencil className="size-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onToggleAvailability(product)}
                className="gap-2"
              >
                {product.available ? (
                  <>
                    <XCircle className="size-4 text-destructive" />
                    Mark Out of Stock
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-4 text-emerald-600" />
                    Mark Available
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(product.id)}
                className="gap-2 text-destructive focus:text-destructive"
              >
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
