import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    userAppointments: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserAppointments: (state, action) => {
            state.userAppointments = action.payload;
        },
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    },
});

export const { setUser, setUserAppointments, login, logout } = userSlice.actions;