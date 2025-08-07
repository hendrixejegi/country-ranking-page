const fetchCountriesData = async () => {
  let result: Country[] = [];

  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=cca2,name,population,area,region,subregion,independent,unMember",
    );

    if (!response.ok) {
      throw {
        message: `Request failed with status ${response.status}`,
        status: response.status,
      };
    }

    result = await response.json();
  } catch (error) {
    if (typeof error === "object" && error !== null && "message" in error) {
      const typedError = error as { message: string; status: number };
      console.log(typedError.message);
    } else {
      console.log("Unknown error", error);
    }
  }

  return result;
};

export default fetchCountriesData;
