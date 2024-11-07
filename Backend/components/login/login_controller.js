import { Dependency } from "../../libs/dependency.js";

export class LoginController {
    constructor() {
        this.loginService = Dependency.get('loginService');
    }

    async post(req, res) {
        try {

            if (!req.body || !req.body.username || !req.body.password) {
                return res.status(400).send({ error: 'Faltan parámetros necesarios: username o password' });
            }

            const result = await this.loginService.login(req.body);
            res.json(result); 
        } catch (error) {
            console.error('Error en LoginController:', error); 
            res.status(500).send({ error: 'Error interno del servidor' });
        }
    }
}