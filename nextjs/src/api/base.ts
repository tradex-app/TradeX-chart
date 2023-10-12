import axios from "axios";

const baseApiFeUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiFe = axios.create({
  baseURL: baseApiFeUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const nextAPI = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

[apiFe, nextAPI].map((api) =>
  api.interceptors.request.use(
    (config) => {
      const configuration = {
        ...config,
        headers: {
          ...config.headers,
          "x-request-id": "",
        },
      };

      return configuration;
    },
    (error) => {
      return Promise.reject(error);
    }
  )
);

export { apiFe, nextAPI };
