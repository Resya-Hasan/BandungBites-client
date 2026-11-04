import axios, { type InternalAxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

let getAccessToken: () => string | null = () => null;
let onRefreshSuccess: (token: string) => void = () => { };
let onRefreshFailed: () => void = () => { };

export const setAuthHandlers = (handlers: {
    getAccessToken: () => string | null;
    onRefreshSuccess: (token: string) => void;
    onRefreshFailed: () => void;
}) => {
    getAccessToken = handlers.getAccessToken;
    onRefreshSuccess = handlers.onRefreshSuccess;
    onRefreshFailed = handlers.onRefreshFailed;
};

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Request interceptor
api.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Refresh token request menggunakan Axios terpisah
const refreshClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

type RetryConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
};

let refreshPromise: Promise<string> | null = null;

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as RetryConfig | undefined;

        if (!originalRequest || error.response?.status !== 401) {
            return Promise.reject(error);
        }

        const message = error.response.data?.message;

        // Hanya refresh jika accessToken memang expired
        if (message !== "Access token expired") {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            if (!refreshPromise) {
                refreshPromise = refreshClient
                    .post("/auth/refresh")
                    .then((response) => {
                        const payload = response.data.data ?? response.data;
                        const newAccessToken = payload.accessToken;

                        if (!newAccessToken) {
                            throw new Error("Access token not found");
                        }

                        return newAccessToken;
                    });
            }

            const newAccessToken = await refreshPromise;

            onRefreshSuccess(newAccessToken);

            originalRequest.headers.set(
                "Authorization",
                `Bearer ${newAccessToken}`
            );

            return api(originalRequest);
        } catch (refreshError) {
            const status = axios.isAxiosError(refreshError)
                ? refreshError.response?.status
                : undefined;

            // Logout hanya jika refresh token ditolak backend
            if (status === 401 || status === 403) {
                onRefreshFailed();
            }

            return Promise.reject(refreshError);
        } finally {
            refreshPromise = null;
        }
    }
);

export default api;