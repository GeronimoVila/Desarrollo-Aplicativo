import "./App.css";
import { useState, useEffect } from "react";
import Menu from "./components/Menu.js";
import TopHeader from "./components/TopHeader.js";
import Content from "./components/Content.js";
import ModalMessage from "./components/ModalMessage.js";
import { Api } from "./lib/api.js";

function App() {
    const [menuVisibility, setMenuVisibility] = useState(false);
    const [roles, setRoles] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        Api.setMessageForAutoCheck = setMessage;

        const auth = sessionStorage.getItem('Authorization');
        if (auth) {
            Api.defaultHeaders.Authorization = auth;
            const roles = JSON.parse(sessionStorage.getItem('roles') ?? '[]');
            setRoles(roles);
        } 
    }, []);

    return (
        <div className="App">
            <ModalMessage message={ message } onClose={() => setMessage('')} />
            <TopHeader menuVisibility={ menuVisibility } setMenuVisibility={ setMenuVisibility } />
            <div id="body">
                <Menu menuVisibility={ menuVisibility } roles={ roles } />
                <Content setRoles={ setRoles } />
            </div>
        </div>
    );
}

export default App;