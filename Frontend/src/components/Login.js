import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types'; // Importamos prop-types
import NoEmptyError from './NoEmptyError';
import { Api } from '../lib/api';
import IconLogin from '@mui/icons-material/Login';
import IconCancel from '@mui/icons-material/Cancel';
import IconSubmit from '@mui/icons-material/Send';

const Login = ({ setRoles }) => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleLogin(evt) {
        evt.preventDefault();
        setError('');

        const data = {
            username: evt.target.username.value,
            password: evt.target.password.value,
        };

        Api.post('login', { body: data, autoCheck: false })
            .then(res => res.json())
            .then(json => {
                if (json.error) {
                    setError(json.message);
                } else {
                    const auth = 'Bearer ' + json.authorizationToken;
                    const roles = json.roles || [];

                    sessionStorage.setItem('Authorization', auth);
                    sessionStorage.setItem('roles', JSON.stringify(roles));

                    Api.defaultHeaders.headers.Authorization = auth;
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
                        <input id="username" name="username"></input>
                    </li>
                    <li className="field">
                        <label htmlFor="password">Contraseña</label>
                        <input id="password" name="password" type="password"></input>
                    </li>
                    <li className='field center'>
                        <button type="submit"><IconSubmit className="icon submit" />Login</button>
                        <Link to='/home'><button type="button"><IconCancel className="icon cancel" />Cancelar</button></Link>
                    </li>
                </ul>
            </form>
        </div>
    );
}

// Añadimos la validación de prop-types para setRoles
Login.propTypes = {
    setRoles: PropTypes.func.isRequired,
};

export default Login;
