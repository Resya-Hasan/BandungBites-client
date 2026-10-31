import axios from "axios"

let getAccessToken: () => string | null = () => null

export const setAccessTokenGetter = (
    getter: () => string | null
) => {
    getAccessToken = getter
};

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials:true,
})

api.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    });

export default api