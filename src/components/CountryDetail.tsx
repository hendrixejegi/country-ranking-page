import { useState, useEffect } from "react";
import { useParams } from "react-router";
import fetchCountryData from "../api/fetchCountry";
import fetchNeighbor from "../api/fetchNeighbor";
import { Link } from "react-router";

const CountryDetail = () => {
  const { slug } = useParams();

  const [country, setCountry] = useState<CountryInfo>({});
  const [neighbors, setNeighbors] = useState<Neighbor[]>([]);

  useEffect(() => {
    const getCountry = async () => {
      const data = await fetchCountryData(slug!);
      setCountry(data[0]);
    };
    getCountry();
  }, [slug]);

  useEffect(() => {
    const getNeighbors = async () => {
      if (!country || !country.borders?.length) return;

      const promises = country.borders.map((code) => fetchNeighbor(code));
      const results = await Promise.all(promises);
      setNeighbors(results);
    };

    getNeighbors();
  }, [country]);

  const renderLanguages = (obj: Languages) => {
    return Object.values(obj).join(", ");
  };

  const renderCurrency = (obj: CurrencyType) => {
    return Object.entries(obj).length > 0
      ? obj[Object.keys(obj)[0]]?.name
      : "No Currency";
  };

  return (
    <>
      <div className="hover:text-highlight absolute top-8 left-8 font-semibold lg:fixed">
        <Link to={"/"}>&#8592; Back to Home</Link>
      </div>
      <div className="border-b-secondary space-y-8 border-b-1 p-12">
        <div className="mx-auto -mt-20 w-fit">
          <span
            className={`fi fi-${country?.cca2?.toLowerCase()} rounded-md text-[176px]`}
          ></span>
        </div>
        <hgroup className="space-y-2 text-center">
          <h1 className="text-4xl font-bold">{country?.name?.common}</h1>
          <p>{country?.name?.official}</p>
        </hgroup>
        <div className="flex items-center justify-center gap-10">
          <div className="bg-secondary flex flex-col items-center gap-4 rounded-xl px-4 py-2 md:flex-row">
            <div>Population</div>
            <div className="bg-primary hidden h-8 w-px md:block"></div>
            <div>{country?.population?.toLocaleString()}</div>
          </div>
          <div className="bg-secondary flex flex-col items-center gap-4 rounded-xl px-4 py-2 md:flex-row">
            <div>
              Area (km<sup>2</sup>)
            </div>
            <div className="bg-primary hidden h-8 w-px md:block"></div>
            <div>{country?.area?.toLocaleString()}</div>
          </div>
        </div>
      </div>
      <div className="border-b-secondary flex items-center justify-between border-b-1 p-6">
        <div>Capital</div>
        <div>
          {(country?.capital?.length ?? 0 > 0)
            ? country?.capital
            : "No Capital"}
        </div>
      </div>
      <div className="border-b-secondary flex items-center justify-between border-b-1 p-6">
        <div>Subregion</div>
        <div>{country?.subregion ? country.subregion : "No Subregion"}</div>
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
      <div className="space-y-8 p-6">
        <div>Neighboring Countries</div>

        {neighbors.length > 0 ? (
          <div className="flex flex-wrap items-center gap-8">
            {neighbors.map((neighbor, idx) => (
              <div
                key={idx}
                className="transition-all duration-150 hover:scale-[1.1]"
              >
                <Link
                  to={`/country/${neighbor?.name?.official?.replaceAll(" ", "%20").toLowerCase()}`}
                  onClick={() =>
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    })
                  }
                >
                  <span
                    className={`fi fi-${neighbor?.cca2?.toLowerCase()} rounded-md text-6xl`}
                  ></span>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No Neighboring Country</p>
        )}
      </div>
    </>
  );
};

export default CountryDetail;
