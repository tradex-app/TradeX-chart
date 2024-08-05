import axios from "axios";

// Base API URL
const baseApiFeUrl = "http://example.com/api";

// Create axios instance for API FE
const apiFe = axios.create({
  baseURL: baseApiFeUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create axios instance for nextAPI
const nextAPI = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor function to modify the headers
const requestInterceptor = (config) => {
  // You can generate or retrieve "x-request-id" here if needed
  config.headers["x-request-id"] = "some_request_id"; // Replace with your actual x-request-id
  return config;
};

// Error handling function
const errorHandler = (error) => {
  return Promise.reject(error);
};

// Apply the interceptors
[apiFe, nextAPI].forEach((api) => {
  api.interceptors.request.use(requestInterceptor, errorHandler);
});

export { apiFe, nextAPI };
