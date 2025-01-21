import { useDispatch } from 'react-redux';
import { cancelAppointment } from '../../redux/appointmentsSlice';
import styles from './Turno.module.css';
import { toast } from 'react-toastify';

const Turno = ({ id, date, time, status }) => {

    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(cancelAppointment(id));
        toast.success('Turno cancelado correctamente.');
    }

    const puedeCancelar = () => {
        const fechaTurno = new Date(date + 'T' + time + ':00');
        const fechaActual = new Date();
        const diferenciaDias = (fechaTurno - fechaActual) / (1000 * 60 * 60 * 24);

        return diferenciaDias > 1;
    }

    return (
        <div className={styles.turnoContainer}>
            <h4 className={styles.turnoInfo}>ID: {id}</h4>
            <h4 className={styles.turnoInfo}>Date: {date}</h4>
            <h4 className={styles.turnoInfo}>Time: {time}</h4>
            <h4 className={styles.turnoInfo}>Status: {status}</h4>
            {status !== 'canceled' && (
                puedeCancelar() ? (
                    <button onClick={handleCancel}>Cancelar</button>
                ) : (
                    <p>No se puede cancelar este turno.</p>
                )
            )}
        </div>
    )
}

export default Turno;
