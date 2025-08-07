const fetchNeighbor = async (code: string) => {
  let result: Neighbor = {};

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}?fields=cca2,name`,
    );

    if (!response.ok) {
      throw {
        message: `Failed to fetch neighbor with error ${response.status}`,
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

export default fetchNeighbor;
