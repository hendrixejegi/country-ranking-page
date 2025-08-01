import Logo from "/src/assets/Logo.svg";
import fetchCountriesData from "../api/countriesAPI";
import { useState, useEffect } from "react";
import FilterForm from "../components/FilterForm";

function Home() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountriesData();
      setCountries((prev) => [...prev, ...data]);
    };
    // getCountries();
  }, []);

  return (
    <>
      <div className="aspect-[4/3] bg-[url(/hero-image-sm.jpg)] bg-cover bg-center bg-no-repeat p-8">
        <img src={Logo} alt="World Ranks Logo" className="mx-auto" />
      </div>
      <div className="border-secondary bg-primary mx-4 -mt-32 space-y-8 rounded-xl border-1 px-4 py-8">
        <p className="font-semibold">Found {countries.length} countries</p>
        <FilterForm />
      </div>
    </>
  );
}

export default Home;
