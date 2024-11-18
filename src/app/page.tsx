'use client';

import { useState } from 'react';

import { Country, Table, TableEnum } from '@/interfaces';

import './styles.css';
import { useGetStaticData } from '@/hooks/useGetStaticData';
import { useGetDynamicData } from '@/hooks/useGetDynamicData';

export default function Home() {
  const [table, setTable] = useState<Table>(TableEnum.COUNTRIES);
  const { isoCountries, currency } = useGetStaticData();
  const { inactiveCountries, inactiveCurrencies } = useGetDynamicData();
  // const { updateData } = useUpdateData(table, () => useGetData(table));

  console.log({
    isoCountries,
    currency,
    inactiveCountries,
    inactiveCurrencies,
    table,
  });

  if (!isoCountries) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <button onClick={() => setTable(TableEnum.COUNTRIES)}>Countries</button>
      <button onClick={() => setTable(TableEnum.CURRENCY)}>Currency</button>
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
