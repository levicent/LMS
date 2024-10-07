import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && !originalRequest._retry) {
      // originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("Refresh token", refreshToken);
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/refresh-token`,
          {
            refreshToken,
          }
        );
        localStorage.setItem("token", data.accessToken);
        console.log("Access token refreshed", data.accessToken);
        return api(originalRequest);
      } catch (error) {
        console.error("Refresh token expired or invalid", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default api;
