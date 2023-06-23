import React, { useEffect, useState } from 'react';
import { snacks } from '../data';

export const Table = () => {
  const [tableData, setTableData] = useState(snacks);
  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');
  const [search, setSearch] = useState('');

  const columns = [
    { label: 'ID', accessor: 'id' },
    { label: 'Product Name', accessor: 'product_name' },
    { label: 'Product weight', accessor: 'product_weight' },
    { label: 'Price(INR)', accessor: 'price' },
    { label: 'Calories', accessor: 'calories' },
    { label: 'Ingredients', accessor: 'ingredients' },
  ];
  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
            numeric: true,
          }) * (sortOrder === 'asc' ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };
  const getSearched = () =>
    setTableData(
      snacks?.filter((item) =>
        item?.product_name?.toLowerCase().includes(search.toLowerCase()),
      ),
    );

  useEffect(() => {
    getSearched();
  }, [search]);

  return (
    <div>
      <input type="text" onChange={(event) => setSearch(event.target.value)} />{' '}
      <table className="table">
        <thead>
          <tr>
            {columns.map(({ label, accessor }) => (
              <th
                key={accessor}
                onClick={() => handleSortingChange(accessor)}
                style={{ cursor: 'pointer' }}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => {
            return (
              <tr key={data.id}>
                {columns.map(({ accessor }) =>
                  accessor === 'ingredients' ? (
                    <td key={accessor}>
                      {data[accessor].map((e) => `${e}, `)}
                    </td>
                  ) : (
                    <td key={accessor}>{data[accessor]}</td>
                  ),
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
