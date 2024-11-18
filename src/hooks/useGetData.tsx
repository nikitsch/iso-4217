'use client';

import {
  Currency,
  InactiveCountriesType,
  InactiveCurrenciesType,
  ISOCountries,
  Table,
} from '@/interfaces';
import { useEffect, useState } from 'react';

export function useGetData(table: Table) {
  const [isoCountries, setIsoCountries] = useState<ISOCountries>([]);
  const [currency, setCurrency] = useState<Currency>({});
  const [inactiveCountries, setInactiveCountries] =
    useState<InactiveCountriesType>([]);
  const [inactiveCurrencies, setInactiveCurrencies] =
    useState<InactiveCurrenciesType>([]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных при первом рендере
  useEffect(() => {
    const fetchStaticData = async () => {
      const res = await fetch('/api/get?table=COUNTRIES');
      if (res.ok) {
        const { isoCountries, currency } = await res.json();
        setIsoCountries(isoCountries);
        setCurrency(currency);
      }
    };
    fetchStaticData();
  }, []);

  // Загрузка изменяемых данных при переключении схемы
  useEffect(() => {
    const fetchDynamicData = async () => {
      setLoading(true);
      const res = await fetch(`/api/get?table=${table}`);
      if (res.ok) {
        const { inactiveCountries, inactiveCurrencies } = await res.json();
        if (table === 'COUNTRIES') {
          setInactiveCountries(inactiveCountries);
        } else {
          setInactiveCurrencies(inactiveCurrencies);
        }
      }
      setLoading(false);
    };
    fetchDynamicData();
  }, [table]);

  return {
    isoCountries,
    currency,
    inactiveCountries,
    inactiveCurrencies,
    loading,
  };
}
