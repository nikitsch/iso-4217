'use client';

import { useEffect, useState } from 'react';
import { TableEnum } from '@/interfaces';

import { useSSEInactive } from './useSSEInactive';

export function useGetInactiveCountries() {
  const { sseInactive } = useSSEInactive(TableEnum.COUNTRIES);

  const [data, setData] = useState<string[]>([]);

  const fetchInactiveCountries = async () => {
    const res = await fetch(`/api/get_inactive?table=${TableEnum.COUNTRIES}`);

    if (!res.ok) {
      console.error('Failed to fetch inactive countries');
      return;
    }

    const { inactiveCountries } = await res.json();
    setData(inactiveCountries || []);
  };

  useEffect(() => {
    setData((prev) =>
      sseInactive.toString() === prev.toString()
        ? prev
        : (sseInactive as string[]),
    );
  }, [sseInactive]);

  return { inactiveCountries: data, fetchInactiveCountries };
}
