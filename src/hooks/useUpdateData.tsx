import { Action, Country, Table } from '@/interfaces';

export function useUpdateData(table: Table, fetchDynamicData: () => void) {
  const updateData = async (action: Action, element: Country) => {
    const res = await fetch('/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table, action, element }),
    });

    if (res.ok) {
      fetchDynamicData(); // Обновление данных после изменения
    } else {
      console.error('Failed to update data');
    }
  };

  return { updateData };
}
