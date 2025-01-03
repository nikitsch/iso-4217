'use client';

import { ActionEnum, ISOCountries, PageList, TableEnum } from '@/interfaces';

import { useGetISOCountries } from '@/hooks/useGetISOCountries';
import { useGetInactiveCountries } from '@/hooks/useGetInactiveCountries';
import { useUpdateInactiveData } from '@/hooks/useUpdateInactiveData';
import { getInputCheckboxValue } from '@/helpers/getInputCheckboxValue';

import '../styles.css';

export default function Countries() {
  const { isoCountries } = useGetISOCountries();
  const { inactiveCountries, fetchInactiveCountries } =
    useGetInactiveCountries();
  const { updateInactiveData } = useUpdateInactiveData(
    TableEnum.COUNTRIES,
    fetchInactiveCountries,
  );

  const toggleActive = (
    { checked }: EventTarget & HTMLInputElement,
    value: string,
  ) => {
    const action = checked ? ActionEnum.ADD : ActionEnum.REMOVE;
    updateInactiveData(action, value);
  };

  const getCountries = (iso: ISOCountries) => {
    return iso.reduce((acc: { [key: string]: PageList }, cur) => {
      const { _id, alphabeticCode, country } = cur;

      if (country in acc) {
        acc[country].alphabeticCodes.push(alphabeticCode);
        return acc;
      }

      return {
        ...acc,
        [country]: {
          _id,
          countries: [country],
          alphabeticCodes: [alphabeticCode],
        },
      };
    }, {});
  };

  return (
    <div>
      <h1 className="table-title">Countries</h1>
      {isoCountries?.length ? (
        <div className="list">
          {Object.entries(getCountries(isoCountries)).map(
            ([country, item]: [country: string, item: PageList]) => {
              const { _id, alphabeticCodes } = item;
              const codes = alphabeticCodes.join(', ');
              const checked = getInputCheckboxValue(inactiveCountries, country);

              return (
                <div
                  key={_id}
                  className="grid grid-cols-10 grid-flow-col gap-4 p-2"
                >
                  <div className="flex align-middle col-span-1">
                    <input
                      id="countries"
                      type="checkbox"
                      checked={checked}
                      onChange={(event) => toggleActive(event.target, country)}
                    />
                  </div>
                  <div className={`col-span-7 ${checked ? 'inactive' : ''}`}>
                    {country}
                  </div>
                  <div
                    className={`flex justify-end col-span-2 ${checked ? 'inactive' : ''}`}
                  >
                    {codes}
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
