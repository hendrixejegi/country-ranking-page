export {};

declare global {
  interface Country {
    name?: {
      common?: string;
      official?: string;
    };
    independent?: boolean;
    unMember?: boolean;
    region?: string;
    subregion?: string;
    area?: number;
    cca2?: string;
    population?: number;
  }

  interface CountryInfo extends Country {
    capital?: string;
    borders?: string[];
    currencies?: {
      [key: string]: {
        name: string;
        symbol: string;
      };
    };
    languages?: { [key: string]: string };
    continents?: string[];
  }

  interface Neighbor {
    name?: {
      official?: string;
    };
    cca2?: string;
  }

  type Languages = NonNullable<CountryInfo["languages"]>;
  type CurrencyType = NonNullable<CountryInfo["currencies"]>;
  type CurrencyEntry = CurrencyType[string];
}
