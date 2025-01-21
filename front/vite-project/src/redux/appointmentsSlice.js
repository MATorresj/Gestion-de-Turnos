import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: [],
    reducers: {
        setAppointments: (state, action) => action.payload,
        updateAppointment: (state, action) => {
            const updatedAppointment = action.payload;
            return state.map(appointment =>
                appointment.id === updatedAppointment.id ? updatedAppointment : appointment
            );
        },
        removeAppointment: (state, action) => state.filter(appointment => appointment.id !== action.payload),
        addAppointment: (state, action) => [...state, action.payload]
    },
});

export const { setAppointments, updateAppointment, removeAppointment, addAppointment } = appointmentSlice.actions;

export const cancelAppointment = (id) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:3000/appointments/cancel`, { id });
        const { cancelAppointment } = response.data;
        dispatch(updateAppointment(cancelAppointment));
    } catch (error) {
        console.error('Error al cancelar el turno:', error);
    }
};

export default appointmentSlice.reducer;
