'use client';

import { useEffect, useState } from 'react';

export function useGetDynamicData() {
  const [inactiveCountries, setInactiveCountries] = useState<string[]>([]);
  const [inactiveCurrencies, setInactiveCurrencies] = useState<number[]>([]);

  const fetchDynamicData = async () => {
    const res = await fetch(`/api/get`);

    if (res.ok) {
      const { inactiveCountries, inactiveCurrencies } = await res.json();
      setInactiveCountries(inactiveCountries || []);
      setInactiveCurrencies(inactiveCurrencies || []);
    }
  };

  useEffect(() => {
    fetchDynamicData();
  }, []);

  return { inactiveCountries, inactiveCurrencies, fetchDynamicData };
}
