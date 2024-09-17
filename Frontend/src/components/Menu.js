import PropTypes from 'prop-types';
import './Menu.css';
import { Link } from 'react-router-dom';
import { Icon } from '@mui/material';
import IconLogin from '@mui/icons-material/Login'; // Corregido nombre
import IconUsers from '@mui/icons-material/People';
import IconLogout from '@mui/icons-material/Logout';

const Menu = ({ menuVisibility, roles }) => {
    const items = [
        {
            key: 'login',
            to: 'login',
            icon: IconLogin, // Corregido nombre
            label: 'Ingresar',
            roles: []
        },
        {
            key: 'user-list',
            to: 'user-list',
            icon: IconUsers,
            label: 'Usuarios',
            roles: ['admin']
        },
        {
            key: 'logout',
            to: 'logout',
            icon: IconLogout,
            label: 'Salir', // Corregido etiqueta
            roles: ['*'], 
        },
    ];

    let filteredItems;
    if (!roles.length) {
        filteredItems = items.filter(item => !item.roles.length);
    } else {
        filteredItems = items.filter(item => item.roles.some(role => role === '*' || roles.includes(role)));
    }

    const lista = filteredItems.map(item =>
        <li key={item.key}>
            <Link to={item.to}>
                <Icon className="icon" component={item.icon} />
            </Link>
        </li>
    );

    return (
        <nav id="mainMenu" style={{ display: menuVisibility ? '' : 'none' }}>
            <ul>{lista}</ul>
        </nav>
    );
}

Menu.propTypes = {
    menuVisibility: PropTypes.bool.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Menu;