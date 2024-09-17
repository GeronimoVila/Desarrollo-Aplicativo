import { Dependency } from "../../libs/dependency.js";
//import {InvalidCredentialError} from "../../libs/"
import { MissinParameterError } from "../../libs/missing_parameter_error.js";
import jwt from "jsonwebtoken";

export class LoginService{
    constructor(){
        this.userService = Dependency.get('userService')
        this.conf = Dependency.get('conf')
    }

    async login(data){
        if(!data?.username){
            throw new MissinParameterError('username')
        }
        if(!data.password){
            throw new MissinParameterError('password')
        }

        const user = await this.userService.getForUsernameOrNull(data.username)
        if(!user){
            throw new InvalidCredentialsError(`No existe el usuario ${data.username}`)
        }

        if (!user.isEnabled) {
            throw new InvalidCredentialsError(`El usuario ${data.username} no tiene permitido acceder al sistmea`)
        }
        
        if (!await this.userService.checkPassword(data.password, user.hashedPassword))
            throw new InvalidCredentialsError(`Contrasena incorrecta`);

        const payload = {
            username: user.username,
            displayName: user.displayName,
            userUuid: user.uuid,
        }

        const token = jwt.sign(payload, this.conf.jwtPassword)
        return{
            autorizationToken: token,
            roles: user.roles?.split(',').map(role => role.trim()) ?? [],
        };
    }
}