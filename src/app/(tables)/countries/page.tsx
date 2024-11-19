'use client';

import { ActionEnum, ISOCountries, TableEnum } from '@/interfaces';

import { useGetStaticData } from '@/hooks/useGetStaticData';
import { useGetDynamicData } from '@/hooks/useGetDynamicData';
import { useUpdateData } from '@/hooks/useUpdateData';
import { getInputCheckboxValue } from '@/helpers/getInputCheckboxValue';

import '../styles.css';

interface TableCountry {
  _id: string;
  alphabeticCodes: string[];
  country: string;
}

export default function Countries() {
  const { isoCountries } = useGetStaticData();
  const { inactiveCountries, fetchDynamicData } = useGetDynamicData(
    TableEnum.COUNTRIES,
  );
  const { updateData } = useUpdateData(TableEnum.COUNTRIES, () =>
    fetchDynamicData(TableEnum.COUNTRIES),
  );

  console.log({ isoCountries, inactiveCountries });

  if (!isoCountries) return <p>Loading...</p>;

  const toggleActive = (
    { checked }: EventTarget & HTMLInputElement,
    country: string | number,
  ) => {
    const action = checked ? ActionEnum.ADD : ActionEnum.REMOVE;
    updateData(action, country);
  };

  const getCountries = (iso: ISOCountries) => {
    return iso.reduce((acc: { [key: string]: TableCountry }, cur) => {
      const { _id, alphabeticCode, country } = cur;

      if (country in acc) {
        acc[country].alphabeticCodes.push(alphabeticCode);
        return acc;
      }

      return {
        ...acc,
        [country]: { _id, country, alphabeticCodes: [alphabeticCode] },
      };
    }, {});
  };

  return (
    <div>
      <h1 className="table-title">Countries</h1>
      <div className="list">
        {Object.values(getCountries(isoCountries)).map((item: TableCountry) => {
          const { _id, alphabeticCodes, country } = item;
          const codes = alphabeticCodes.join(', ');

          return (
            <div
              key={_id}
              className="grid grid-cols-10 grid-flow-col gap-4 p-2"
            >
              <div className="flex align-middle col-span-1">
                <input
                  id="countries"
                  type="checkbox"
                  checked={getInputCheckboxValue(inactiveCountries, country)}
                  onChange={(event) => toggleActive(event.target, country)}
                />
              </div>
              <div className="col-span-7">{country}</div>
              <div className="flex justify-end col-span-2">{codes}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
