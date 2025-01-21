import axios from "axios";
import { useState } from "react";
import { validar } from "../../helpers/validate";
import styles from './Register.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { toast } from "react-toastify";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        name: "El nombre es requerido",
        email: "El correo es requerido",
        birthdate: "Tu fecha de nacimiento es requerida",
        nDni: "tu numero de identificación es requerido",
        username: "tu usuario es requerido",
        password: "tu contraseña es requerida"
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
        setErrors(validar(form));
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        
        if (Object.keys(errors).length) {
            return toast.error("Ingresa tus datos correctamente");
        }

        try {
            const response = await axios.post("http://localhost:3000/users/register", form);
            const userData = {
                name: response.data.name,
                email: response.data.email,
                birthdate: response.data.birthdate,
                nDni: response.data.nDni,
                username: response.data.credentials.username,
                id: response.data.id,
            };
    
            dispatch(setUser(userData));
            toast.success(`Registro exitoso`);
            navigate("/home");
        } catch (error) {
            toast.error("Error al registrar");
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={handleOnSubmit}>
                <h2 className={styles.formTitle}>REGISTRATE</h2>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Nombre completo</label>
                    <input
                        type="text"
                        value={form.name}
                        name="name"
                        placeholder="Introduce tu nombre"
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Correo electrónico</label>
                    <input
                        type="text"
                        value={form.email}
                        name="email"
                        placeholder="Introduce tu correo electrónico"
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Fecha de nacimiento</label>
                    <input
                        type="date"
                        value={form.birthdate}
                        name="birthdate"
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    {errors.birthdate && <p className={styles.errorMessage}>{errors.birthdate}</p>}
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Número de documento</label>
                    <input
                        type="number"
                        value={form.nDni}
                        name="nDni"
                        placeholder="Ingresa tu número de documento"
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    {errors.nDni && <p className={styles.errorMessage}>{errors.nDni}</p>}
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Nombre de usuario</label>
                    <input
                        type="text"
                        value={form.username}
                        name="username"
                        placeholder="Crea un nombre de usuario"
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    {errors.username && <p className={styles.errorMessage}>{errors.username}</p>}
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>Contraseña</label>
                    <input
                        type="password"
                        value={form.password}
                        name="password"
                        placeholder="Crea tu contraseña"
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
                </div>
                <button className={styles.button}>Crear usuario</button>
                <div className={styles.loginContainer}>
                    <p className={styles.loginText}>¿Ya tienes una cuenta? <a href="/login" className={styles.loginLink}>Inicia sesión</a></p>
                </div>
            </form>
        </div>
    )
}

export default Register;