'use client';

import { ActionEnum, Table } from '@/interfaces';
import { useUpdateData } from './useUpdateData';
import { useGetDynamicData } from './useGetDynamicData';
import { useCallback } from 'react';

export function useToggleCheckbox(table: Table) {
  const { fetchDynamicData } = useGetDynamicData(table);
  const { updateData } = useUpdateData(table, () => fetchDynamicData(table));

  const toggleCheckbox = useCallback(
    ({ checked }: EventTarget & HTMLInputElement, value: string | number) => {
      const action = checked ? ActionEnum.ADD : ActionEnum.REMOVE;
      console.log({ checked, action, value });

      updateData(action, value);
    },
    [updateData],
  );

  return toggleCheckbox;
}
