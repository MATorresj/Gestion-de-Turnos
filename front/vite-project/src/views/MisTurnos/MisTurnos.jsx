import styles from './MisTurnos.module.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setAppointments } from '../../redux/appointmentsSlice';
import Turno from "../../components/Turno/Turno";
import CrearTurno from '../../components/CrearTurno/CrearTurno';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MisTurnos = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const turnos = useSelector(state => state.appointments);
    const user = useSelector(state => state.user.user);

    const [showTurnos, setShowTurnos] = useState(false);

    useEffect(() => {
        
        if (!user) {
            navigate("/home");
            return;
        }

        axios.get(`http://localhost:3000/users/${user.id}`)
            .then(res => {
                const appointments = res.data.appointments || [];
                dispatch(setAppointments(appointments));
            })
            .catch(error => {
                toast.error('Error al obtener los turnos:', error);
            });
    }, [dispatch, navigate, user]);

    const validarCancelacion = (appointmentDate) => {
        const now = new Date();
        const appointment = new Date(appointmentDate);

        const diff = appointment - now;

        const oneDay = 24 * 60 * 60 * 1000;

        return diff > oneDay;
    };

    const toggleTurnos = () => {
        setShowTurnos(prevState => !prevState);
    };

    return (
        <div className={styles.misTurnosContainer}>
            <h1 className={styles.title}>Mis Turnos</h1>
            <h3 className={styles.subtitle}>Estos son los turnos que tienes agendados:</h3>
            <button onClick={toggleTurnos} className={styles.toggleButton}>
                {showTurnos ? 'Ocultar Turnos' : 'Mostrar Turnos'}
            </button>
            {showTurnos && (
                <div className={styles.turnosList}>
                    {turnos.length > 0 ? (
                        turnos.map((turno) => <Turno key={turno.id} {...turno} validarCancelacion={validarCancelacion}/>)
                    ) : (
                        <p>No hay turnos agendados para este usuario.</p>
                    )}
                </div>
            )}
            <CrearTurno />
        </div>
    );
}

export default MisTurnos;