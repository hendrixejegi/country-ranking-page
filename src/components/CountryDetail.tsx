import { useState, useEffect } from "react";
import { useParams } from "react-router";
import fetchCountryData from "../api/fetchCountry";

const CountryDetail = () => {
  const { slug } = useParams();

  const [country, setCountry] = useState<CountryInfo>({});

  useEffect(() => {
    const getCountry = async () => {
      const data = await fetchCountryData(slug!);
      setCountry(data[0]);
    };
    getCountry();
  }, [slug]);

  useEffect(() => console.log(country), [country]);

  const renderLanguages = (obj: Languages) => {
    return Object.values(obj).join(", ");
  };

  const renderCurrency = (obj: CurrencyType) => {
    return obj[Object.keys(obj)[0]]?.name;
  };

  return (
    <>
      <div className="border-b-secondary space-y-8 border-b-1 p-12">
        <div className="mx-auto -mt-20 w-fit">
          <span
            className={`fi fi-${country?.cca2?.toLowerCase()} rounded-md text-[192px]`}
          ></span>
        </div>
        <hgroup className="space-y-2 text-center">
          <h1 className="text-4xl font-bold">{country?.name?.common}</h1>
          <p>{country?.name?.official}</p>
        </hgroup>
        <div className="flex items-center justify-center gap-10">
          <div className="bg-secondary flex items-center rounded-xl px-4 py-2">
            <div>Population</div>
            <div className="bg-primary mx-4 h-8 w-px"></div>
            <div>{country?.population?.toLocaleString()}</div>
          </div>
          <div className="bg-secondary flex items-center rounded-xl px-4 py-2">
            <div>
              Area (km<sup>2</sup>)
            </div>
            <div className="bg-primary mx-4 h-8 w-px"></div>
            <div>{country?.area?.toLocaleString()}</div>
          </div>
        </div>
      </div>
      <div className="border-b-secondary flex items-center justify-between border-b-1 p-6">
        <div>Capital</div>
        <div>{country?.capital}</div>
      </div>
      <div className="border-b-secondary flex items-center justify-between border-b-1 p-6">
        <div>Subregion</div>
        <div>{country?.subregion}</div>
      </div>
      <div className="border-b-secondary flex items-center justify-between border-b-1 p-6">
        <div>Language</div>
        <div>{renderLanguages(country?.languages ?? {})}</div>
      </div>
      <div className="border-b-secondary flex items-center justify-between border-b-1 p-6">
        <div>Currencies</div>
        <div>{renderCurrency(country?.currencies ?? {})}</div>
      </div>
      <div className="border-b-secondary flex items-center justify-between border-b-1 p-6">
        <div>Continents</div>
        <div>{country?.continents?.join(", ")}</div>
      </div>
    </>
  );
};

export default CountryDetail;
