export {};

declare global {
  interface Country {
    name: {
      common: string;
      official: string;
    };
    independent: boolean;
    unMember: boolean;
    region: string;
    subregion: string;
    area: number;
    cca2: string;
    population: number;
  }
}
