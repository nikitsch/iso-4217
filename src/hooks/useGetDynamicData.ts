'use client';

import { Table, TableEnum } from '@/interfaces';
import { useEffect, useState } from 'react';
import { useSSEInactive } from './useSSEInactive';

export function useGetDynamicData(table: Table) {
  const [inactiveCountries, setInactiveCountries] = useState<string[]>([]);
  const [inactiveCurrencies, setInactiveCurrencies] = useState<number[]>([]);

  const { inactive: sseInactive } = useSSEInactive(table);

  const fetchDynamicData = async (table: Table) => {
    const res = await fetch(`/api/getDynamic?table=${table}`);

    if (res.ok) {
      const { inactiveCountries, inactiveCurrencies } = await res.json();
      setInactiveCountries(inactiveCountries || []);
      setInactiveCurrencies(inactiveCurrencies || []);
    }
  };

  useEffect(() => {
    if (table === TableEnum.COUNTRIES) {
      setInactiveCountries((prev) =>
        sseInactive.toString() === prev.toString()
          ? prev
          : (sseInactive as string[]),
      );
    }
    if (table === TableEnum.CURRENCY) {
      setInactiveCurrencies((prev) =>
        sseInactive.toString() === prev.toString()
          ? prev
          : (sseInactive as number[]),
      );
    }
  }, [sseInactive, table]);

  useEffect(() => {
    fetchDynamicData(table);
  }, [table]);

  return { inactiveCountries, inactiveCurrencies, fetchDynamicData };
}
