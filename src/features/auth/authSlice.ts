import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { refreshToken } from "../../api/authApi";
import type { RootState } from "../../store/store"

type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
}

type AuthState = {
    user: User | null;
    accessToken: string | null;
    status: "idle" | "loading" | "authenticated" | "unauthenticated";
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    status: "idle",
}

export const refreshSession = createAsyncThunk(
    "auth/refreshSession",
    async () => {
        const data = await refreshToken();
        return data;
    },
    {
        condition: (_, { getState }) => {
            const state = getState() as RootState;

            return state.auth.status === "idle"
        }
    }
)

const authSlice = createSlice({
    name: "auth", // <---  The name of the slice
    initialState, // <---  initial data on the slice
    reducers: { // <-- A reducer is a place within a slice where functions for modifying data are stored.
        setCredentials: ( // <-- example of a data modification function
            state, // <-- the state auth currently being managed by Redux
            action: PayloadAction<{ // <-- instructions sent along with the necessary data
                user: User;
                accessToken: string
            }>
        ) => {
            state.user = action.payload.user; // action.payload is the data sent along with the instructions to modify the state
            state.accessToken = action.payload.accessToken;
            state.status = "authenticated";
        },

        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.status = "unauthenticated";
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(refreshSession.pending, (state) => {
                state.status = "loading";
            })

            .addCase(refreshSession.fulfilled, (state, action) => {
                state.user = action.payload.data.user;
                state.accessToken = action.payload.data.accessToken;
                state.status = "authenticated";
            })

            .addCase(refreshSession.rejected, (state) => {
                state.user = null;
                state.accessToken = null;
                state.status = "unauthenticated";
            })
    }
});

export const { setCredentials, logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;