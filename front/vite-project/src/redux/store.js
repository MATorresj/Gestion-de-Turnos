import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from './appointmentsSlice'; 
import { userSlice } from './userSlice';



const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        appointments: appointmentsReducer,
    },
});

export default store;
