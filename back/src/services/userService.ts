import { CredentialModel, UserModel } from "../config/data-source";
import IUserDto from "../dtos/IUserDto";
import { Credentials } from "../entities/Credentials";
import { User } from "../entities/User";
import { createCredential } from "./credentialService";

export const getUserService = async (): Promise<User[]> =>{
    const allUsers: User[] = await UserModel.find({relations: ["credentials", "appointments"]});
    return allUsers
}

export const getUserByIdService = async (id: number): Promise<User | null> =>{
    const findUser: User | null = await UserModel.findOne({where: {id}, relations: ["appointments"]})
    if(!findUser) throw Error ("Usuario no encontrado")
    return findUser
}

export const createUserService = async (createUserDTO: IUserDto): Promise<User> => {
    
    const newCredential: Credentials = await createCredential({
        username: createUserDTO.username,
        password: createUserDTO.password
    })
    
    const user: User = UserModel.create({
        ...createUserDTO,
        credentials: newCredential
    })

    const results = await UserModel.save(user)

    newCredential.user = results;
    await CredentialModel.save(newCredential)
    return results
}