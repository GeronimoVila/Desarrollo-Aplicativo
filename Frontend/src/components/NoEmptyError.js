import Alert from '@mui/material/Alert'; 
import PropTypes from 'prop-types'; // Importa PropTypes

function NoEmptyError({ msg }) {
    if (!msg) {
        return null; // Retorna null si no hay mensaje
    }

    return (
        <Alert severity="error"> {msg} </Alert>
    )
}

// Define las validaciones de las props
NoEmptyError.propTypes = {
    msg: PropTypes.string.isRequired // msg es un string obligatorio
};

export default NoEmptyError;
