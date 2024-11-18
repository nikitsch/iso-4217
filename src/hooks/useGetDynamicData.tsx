'use client';

import { InactiveCountries, InactiveCurrencies } from '@/interfaces';
import { useEffect, useState } from 'react';

export function useGetDynamicData() {
  const [inactiveCountries, setInactiveCountries] = useState<
    Pick<InactiveCountries, 'countries'> | []
  >([]);
  const [inactiveCurrencies, setInactiveCurrencies] = useState<
    Pick<InactiveCurrencies, 'currencies'> | []
  >([]);

  useEffect(() => {
    const fetchDynamicData = async () => {
      const res = await fetch(`/api/get`);

      if (res.ok) {
        const { inactiveCountries, inactiveCurrencies } = await res.json();
        setInactiveCountries(inactiveCountries);
        setInactiveCurrencies(inactiveCurrencies);
      }
    };
    fetchDynamicData();
  }, []);

  return { inactiveCountries, inactiveCurrencies };
}
