const fetchCountryData = async (countryName: string) => {
  let result: CountryInfo[] = [];

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fields=cca2,name,population,area,region,subregion,capital,borders,currencies,languages,continents`,
    );

    if (!response.ok) {
      throw {
        message: `Failed to fetch country data with error ${response.status}`,
        status: response.status,
      };
    }

    result = await response.json();
  } catch (error) {
    if (typeof error === "object" && error !== null && "message" in error) {
      const typedError = error as { message: string; status: number };
      console.log(typedError);
    } else {
      console.log("Unknown error", error);
    }
  }

  return result;
};

export default fetchCountryData;
