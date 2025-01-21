import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { logout } from "../../redux/userSlice";
import logo from "../../assets/logoNombre.png";
import defaultPerfil from "../../assets/defaultPerfil.png";
import axios from "axios";
import styles from './NavBar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(defaultPerfil);

    useEffect(() => {
        if (user && user.profilePicture) {
            setProfileImage(`http://localhost:3000/${user.profilePicture}`);
        } else {
            setProfileImage(defaultPerfil);
        }
    }, [user]);

    const handleProfileClick = () => {
        setMenuVisible(!menuVisible);
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profilePicture', file);

            try {
                const response = await axios.post(`http://localhost:3000/users/${user.id}/profile-picture`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const newProfilePicture = response.data.user.profilePicture;
                setProfileImage(`http://localhost:3000/${newProfilePicture}`);
                toast.success("Foto de perfil actualizada con éxito");
            } catch (error) {
                toast.error("Error al actualizar la foto de perfil");
            }
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        setMenuVisible(false);
        setProfileImage(defaultPerfil);
        navigate("/login");
        toast.success("Cerraste sesión con éxito");
    };

    return (
        <div className={styles.navContainer}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Logo" />
            </div>
            <div className={styles.navLinks}>
                <Link to="/home">
                    <span>HOME</span>
                </Link>
                {user && (
                    <Link to="/appointments">
                        <span>MIS TURNOS</span>
                    </Link>
                )}
                <Link to="/aboutus">
                    <span>SOBRE NOSOTROS</span>
                </Link>
                <Link to="/contactus">
                    <span>CONTACTO</span>
                </Link>
            </div>
            <div className={styles.searchContainer}>
                <input type="text" placeholder="Buscar..." />
                <button>🔎</button>
            </div>
            <div className={styles.profileContainer}>
                <div className={styles.profile} onClick={handleProfileClick}>
                    <img src={profileImage} alt="Perfil" />
                    <span>PERFIL</span>
                </div>
                {menuVisible && (
                    <div className={styles.profileMenu}>
                        {user ? (
                            <>
                                <button onClick={handleLogout}>Cerrar sesión</button>
                                <label className={styles.uploadButton}>
                                    Cambia tu foto
                                    <input
                                        type="file"
                                        id="upload-photo"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                            </>
                        ) : (
                            <Link to="/login">
                                <button>Iniciar sesión</button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
