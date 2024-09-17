import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Api } from "../lib/api";
import {SvgIcon} from "@mui/material";
import IconUsers from "@mui/icons-material/People";
import IconAdd from "@mui/icons-material/AddCircle";
import IconEdit from "@mui/icons-material/Edit";
import IconDelete from "@mui/icons-material/Delete";
import IconEnable from "@mui/icons-material/CheckCircle";
import IconDisable from "@mui/icons-material/Cancel";
import IconEnabled from "@mui/icons-material/Check";
import IconDisabled from "@mui/icons-material/Clear";
import ModalYesNo from "./ModalYesNo";

const UserList = () => {
    const [filas, setFilas] = useState([]);
    const [ShowDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deletingUuid, setDeletingUuid] = useState('');

    useEffect (() => {
        Api.get('user')
            .then(res => res.json())
            .then(userList => {
                if (!userList?.map) {
                    return []
                }

                setFilas (userList?.map(user => {
                    var check,
                        enabled,
                        color;
                    
                    if (user.isEnabled){
                        check = IconDisable;
                        enabled = IconEnabled;
                        color = 'success';
                    } else {
                        check = IconEnable;
                        enabled = IconDisabled;
                        color = 'error';
                    }

                    return (
                        <tr>
                            <td>{user.username}</td>
                            <td>{user.displayName}</td>
                            <td className="center"><SvgIcon className={ color + "icon"} component={ enabled } /></td>
                            <td>{user.roles}</td>
                            <td className="actions">
                                <a href="/user"><SvgIcon className="icon button" component={ check } /></a>
                                <Link to={'/user-form/' + user.uuid}><IconEdit className="icon button" /></Link>
                                <a href="#" onClick={e => deleteUser(e, user.uuid)}><IconDelete className="icon button" /></a>
                            </td>
                        </tr>
                    );
                }));
            })
            .catch ( e => {} );
        }, []);

        function deleteUser(e, uuid) {
            e.preventDefault();
            setDeletingUuid(uuid);
            setShowDeleteConfirmation(true);
        }

        function deleteCurrentUserUuid() {
            setShowDeleteConfirmation (false);
            Api.delete('user', {search: {uuid: deletingUuid}})
                .then(() => {
                    alert('Usuarios eliminado');
                })
                .catch(e => {})
        }

    return (
        <div>
            <ModalYesNo 
            message="¿Desea eliminar el usuario?"
            show={ShowDeleteConfirmation} 
            onYes={deleteCurrentUserUuid} 
            onNo={() => setShowDeleteConfirmation(false)}/>
            <table className="table-data-list">
                <caption>
                    <IconUsers className="icon" />
                    Usuarios
                    <Link to="/user-form" ><IconAdd className="icon button" alt="Agregar" title="Agregar usuario" /></Link>
                </caption>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Habilitado</th>
                        <th>Roles</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filas}
                </tbody>
            </table>
        </div>
    )
}

export default UserList