import { Link, useParams } from "react-router-dom";
import IconUser from "@mui/icons-material/Person";
import IconCancel from "@mui/icons-material/Cancel";
import IconSubmit from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { Api } from '../lib/api';

const UserForm = () => {
    const { uuid } = useParams();
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [roles, setRoles] = useState([]);

    function updateRoles(e) {
        const options = [...e.target.selectedOptions];
        const values = options.map(option => option.value);
        setRoles(values);
    }

    function submit(e) {
        e.preventDefault();

        const body = {
            username,
            displayName,
            password,
            isEnabled,
            roles: roles.join(','),
        };

        let method = uuid ? 'PATCH' : 'POST';

        if (uuid) {
            body.uuid = uuid;
        }

        Api.fetch('user', { method, body })
            .then(() => {
                alert('Usuario creado');
            })
            .catch(e => console.error(e));
    }

    useEffect(() => {
        if (!uuid) {
            return;
        }

        Api.get('user', { search: { uuid } })
            .then(res => res.json())
            .then(userList => {
                if (!userList.length) {
                    return;
                }

                const user = userList[0];

                setUsername(user.username ?? '');
                setDisplayName(user.displayName ?? '');
                setIsEnabled(user.isEnabled ?? false);
                setRoles(user.roles?.split(',').map(i => i.trim()).filter(i => i) ?? []);
            })
            .catch(e => console.error(e));
    }, [uuid]);

    return (
        <div id="user" className="form">
            <h2>
                <IconUser className="icon" />
                Usuario
            </h2>
            <form onSubmit={submit}>
                <ul className="fields">
                    <li className="field">
                        <label htmlFor="username">Nombre de usuario</label>
                        <input
                            id="username"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </li>
                    <li className="field">
                        <label htmlFor="displayName">Nombre completo</label>
                        <input
                            id="displayName"
                            name="displayName"
                            value={displayName}
                            onChange={e => setDisplayName(e.target.value)}
                        />
                    </li>
                    <li className="field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </li>
                    <li className="field">
                        <label htmlFor="isEnabled">Habilitado</label>
                        <input
                            id="isEnabled"
                            name="isEnabled"
                            type="checkbox"
                            checked={isEnabled}
                            onChange={e => setIsEnabled(e.target.checked)}
                        />
                    </li>
                    <li className="field">
                        <label htmlFor="roles">Roles</label>
                        <select
                            id="roles"
                            name="roles"
                            multiple
                            value={roles}
                            onChange={updateRoles}
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </li>
                    <li>
                        <button type="submit">
                            <IconSubmit className="icon submit" /> Enviar
                        </button>
                        <Link to={-1}>
                            <button>
                                <IconCancel className="icon cancel" /> Cancelar
                            </button>
                        </Link>
                    </li>
                </ul>
            </form>
        </div>
    );
}

export default UserForm;
