'use client';

import { useEffect, useState } from 'react';
import { TableEnum } from '@/interfaces';

import { useSSEInactive } from './useSSEInactive';

export function useGetInactiveCurrencies() {
  const { sseInactive } = useSSEInactive(TableEnum.CURRENCY);

  const [data, setData] = useState<number[]>([]);

  const fetchInactiveCurrencies = async () => {
    const res = await fetch(`/api/get_inactive?table=${TableEnum.CURRENCY}`);

    if (!res.ok) {
      console.error('Failed to fetch inactive currencies');
      return;
    }

    const { inactiveCurrencies } = await res.json();
    setData(inactiveCurrencies || []);
  };

  useEffect(() => {
    setData((prev) =>
      sseInactive.toString() === prev.toString()
        ? prev
        : (sseInactive as number[]),
    );
  }, [sseInactive]);

  return { inactiveCurrencies: data, fetchInactiveCurrencies };
}
