import './TopHeader.css'
import Menu from '@mui/icons-material/Menu';
import PropTypes from 'prop-types'; // Importa PropTypes

const TopHeader = ({ menuVisibility, setMenuVisibility }) => {
    function toggleMenuVisibility() {
        setMenuVisibility(!menuVisibility);
    }

    return (
        <div id="header">
            <Menu className="icon-menu" onClick={toggleMenuVisibility} />
            Curso TUDS- Desarrollo de Aplicativos
        </div>
    );
}

TopHeader.propTypes = {
    menuVisibility: PropTypes.bool.isRequired,
    setMenuVisibility: PropTypes.func.isRequired, 
};

export default TopHeader;