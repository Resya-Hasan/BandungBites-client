import api from "./axiosInstance";

type LoginPayload = {
    email: string;
    password: string;
}

type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
}

type LoginData = {
    user: User
    accessToken: string
}

type LoginResponse = {
    statusCode: number;
    success: boolean;
    message: string;
    data: LoginData;
}

export const login = async (payload: LoginPayload) => {
    const response = await api.post<LoginResponse>(
        "/auth/login",
        payload
    )

    return response.data;
}