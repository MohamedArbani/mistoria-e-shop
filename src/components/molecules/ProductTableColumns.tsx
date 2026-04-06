import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2, Tag, Star, MoreVertical } from 'lucide-react';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { CategoryBadge } from '@/components/atoms/CategoryBadge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CATEGORIES, type Product } from '@/types/product';

interface ProductColumnsOptions {
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function getProductColumns({
  onEdit,
  onDelete,
}: ProductColumnsOptions): ColumnDef<Product>[] {
  return [
    {
      id: 'image',
      header: '',
      enableSorting: false,
      enableHiding: false,
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
        variant: 'select',
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
          ${(row.getValue('price') as number).toFixed(2)}
        </span>
      ),
      enableSorting: true,
      meta: {
        label: 'Price',
        variant: 'number',
        unit: '$',
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
      id: 'actions',
      header: '',
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="font-body">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(product)} className="gap-2">
                <Pencil className="size-4" />
                Edit
              </DropdownMenuItem>
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
