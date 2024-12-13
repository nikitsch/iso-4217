import { PageList } from '@/interfaces';

export const currencyCompareFn = (
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
