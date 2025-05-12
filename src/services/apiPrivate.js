import axios from "axios";
import { getAccessToken, setAccessToken } from "./authService";

const apiPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

apiPrivate.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(`${import.meta.env.VITE_API_URL}/refresh-token`, null, {
          withCredentials: true,
        });

        const newAccessToken = refreshResponse.data.token;
        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiPrivate(originalRequest);
      } catch (refreshError) {
        console.error("Error al renovar el token:", refreshError);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiPrivate;