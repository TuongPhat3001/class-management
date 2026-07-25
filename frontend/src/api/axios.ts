import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      console.error("Không thể kết nối tới máy chủ.");
      return Promise.reject(error);
    }

    switch (error.response.status) {
      case 400:
        console.error("Yêu cầu không hợp lệ.");
        break;

      case 401:
        console.error("Bạn chưa đăng nhập.");

        // Nếu có Login
        // window.location.href = "/login";

        break;

      case 403:
        console.error("Không có quyền truy cập.");
        break;

      case 404:
        console.error("Không tìm thấy tài nguyên.");
        break;

      case 500:
        console.error("Lỗi máy chủ.");
        break;

      default:
        console.error("Có lỗi xảy ra.");
    }

    return Promise.reject(error);
  },
);

export default api;
