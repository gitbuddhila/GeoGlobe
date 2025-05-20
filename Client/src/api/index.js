import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    config.baseURL = getBaseUrl();

    try {
      if (!config.headers) {
        config.headers = {};
      }
      console.log("Authorization header set");

      config.validateStatus = (status) => status >= 200 && status < 300;
      console.log("Validate status set");
    } catch (error) {
      console.error(
        "Error setting Authorization header or validateStatus:",
        error
      );
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function getBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.response.use(
  (response) => response,
  function (error) {
    return Promise.reject(error?.response ?? error);
  }
);