import { Request, Response } from "express";
import { createUserService, getUserByIdService, getUserService } from "../services/userService";
import { validateCredential } from "../services/credentialService";
import { User } from "../entities/User";
import { UserModel } from "../config/data-source";



export const getUsers = async (req: Request, res: Response) => {
    try {
        const users: User[] = await getUserService();
        res.status(200).json(users);
    } catch (error) {
        const errorMessage = (error as Error).message || 'Error desconocido';
        res.status(500).json({ message: "Error al obtener los usuarios", error: errorMessage });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user: User | null = await getUserByIdService(Number(id));
        res.status(200).json(user);
    } catch (error) {
        const errorMessage = (error as Error).message || 'Error desconocido';
        res.status(404).json({ message: "Error al obtener el usuario", error: errorMessage });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, birthdate, nDni, username, password } = req.body;
        const newUser: User = await createUserService({ name, email, birthdate, nDni, username, password });
        res.status(201).json(newUser);
    } catch (error) {
        const errorMessage = (error as Error).message || 'Error desconocido';
        res.status(400).json({ message: "Error al crear el usuario", error: errorMessage });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user: User = await validateCredential({ username, password });
        res.status(200).json({
            login: true,
            user,
        });
    } catch (error) {
        const errorMessage = (error as Error).message || 'Error desconocido';
        res.status(400).json({ message: "Error en el login", error: errorMessage });
    }
};


interface MulterRequest extends Request {
    file?: Express.Multer.File;
}
export const updateProfilePicture = async (req: MulterRequest, res: Response) => {
    try {
        const { id } = req.params;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No se ha subido ninguna imagen' });
        }
        const user = await getUserByIdService(Number(id));
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.profilePicture = file.path;
        await UserModel.save(user);
        
        res.status(200).json({ message: 'Imagen actualizada correctamente', user });
    } catch (error) {
        const errorMessage = (error as Error).message || 'Error desconocido';
        res.status(500).json({ message: "Error al actualizar la imagen de perfil", error: errorMessage });
    }
};