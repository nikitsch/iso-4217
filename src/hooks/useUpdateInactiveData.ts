import { Action, Table } from '@/interfaces';

export function useUpdateInactiveData(
  table: Table,
  fetchInactiveData: () => Promise<void>,
) {
  const updateInactiveData = async (action: Action, value: string | number) => {
    const res = await fetch('/api/update_inactive', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table, action, value }),
    });

    if (!res.ok) {
      console.error('Failed to update inactive data');
      return;
    }

    fetchInactiveData(); // Обновление данных после изменения
  };

  return { updateInactiveData };
}
