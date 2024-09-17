import './ModalMessage.css';
import Alert from '@mui/material/Alert'; 
import PropTypes from 'prop-types'; // Importa PropTypes

function ModalMessage({ message, onClose }) {
    if (!message) {
        return null; // Retorna null si no hay mensaje
    }

    onClose ||= () => {}; // Función por defecto para onClose si no es proporcionada

    return (
        <div className='modal background'>
            <div className='window'>
                <Alert severity="error"> {message} </Alert>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    )
}

// Define las validaciones de las props
ModalMessage.propTypes = {
    message: PropTypes.string.isRequired, // message es un string obligatorio
    onClose: PropTypes.func // onClose es una función
};

export default ModalMessage;
