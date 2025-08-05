import { useState, useMemo } from "react";
import Pagination from "./Pagination";

const PageSize = 10;

const CountryRanking = ({ countries }: { countries: Country[] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return countries.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, countries]);

  return (
    <>
      <table className="country-table w-full py-4">
        <thead>
          <tr>
            <th>Flag</th>
            <th>Name</th>
            <th>Population</th>
            <th>
              Area(Km<sup>2</sup>)
            </th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((country, idx) => (
            <tr key={idx}>
              <td>
                <span
                  className={`fi fi-${country.cca2.toLowerCase()} rounded-md text-4xl`}
                ></span>
              </td>
              <td>{country?.name?.common}</td>
              <td>{country?.population}</td>
              <td>{country?.area}</td>
              <td>{country?.region}</td>
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
