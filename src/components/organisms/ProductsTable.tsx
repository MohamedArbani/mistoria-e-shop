import * as React from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { getProductColumns } from '@/components/molecules/ProductTableColumns';
import { Skeleton } from '@/components/ui/skeleton';
import { useDataTable } from '@/hooks/use-data-table';
import type { Product } from '@/types/product';

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductsTable({
  products,
  isLoading,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  const columns = React.useMemo(
    () => getProductColumns({ onEdit, onDelete }),
    [onEdit, onDelete],
  );

  const { table } = useDataTable({
    data: products,
    columns,
    pageCount: -1,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 10 },
      sorting: [],
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
