import fetchCountriesData from "../api/fetchCountries";
import { useState, useEffect } from "react";
import SearchIcon from "../assets/SearchIcon";
import SortComponent from "../components/SortComponent";
import CountryRanking from "../components/CountryRanking";
import useScreen from "../hooks/useScreen";

export type Regions =
  | "americas"
  | "antarctic"
  | "africa"
  | "asia"
  | "europe"
  | "oceania";

export interface Filter {
  search: string;
  sort: string;
  regions: Regions[];
  isUnMember: boolean;
  isIndependent: boolean;
}

function Home() {
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [filter, setFilter] = useState<Filter>({
    search: "",
    sort: "population",
    regions: [],
    isUnMember: false,
    isIndependent: false,
  });
  const [updatedCountriesData, setUpdatedCountriesData] = useState<Country[]>(
    [],
  );

  const screenWidth = useScreen();

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountriesData();
      setCountriesData(data);
    };
    getCountries();
  }, []);

  // Update updatedCountriesData array if countriesData or filter object changes
  useEffect(() => {
    let filteredAndSortedCountries = [...countriesData];

    if (filter.search.length > 0) {
      const query = filter.search;
      filteredAndSortedCountries = filteredAndSortedCountries.filter(
        (country) =>
          country?.region?.toLowerCase().includes(query) ||
          country?.subregion?.toLowerCase().includes(query) ||
          country?.name?.common?.toLowerCase().includes(query) ||
          country?.name?.official?.toLowerCase().includes(query),
      );
    }

    if (filter.sort === "population") {
      filteredAndSortedCountries.sort(
        (a, b) => (a.population ?? 0) - (b.population ?? 0),
      );
    } else if (filter.sort === "name") {
      filteredAndSortedCountries.sort((a, b) => {
        const nameA = a?.name?.common?.toLowerCase();
        const nameB = b?.name?.common?.toLowerCase();

        if ((nameA ?? 0) < (nameB ?? 0)) return -1;
        if ((nameA ?? 0) > (nameB ?? 0)) return 1;
        return 0;
      });
    } else if (filter.sort === "area") {
      filteredAndSortedCountries.sort((a, b) => (a.area ?? 0) - (b.area ?? 0));
    }

    if (filter.regions.length > 0) {
      filteredAndSortedCountries = filteredAndSortedCountries.filter(
        (country) =>
          filter.regions.includes(country?.region?.toLowerCase() as Regions),
      );
    }

    if (filter.isIndependent && filter.isUnMember) {
      filteredAndSortedCountries = filteredAndSortedCountries.filter(
        (country) => country.independent && country.unMember,
      );
    } else if (filter.isIndependent) {
      filteredAndSortedCountries = filteredAndSortedCountries.filter(
        (country) => country.independent,
      );
    } else if (filter.isUnMember) {
      filteredAndSortedCountries = filteredAndSortedCountries.filter(
        (country) => country.unMember,
      );
    }

    setUpdatedCountriesData(filteredAndSortedCountries);
  }, [countriesData, filter]);

  return (
    <div className="space-y-8 px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-0">
        <p className="font-semibold">
          Found {updatedCountriesData.length} countries
        </p>
        <div className="bg-secondary flex w-full max-w-sm items-center justify-center gap-2 rounded-lg p-2">
          <SearchIcon aria-hidden="true" className="text-accent-light" />
          <input
            type="search"
            name="search"
            id="search"
            placeholder={`Search by Name, Region${screenWidth <= 1024 ? "..." : ", SubRegion"}`}
            className="placeholder:text-accent-light text-md w-[220px] border-none outline-0 md:w-full"
            onChange={(event) => {
              setFilter((prev) => ({
                ...prev,
                search: event.target.value,
              }));
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr]">
        <SortComponent sortBy={setFilter} />
        <div className="flex min-h-[748px] flex-col justify-between gap-8">
          <CountryRanking countries={updatedCountriesData} />
        </div>
      </div>
    </div>
  );
}

export default Home;
