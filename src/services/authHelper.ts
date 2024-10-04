import api from "./api";

export const getNewAccessToken = async (): Promise<string | null> => {
  try {
    const response = await api.post("/api/refresh-token");
    const { accessToken } = response.data;
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token: ", error);
    return null;
  }
};
