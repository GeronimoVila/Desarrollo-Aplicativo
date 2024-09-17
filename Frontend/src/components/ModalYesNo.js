import './ModalMessage.css';
import Alert from '@mui/material/Alert'; 
import PropTypes from 'prop-types'; // Importa PropTypes

function ModalYesNo({ message, show, onYes, onNo }) {
    if (!show) {
        return null; // Retorna null si show es false
    }

    onYes ||= () => {}; // Función predeterminada para onYes si no es proporcionada
    onNo ||= () => {}; // Función predeterminada para onNo si no es proporcionada

    return (
        <div className='modal background'>
            <div className='window'>
                <Alert severity="error"> {message} </Alert>
                <button onClick={onYes}>Si</button>
                <button onClick={onNo}>No</button>
            </div>
        </div>
    )
}

// Define las validaciones de las props
ModalYesNo.propTypes = {
    message: PropTypes.string.isRequired, // message es un string obligatorio
    show: PropTypes.bool.isRequired, // show es un booleano obligatorio
    onYes: PropTypes.func, // onYes es una función
    onNo: PropTypes.func // onNo es una función
};

export default ModalYesNo;