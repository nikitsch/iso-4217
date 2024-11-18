'use client';

import { Currency, ISOCountries } from '@/interfaces';
import { useEffect, useState } from 'react';

export function useGetStaticData() {
  const [isoCountries, setIsoCountries] = useState<ISOCountries>([]);
  const [currency, setCurrency] = useState<Currency>({});

  useEffect(() => {
    const fetchStaticData = async () => {
      const res = await fetch('/api/get');

      if (res.ok) {
        const { isoCountries, currency } = await res.json();
        setIsoCountries(isoCountries);
        setCurrency(currency);
      }
    };
    fetchStaticData();
  }, []);

  return { isoCountries, currency };
}
