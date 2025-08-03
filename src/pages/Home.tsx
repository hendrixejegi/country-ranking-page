import Logo from "/src/assets/Logo.svg";
import fetchCountriesData from "../api/countriesAPI";
import { useState, useEffect } from "react";
import FilterForm from "../components/FilterForm";

type Regions =
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

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountriesData();
      setCountriesData(data);
    };
    getCountries();
  }, []);

  // Update updatedCountriesData array if filter object changes
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
      filteredAndSortedCountries.sort((a, b) => a.population - b.population);
    }

    if (filter.sort === "name") {
      filteredAndSortedCountries.sort((a, b) => {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }

    if (filter.sort === "area") {
      filteredAndSortedCountries.sort((a, b) => a.area - b.area);
    }

    if (filter.regions.length > 0) {
      filteredAndSortedCountries = filteredAndSortedCountries.filter(
        (country) =>
          filter.regions.includes(country.region.toLowerCase() as Regions),
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
    <>
      <div className="aspect-[4/3] max-h-[400px] w-full bg-[url(/hero-image-sm.jpg)] bg-cover bg-center bg-no-repeat px-8 pt-[min(20vw,_150px)] pb-32 md:bg-[url(/hero-image.jpg)]">
        <img src={Logo} alt="World Ranks Logo" className="mx-auto" />
      </div>
      <div className="border-secondary bg-primary mx-4 -mt-32 space-y-8 rounded-xl border-1 px-4 py-8 md:-mt-16">
        <FilterForm
          countriesLength={countriesData.length}
          filterBy={setFilter}
        />
      </div>
    </>
  );
}

export default Home;
