import api from "./axiosInstance"

export const getAllMenuItems = async (search: string) => {
    const response = await api.get("/menu", {
        params: {
            search
        }
    })
    return response.data
}