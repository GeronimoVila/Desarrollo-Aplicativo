import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import NoEmptyError from './NoEmptyError';
import { Api } from '../lib/api';
import IconLogin from '@mui/icons-material/Login';
import IconCancel from '@mui/icons-material/Cancel';
import IconSubmit from '@mui/icons-material/Send';

const Login = ({ setRoles }) => {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function handleLogin(evt) {
        evt.preventDefault();
        setError('');

        const data = {
            username: evt.target.username.value,
            password: evt.target.password.value,
        };

        console.log('Username:', data.username);
        console.log('Password:', data.password);

        Api.post('login', { body: data, autoCheck: false })
            .then(json => { 
                if (json.error) {
                    setError(json.message);
                } else {
                    const auth = 'Bearer ' + json.authorizationToken;
                    const roles = json.roles || [];
                    const userUuid = json.uuid;

                    // Guardar datos en localStorage
                    localStorage.setItem('Authorization', auth);
                    localStorage.setItem('roles', JSON.stringify(roles));
                    localStorage.setItem('uuid', userUuid);

                    // Configurar encabezado de autorización
                    Api.defaultHeaders.Authorization = auth;
                    setRoles(roles);
                    navigate('/home');
                }
            })
            .catch(e => {
                if (e.message) {
                    setError(e.message);
                } else {
                    setError(String(e));
                }
            });
    }

    return (
        <div id="login" className="form">
            <h2>
                <IconLogin className="icon" />
                Ingreso al sistema
            </h2>
            <NoEmptyError msg={error} />
            <form onSubmit={handleLogin}>
                <ul className="fields">
                    <li className="field">
                        <label htmlFor="username">Nombre de usuario</label>
                        <input id="username" name="username" required></input> {/* Añadido required */}
                    </li>
                    <li className="field">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            id="password" 
                            name="password" 
                            type={showPassword ? 'text' : 'password'} 
                            required 
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="toggle-password"
                        >
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </li>
                    <li className='field center'>
                        <button type="submit">
                            <IconSubmit className="icon submit" />Login
                        </button>
                        <Link to='/home'>
                            <button type="button">
                                <IconCancel className="icon cancel" />Cancelar
                            </button>
                        </Link>
                    </li>
                </ul>
            </form>
        </div>
    );
}

Login.propTypes = {
    setRoles: PropTypes.func.isRequired,
};

export default Login;