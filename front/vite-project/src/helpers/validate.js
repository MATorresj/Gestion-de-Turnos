export const validar = (input) => {
    const errors = {};
    
    const letrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    const numberRegex = /^\d+$/;
    const alphanumericRegex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s!@#$%^&*(),.?":{}|<>]+$/;

    if (!letrasRegex.test(input.name)) errors.username = "Debes poner tu nombre real";
    if (!emailRegex.test(input.email)) errors.email = "La dirección de correo no es valida";
    if (!fechaRegex.test(input.birthdate)) errors.birthdate = "La fecha de nacimiento no es valida";
    if (!numberRegex.test(input.nDni)) errors.nDni = "Ingresa tu identificación real";
    if (!alphanumericRegex.test(input.username)) errors.username = "El nombre de usuario no es valido";
    if (!alphanumericRegex.test(input.password)) errors.password = "La contraseña no es valida";
    
    
    return errors
}

export const validarLogin = (input) => {
    const errors = {};
    const alphanumericRegex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s!@#$%^&*(),.?":{}|<>]+$/;

    if (!input.username) {
        errors.username = "El nombre de usuario es requerido";
    } else if (!alphanumericRegex.test(input.username)) {
        errors.username = "El nombre de usuario no es válido";
    }

    if (!input.password) {
        errors.password = "La contraseña es requerida";
    } else if (!alphanumericRegex.test(input.password)) {
        errors.password = "La contraseña no es válida";
    }

    return errors;
}


