import axios from "axios";
import type { AxiosResponse } from "axios";

const AxiosClientUser = axios.create({
  baseURL: `${import.meta.env.VITE_APP_SERVER_URL}/api/v1`,
  withCredentials: true, // Enable sending cookies with requests
});

// AxiosClientUser.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("token="))
//       ?.split("=")[1];

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   }
// );

AxiosClientUser.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      // Handle 401 Unauthorized
      document.cookie =
        "secret=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Remove the cookie
    }

    return Promise.reject(error);
  }
);

export default AxiosClientUser;
