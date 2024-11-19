'use client';

import { TableEnum } from '@/interfaces';

import { useGetStaticData } from '@/hooks/useGetStaticData';
import { useGetDynamicData } from '@/hooks/useGetDynamicData';

import '../styles.css';

export default function Currencies() {
  const { isoCountries, currency } = useGetStaticData();
  const { inactiveCurrencies } = useGetDynamicData(TableEnum.CURRENCY);
  // const { updateData } = useUpdateData(TableEnum.CURRENCY, () => fetchDynamicData(TableEnum.CURRENCY));

  console.log({ isoCountries, currency, inactiveCurrencies });

  if (!isoCountries) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="table-title">Currency</h1>
      <div className="list"></div>
    </div>
  );
}
