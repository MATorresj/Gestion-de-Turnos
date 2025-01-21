import { useState } from 'react';
import styles from './CrearTurno.module.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment } from '../../redux/appointmentsSlice';
import { toast } from 'react-toastify';

const CrearTurno = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const [formData, setFormData] = useState({
        date: '',
        time: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validarTurno = (date, time) => {
        const [hour, minute] = time.split(':').map(Number);
    
        const seleccionarFecha = new Date(date + 'T00:00:00');
        seleccionarFecha.setMinutes(seleccionarFecha.getMinutes() + seleccionarFecha.getTimezoneOffset());
    
        const tiempoReal = new Date();
        const añoActual = tiempoReal.getFullYear();
        const mesActual = tiempoReal.getMonth();
        const fechaActual = tiempoReal.getDate();
        const horaActual = tiempoReal.getHours();
        const minutoActual = tiempoReal.getMinutes();
    
        const diaDeLaSemana = seleccionarFecha.getDay();
    
        if (diaDeLaSemana === 0 || diaDeLaSemana === 6) {
            return false;
        }
    
        if (seleccionarFecha < new Date(añoActual, mesActual, fechaActual)) {
            return false;
        }
    
        if (hour < 8 || hour >= 20) {
            return false;
        }
    
        if (
            seleccionarFecha.getFullYear() === añoActual &&
            seleccionarFecha.getMonth() === mesActual &&
            seleccionarFecha.getDate() === fechaActual
        ) {
            if (hour < horaActual + 1 || (hour === horaActual + 1 && minute < minutoActual)) {
                return false;
            }
        }
    
        return true;
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.date || !formData.time) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        if (!validarTurno(formData.date, formData.time)) {
            setError('El turno debe ser agendado en un día laborable y dentro del horario de 8 am a 5 pm.')
            return;
        }

        const newAppointment = {
            date: formData.date,
            time: formData.time,
            status: 'active',
            userId: user.id
        };

        axios.post('http://localhost:3000/appointments/schedule', newAppointment)
            .then((response) => {
                dispatch(addAppointment(response.data));
                setFormData({ date: '', time: '' });
                setError('');
                toast.success('Turno creado correctamente.');
            })
            .catch(error => {
                setError('Error al crear el turno. Inténtalo nuevamente.');
                toast.error('Error al crear el turno');
            });
    };

    return (
        <div className={styles.formContainer}>
        <h3>Crear nuevo turno</h3>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <div className={styles.inputContainer}>
                    <label htmlFor="date">Fecha:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label htmlFor="time">Hora:</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button type="submit">Crear Turno</button>
        </form>
    </div>
    );
};

export default CrearTurno;
