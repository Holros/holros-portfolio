import axios from "axios";
import Cookies from "js-cookie";
import { logout } from "../redux/slice/isLoggedInSlice";
import store from "../redux/store";

declare module "axios" {
  interface AxiosRequestConfig {
    useAuth?: boolean;
  }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const ACCESS_TOKEN_COOKIE_NAME = "ACCESS_TOKEN_COOKIE_NAME";
const REFRESH_TOKEN_COOKIE_NAME = "REFRESH_TOKEN_COOKIE_NAME";

export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    secure: true,
    sameSite: "strict",
    expires: 7,
  });
  Cookies.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    secure: true,
    sameSite: "strict",
    expires: 7,
  });
};

export const removeAuthTokens = () => {
  Cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
  Cookies.remove(REFRESH_TOKEN_COOKIE_NAME);
};

// Add token from cookie to request headers
api.interceptors.request.use((config) => {
  if (config.useAuth !== false) {
    const token = Cookies.get(ACCESS_TOKEN_COOKIE_NAME);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.useAuth !== false
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE_NAME);

        if (!refreshToken) {
          removeAuthTokens();
          store.dispatch(logout());
          return Promise.reject(error);
        }

        const res = await api.post("/auth/refresh", { refreshToken });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          res.data.data;

        // Update cookies
        setAuthTokens(newAccessToken, newRefreshToken);

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        removeAuthTokens();
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
