import { CredentialModel } from "../config/data-source";
import ICredentialDto from "../dtos/ICredentialDto";
import { Credentials } from "../entities/Credentials";
import { User } from "../entities/User";

export const createCredential = async(credentialDTO: ICredentialDto) => {
    const newCredential: Credentials = CredentialModel.create(credentialDTO)
    await CredentialModel.save(newCredential)
    return newCredential
};

export const validateCredential = async (credentialDTO: ICredentialDto): Promise<User> =>{
    const {username, password} = credentialDTO

    const foundCredential: Credentials | null = await CredentialModel.findOne({
        where: { username }, 
        relations: ["user"]
    })

    if (!foundCredential || foundCredential.password !== password) {
        throw new Error("Credenciales incorrectas");
    } 
    return foundCredential.user;
}
