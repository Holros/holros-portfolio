import axios from "axios";
import Cookies from "js-cookie";

declare module "axios" {
  interface AxiosRequestConfig {
    useAuth?: boolean;
  }
}

const api = axios.create({
  baseURL: "https://holros-portfolio-server.up.railway.app/api",
  // withCredentials: true, //for sending and recieving cookie from backend
});

const TOKEN_COOKIE_NAME = "auth_token";

export const setAuthToken = (token: string) => {
  Cookies.set(TOKEN_COOKIE_NAME, token, {
    secure: true,
    sameSite: "strict",
    expires: 7,
  });
};

export const removeAuthToken = () => {
  Cookies.remove(TOKEN_COOKIE_NAME);
};

// Add token from cookie to request headers
api.interceptors.request.use((config) => {
  if (config.useAuth !== false) {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
