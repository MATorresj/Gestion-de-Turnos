import axios from "axios"
import styles from './Login.module.css';
import { setUser } from "../../redux/userSlice";
import { useState } from "react"
import {validarLogin} from "../../helpers/validate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
    const [form, setForm] = useState({
        username: "",
        password: ""
})

const [errors, setErrors] = useState({
    username: "tu usuario es requerido",
    password: "tu contraseña es requerido"
})

const dispatch = useDispatch();
const navigate = useNavigate();


const handleInputChange = (event) => {
    const {name, value} = event.target;
        setForm({
            ...form,
            [name]: value
        })
    setErrors(validarLogin({...form, [name]: value}))
}

const handleOnSubmit = async (event) => {
    event.preventDefault();
    
    if(Object.values(errors).some(error => error)) {
        return toast.error("Usuario o contraseña incorrecto")
    }
    try {
        const response = await axios.post("http://localhost:3000/users/login", form);

        if (response.data.login) {
            dispatch(setUser(response.data.user))
            toast.success("Iniciaste sesión con exito", response.data);
            navigate("/home");
        } else {
            toast.error("Usuario o contraseña incorrecto")
        }
    } catch (error) {
        toast.error("Error iniciar sesión");
    }
}



return (
    <div className={styles.container}>
        <form className={styles.formContainer} onSubmit={handleOnSubmit}>
            <h2 className={styles.formTitle}>INICIAR SESIÓN</h2>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Nombre de usuario</label>
                <input
                    type="text"
                    value={form.username}
                    name="username"
                    placeholder="Introduce tu nombre de usuario"
                    onChange={handleInputChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Contraseña</label>
                <input
                    type="password"
                    value={form.password}
                    name="password"
                    placeholder="Introduce tu contraseña"
                    onChange={handleInputChange}
                    className={styles.input}
                />
            </div>
            <button className={styles.button}>Iniciar sesión</button>
            <div className={styles.registerContainer}>
                <p className={styles.registerText}>¿Aún no tienes cuenta? <a href="/register" className={styles.registerLink}>Crea una</a></p>
            </div>
        </form>
    </div>
)
}

export default Login;