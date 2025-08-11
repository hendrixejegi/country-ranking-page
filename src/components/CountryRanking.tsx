import { useState, useMemo } from "react";
import Pagination from "./Pagination";
import { useNavigate } from "react-router";
import useScreen from "../hooks/useScreen";

const PageSize = 10;

const CountryRanking = ({ countries }: { countries: Country[] }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return countries.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, countries]);

  const screenWidth = useScreen();

  return (
    <>
      <table className="country-table w-full py-4">
        <thead>
          <tr>
            <th>Flag</th>
            <th>Name</th>
            <th>Population</th>
            {screenWidth > 512 && (
              <th>
                Area(Km<sup>2</sup>)
              </th>
            )}
            {screenWidth > 1024 && <th>Region</th>}
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((country, idx) => (
            <tr
              key={idx}
              className="hover:bg-secondary cursor-pointer"
              onClick={() =>
                navigate(
                  `/country/${country?.name?.official?.replaceAll(" ", "%20").toLowerCase()}`,
                )
              }
            >
              <td>
                <span
                  className={`fi fi-${country?.cca2?.toLowerCase()} rounded-md text-4xl`}
                ></span>
              </td>
              <td>{country?.name?.common}</td>
              <td>{country?.population}</td>
              {screenWidth > 512 && <td>{country?.area}</td>}
              {screenWidth > 1024 && <td>{country?.region}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalCount={countries.length}
        pageSize={PageSize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
};

export default CountryRanking;
