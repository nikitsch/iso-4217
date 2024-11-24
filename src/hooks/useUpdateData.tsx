import { Action, Table } from '@/interfaces';

export function useUpdateData(
  table: Table,
  fetchDynamicData: () => Promise<void>,
) {
  const updateData = async (action: Action, value: string | number) => {
    const res = await fetch('/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table, action, value }),
    });

    if (res.ok) {
      fetchDynamicData(); // Обновление данных после изменения
    } else {
      console.error('Failed to update data');
    }
  };

  return { updateData };
}
