import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

/**
 * A table data source whose filter searches the given text fields, including
 * nested ones the default filter cannot see (e.g. a request's userInfo.email).
 */
export function createTableSource<T>(
  rows: T[],
  fields: (row: T) => (string | number | undefined | null)[],
  paginator?: MatPaginator,
  sort?: MatSort,
): MatTableDataSource<T> {
  const source = new MatTableDataSource<T>(rows);
  source.filterPredicate = (row, filter) =>
    fields(row).some((value) => String(value ?? '').toLowerCase().includes(filter));
  if (paginator) source.paginator = paginator;
  if (sort) source.sort = sort;
  return source;
}

export function applyTableFilter<T>(source: MatTableDataSource<T>, event: Event): void {
  source.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  source.paginator?.firstPage();
}
