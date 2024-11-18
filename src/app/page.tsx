'use client';

import { useState } from 'react';

import { Country, Table } from '@/interfaces';
import { useGetData } from '@/hooks/useGetData';

import './styles.css';

export default function Home() {
  const [table, setTable] = useState<Table>('CURRENCY');
  const {
    isoCountries,
    currency,
    inactiveCountries,
    inactiveCurrencies,
    loading,
  } = useGetData(table);
  // const { updateData } = useUpdateData(table, () => useGetData(table));

  console.log({
    isoCountries,
    currency,
    inactiveCountries,
    inactiveCurrencies,
    loading,
  });

  if (!isoCountries) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => setTable('COUNTRIES')}>Countries</button>
      <button onClick={() => setTable('CURRENCY')}>Currency</button>
      <h1 className="text-2xl font-bold mb-4">ISO Countries</h1>
      <div className="list">
        {isoCountries.map((item: Country) => (
          <div key={item._id} className="flex justify-between p-2">
            <span>
              {item.country} - {item.alphabeticCode}
            </span>
            <input type="checkbox" />
          </div>
        ))}
      </div>
    </div>
  );
}
