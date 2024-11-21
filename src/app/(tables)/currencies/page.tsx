'use client';

import { ActionEnum, ISOCountries, PageList, TableEnum } from '@/interfaces';

import { useGetStaticData } from '@/hooks/useGetStaticData';
import { useGetDynamicData } from '@/hooks/useGetDynamicData';

import '../styles.css';
import { getInputCheckboxValue } from '@/helpers/getInputCheckboxValue';
import { useUpdateData } from '@/hooks/useUpdateData';

export default function Currencies() {
  const { isoCountries } = useGetStaticData();
  const { inactiveCurrencies, fetchDynamicData } = useGetDynamicData(
    TableEnum.CURRENCY,
  );
  const { updateData } = useUpdateData(TableEnum.CURRENCY, () =>
    fetchDynamicData(TableEnum.CURRENCY),
  );

  const toggleActive = (
    { checked }: EventTarget & HTMLInputElement,
    numericCode: number,
  ) => {
    const action = checked ? ActionEnum.ADD : ActionEnum.REMOVE;
    updateData(action, numericCode);
  };

  const getCurrencies = (iso: ISOCountries) => {
    return iso.reduce((acc: { [key: string]: PageList }, cur) => {
      const { _id, alphabeticCode, country, numericCode } = cur;

      if (numericCode in acc) {
        acc[numericCode].countries.push(country);
        return acc;
      }

      return {
        ...acc,
        [numericCode]: {
          _id,
          countries: [country],
          alphabeticCodes: [alphabeticCode],
        },
      };
    }, {});
  };

  const sortCountries = (
    a: [numericCode: string, item: PageList],
    b: [numericCode: string, item: PageList],
  ) => {
    const nameA = a[1].alphabeticCodes[0];
    const nameB = b[1].alphabeticCodes[0];

    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }

    return 0;
  };

  return (
    <div>
      <h1 className="table-title">Currency</h1>
      {isoCountries?.length ? (
        <div className="list">
          {Object.entries(getCurrencies(isoCountries))
            .sort(sortCountries)
            .map(
              ([numericCode, item]: [numericCode: string, item: PageList]) => {
                const { _id, alphabeticCodes, countries } = item;
                const code = +numericCode;
                const alphabeticCode = alphabeticCodes[0];
                const checked = getInputCheckboxValue(inactiveCurrencies, code);

                return (
                  <div
                    key={_id}
                    className="grid grid-cols-10 grid-flow-col gap-4 p-2"
                  >
                    <div className="col-span-1">
                      <input
                        id="countries"
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => toggleActive(event.target, code)}
                      />
                    </div>
                    <div
                      className={`align-middle col-span-2 ${checked ? 'inactive' : ''}`}
                    >
                      {alphabeticCode}
                    </div>
                    <div
                      className={`flex justify-end col-span-7 ${checked ? 'inactive' : ''}`}
                    >
                      {countries.join(', ')}
                    </div>
                  </div>
                );
              },
            )}
        </div>
      ) : (
        <p>No data :(</p>
      )}
    </div>
  );
}
