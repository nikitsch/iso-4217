'use client';

import { ISOCountries } from '@/interfaces';
import { useEffect, useState } from 'react';

export function useGetISOCountries() {
  const [data, setData] = useState<ISOCountries>([]);

  useEffect(() => {
    const fetchStaticData = async () => {
      const res = await fetch('/api/get_iso_countries');

      if (res.ok) {
        const { isoCountries } = await res.json();
        setData(isoCountries);
      }
    };
    fetchStaticData();
  }, []);

  return { isoCountries: data };
}
