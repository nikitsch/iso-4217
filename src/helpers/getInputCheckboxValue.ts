export const getInputCheckboxValue = <T extends number | string>(
  inactive: T[],
  value: T,
) => inactive.includes(value);
