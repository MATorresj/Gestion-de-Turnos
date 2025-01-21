import styles from './AboutUs.module.css';
import logo from '../../assets/logoNombre.png';

const AboutUs = () => {
    return (
        <div className={styles.container}>
            
            <section className={styles.content}>
            <div className={styles.header}>
                <img src={logo} alt="Salud y Vida" className={styles.logo} />
            </div>
                <h2>¿Quiénes somos?</h2>
                <p>
                    En <strong>Salud y Vida</strong>, nuestro objetivo es ofrecerte una atención médica de calidad y personalizada. Somos un centro médico dedicado a facilitar el agendamiento de turnos para citas presenciales, asegurando que puedas recibir la atención que necesitas sin complicaciones.
                </p>
                <h2>Nuestra Misión</h2>
                <p>
                    Nuestra misión es brindarte una experiencia de atención médica fluida y accesible. Trabajamos continuamente para mejorar nuestros servicios y ofrecerte la mejor atención posible.
                </p>
                <h2>¿Por qué elegirnos?</h2>
                <ul>
                    <li>Profesionales altamente capacitados</li>
                    <li>Facilidad en el agendamiento de citas</li>
                    <li>Atención personalizada y de calidad</li>
                </ul>
            </section>
        </div>
    );
};

export default AboutUs;