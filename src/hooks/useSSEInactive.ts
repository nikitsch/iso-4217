import { Table } from '@/interfaces';
import { useEffect, useState } from 'react';

export function useSSEInactive<T extends number | string>(table: Table) {
  const [data, setData] = useState<{ inactive: T[] }>({ inactive: [] });

  useEffect(() => {
    const eventSource = new EventSource(`/api/sse?table=${table}`);

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    eventSource.onerror = () => {
      console.error('SSE connection error');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [table]);

  return data;
}
