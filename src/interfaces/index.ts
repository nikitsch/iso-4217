export type Table = 'COUNTRIES' | 'CURRENCY';
export enum TableEnum {
  COUNTRIES = 'COUNTRIES',
  CURRENCY = 'CURRENCY',
}

export type Action = 'ADD' | 'REMOVE';
export enum ActionEnum {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

export type ISOCountries = Country[];
export interface Country {
  _id: string;
  country: string;
  currency: string;
  alphabeticCode: string;
  numericCode: number;
  minorUnit: string;
}

export interface Currency {
  [key: string]: Pick<Country, 'alphabeticCode'>;
}

export interface InactiveCountries {
  _id: 'inactiveCountries';
  countries: string[];
}

export interface InactiveCurrencies {
  _id: 'inactiveCurrencies';
  currencies: number[];
}

export enum DBNaming {
  DB = 'iso-4217',
  COLL_ISO_COUNTRIES = 'isoCountries',
  COLL_CURRENCY = 'currency',
  COLL_INACT_COUNTRIES = 'inactiveCountries',
  COLL_INACT_CURRENCY = 'inactiveCurrencies',
}

export interface PageList {
  _id: string;
  alphabeticCodes: string[];
  countries: string[];
}
