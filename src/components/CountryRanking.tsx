"use server";

const CountryRanking = ({ countries }: { countries: Country[] }) => {
  return (
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
        {countries.map((country, idx) => (
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
  );
};

export default CountryRanking;
