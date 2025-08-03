export type Country = {
  id: number;
  name: string;
};

export type Countries = Country[];

export type CountriesResponse = {
  data: Countries;
  message: string;
};
