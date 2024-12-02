import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      return Promise.reject("No token available");
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest !== "/refresh-token"
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post(
          `/refresh-token`,
          {},
          { withCredentials: true }
        );
        localStorage.setItem("token", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (error) {
        console.error("Refresh token expired or invalid", error);
        localStorage.removeItem("token");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default api;
