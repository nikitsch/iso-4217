'use client';

import { ISOCountries } from '@/interfaces';
import { useEffect, useState } from 'react';

export function useGetStaticData() {
  const [isoCountries, setIsoCountries] = useState<ISOCountries>([]);

  useEffect(() => {
    const fetchStaticData = async () => {
      const res = await fetch('/api/getStatic');

      if (res.ok) {
        const { isoCountries } = await res.json();
        setIsoCountries(isoCountries);
      }
    };
    fetchStaticData();
  }, []);

  return { isoCountries };
}
