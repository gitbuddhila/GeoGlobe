import axios from "axios";

export const fetchAllCountries = async () => {
  try {
    const response = await axios.get("/v3.1/all");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch countries");
  }
};

export const fetchCountryByCode = async (code) => {
  try {
    const response = await axios.get(`/v3.1/alpha/${code}`);
    return response.data[0];
  } catch (error) {
    throw new Error("Failed to fetch country");
  }
};
export const fetchCountryByName = async (name) => {
  try {
    const response = await axios.get(`/v3.1/name/${name}`);
    return response.data; // Return all countries that match the search term
  } catch (error) {
    throw new Error("Failed to fetch country");
  }
};

export const fetchCountryByregion = async (selectedRegion) => {
  try {
    const response = await axios.get(`/v3.1/region/${selectedRegion}`);
    return response.data; // Return all countries that match the search term
  } catch (error) {
    throw new Error("Failed to fetch country");
  }
};



export const fetchPopularCountries = async (limit = 8) => {
  try {
    const response = await axios.get("/v3.1/all");
    const sorted = response.data
      .sort((a, b) => b.population - a.population)
      .slice(0, limit)
      .map((country) => ({
        name: country.name.common,
        flag: country.flags?.png,
      }));
    return sorted;
  } catch (error) {
    throw new Error("Failed to fetch popular countries");
  }
};
