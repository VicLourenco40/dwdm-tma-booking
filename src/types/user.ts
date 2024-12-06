import { Country } from './country';

export type User = {
  id: string;
  name: string;
  email: string;
  country: Country;
  birthDate: string;
};
