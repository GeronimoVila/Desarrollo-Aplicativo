import { Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types'; // Importamos PropTypes
import Home from './Home.js'; 
import Login from './Login.js';
import UserList from './UserList.js';
import UserForm from './UserForm.js';

const Content = ({ setRoles }) => {
    return (
        <div id="content">
            <Routes> 
                <Route path="home" element={<Home />} />
                <Route path="login" element={<Login setRoles={setRoles} />} />
                <Route path="user-list" element={<UserList />} />
                <Route path="user-form" element={<UserForm />} />
                <Route path="user-form/:uuid" element={<UserForm />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={"No encontrado"} />
            </Routes>
        </div>
    );
}

// Definimos las propTypes para Content
Content.propTypes = {
    setRoles: PropTypes.func.isRequired
};

export default Content;
