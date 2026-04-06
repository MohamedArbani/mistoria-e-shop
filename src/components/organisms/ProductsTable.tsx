import * as React from 'react';
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from 'nuqs';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { getProductColumns } from '@/components/molecules/ProductTableColumns';
import { Skeleton } from '@/components/ui/skeleton';
import { useDataTable } from '@/hooks/use-data-table';
import { useProductsTable } from '@/hooks/useProducts';
import { getSortingStateParser } from '@/lib/parsers';
import type { Product } from '@/types/product';

interface ProductsTableProps {
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductsTable({ onEdit, onDelete }: ProductsTableProps) {
  // Read the same URL params that useDataTable manages so we can drive the Supabase query
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [sortParam] = useQueryState('sort', getSortingStateParser<Product>().withDefault([]));
  const [nameFilter] = useQueryState('name', parseAsString.withDefault(''));
  const [categoryFilter] = useQueryState('category', parseAsArrayOf(parseAsString, ',').withDefault([]));

  const { data, isLoading } = useProductsTable({
    page,
    perPage,
    sort: sortParam,
    name: nameFilter || null,
    categories: categoryFilter.length ? categoryFilter : null,
  });

  const pageCount = data ? Math.ceil(data.count / perPage) : -1;

  const columns = React.useMemo(
    () => getProductColumns({ onEdit, onDelete }),
    [onEdit, onDelete],
  );

  const { table } = useDataTable({
    data: data?.products ?? [],
    columns,
    pageCount,
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  if (isLoading && !data) {
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
