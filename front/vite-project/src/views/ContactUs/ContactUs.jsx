import { useState } from 'react';
import styles from './ContactUs.module.css';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Tu mensaje ha sido enviado. ¡Gracias por contactarnos!');
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Contáctanos</h1>
            </div>
            <section className={styles.infoSection}>
                <h2>¿Necesitas ayuda?</h2>
                <p>
                    Si tienes alguna pregunta o necesitas asistencia, por favor, completa el formulario a continuación. Nuestro equipo de atención al cliente estará encantado de ayudarte.
                </p>
                <p>También puedes contactarnos directamente a través de los siguientes medios:</p>
                <ul className={styles.contactList}>
                    <li>Email: <a href="mailto:contacto@saludyvida.com">contacto@saludyvida.com</a></li>
                    <li>Teléfono: <a href="tel:+123456789">+1 (234) 567-89</a></li>
                    <li>Dirección: Calle Ejemplo 123, Ciudad, País</li>
                </ul>
            </section>
            <section className={styles.formSection}>
                <h2>Envíanos un mensaje</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Introduce tu nombre"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Correo electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Introduce tu correo electrónico"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message">Mensaje:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Escribe tu mensaje"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Enviar Mensaje</button>
                </form>
            </section>
        </div>
    );
};

export default ContactUs;

