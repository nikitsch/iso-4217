'use client';

import { Table } from '@/interfaces';
import { useEffect, useState } from 'react';

export function useGetDynamicData(table: Table) {
  const [inactiveCountries, setInactiveCountries] = useState<string[]>([]);
  const [inactiveCurrencies, setInactiveCurrencies] = useState<number[]>([]);

  const fetchDynamicData = async (table: Table) => {
    const res = await fetch(`/api/getDynamic?table=${table}`);

    if (res.ok) {
      const { inactiveCountries, inactiveCurrencies } = await res.json();
      setInactiveCountries(inactiveCountries || []);
      setInactiveCurrencies(inactiveCurrencies || []);
    }
  };

  useEffect(() => {
    fetchDynamicData(table);
  }, [table]);

  return { inactiveCountries, inactiveCurrencies, fetchDynamicData };
}
