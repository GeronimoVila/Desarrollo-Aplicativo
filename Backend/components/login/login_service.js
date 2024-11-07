import { Dependency } from "../../libs/dependency.js";
import { MissingParameterError } from "../../libs/missing_parameter_error.js";
import jwt from "jsonwebtoken";
import { InvalidCredentialsError } from "../../libs/invalid_credenctial_error.js";

export class LoginService {
    constructor() {
        this.userService = Dependency.get('userService');
        this.conf = Dependency.get('conf');
    }

    async login(data) {
        if (!data?.username) {
            throw new MissingParameterError('username');
        }
        if (!data.password) {
            throw new MissingParameterError('password');
        }

        const user = await this.userService.getForUsernameOrNull(data.username);
        console.log(user); // Verifica si el usuario fue encontrado

        if (!user) {
            throw new InvalidCredentialsError(`No existe el usuario ${data.username}`);
        }

        if (!user.isEnabled) {
            throw new InvalidCredentialsError(`El usuario ${data.username} no tiene permitido acceder al sistema`);
        }

        const isPasswordCorrect = await this.userService.checkPassword(data.password, user.hashedPassword);
        console.log(isPasswordCorrect); // Verifica si la contraseña es correcta

        if (!isPasswordCorrect) {
            throw new InvalidCredentialsError(`Contraseña incorrecta`);
        }

        const payload = {
            username: user.username,
            displayName: user.displayName,
            userUuid: user.uuid,
        };

        if (!user.isEnabled) {
            console.log(`Usuario ${data.username} deshabilitado.`);
            throw new InvalidCredentialsError(`El usuario ${data.username} no tiene permitido acceder al sistema`);
        }

        console.log(this.conf.jwtPassword); // Verifica si la contraseña JWT está definida
        const token = jwt.sign(payload, this.conf.jwtPassword);
        return {
            authorizationToken: token, // Corregido 'autorizationToken' a 'authorizationToken'
            roles: user.roles?.split(',').map(role => role.trim()) ?? [],
        };
    }
}