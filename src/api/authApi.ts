import api from "./axiosInstance";

type LoginPayload = {
    email: string;
    password: string;
}

type RegisterPayload = {
    name: string;
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

type AuthData = {
    user: User
    accessToken: string
}

type AuthResponse = {
    statusCode: number;
    success: boolean;
    message: string;
    data: AuthData;
}

type LogoutResponse = {
    statusCode: number;
    success: boolean;
    message: string;
}

export const login = async (payload: LoginPayload) => {
    const response = await api.post<AuthResponse>(
        "/auth/login",
        payload
    )

    return response.data;
}

export const register = async (payload: RegisterPayload) => {
    const response = await api.post<AuthResponse>(
        "/auth/register",
        payload
    )

    return response.data
}

export const refreshToken = async () => {
    const response = await api.post<AuthResponse>("/auth/refresh")

    return response.data
}

export const logout = async () => {
    const response = await api.post<LogoutResponse>("/auth/logout")

    return response.data
}