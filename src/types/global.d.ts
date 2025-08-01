export {};

declare global {
  interface Country {
    name: {
      common: string;
      official: string;
      nativeName: {
        ron: {
          official: string;
          common: string;
        };
      };
    };
    independent: boolean;
    unMember: boolean;
    region: string;
    subregion: string;
    area: number;
    flag: string;
    population: number;
  }
}
