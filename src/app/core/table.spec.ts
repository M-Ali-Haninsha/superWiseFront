import { applyTableFilter, createTableSource } from './table';

interface Row {
  userInfo: { firstName: string; email: string };
}

describe('createTableSource', () => {
  const rows: Row[] = [
    { userInfo: { firstName: 'Asha', email: 'asha@example.com' } },
    { userInfo: { firstName: 'Ravi', email: 'ravi@example.com' } },
  ];

  it('filters on nested fields the default filter cannot see', () => {
    const source = createTableSource(rows, (r) => [r.userInfo.firstName, r.userInfo.email]);
    applyTableFilter(source, { target: { value: '  RAVI@ ' } } as unknown as Event);

    expect(source.filteredData).toEqual([rows[1]]);
  });
});
