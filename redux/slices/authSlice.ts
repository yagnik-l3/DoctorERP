import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isLoggedIn: boolean;
    userId: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    userId: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userId = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userId = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
