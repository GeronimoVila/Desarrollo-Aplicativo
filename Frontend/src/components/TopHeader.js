import './TopHeader.css'
import Menu from '@mui/icons-material/Menu';

const TopHeader = ({menuVisibility, setMenuVisibility}) => {
    function toggleMenuVisibility() {
        setMenuVisibility(!menuVisibility)
    }

    return (
        <div id="header">
            <Menu className="icon-menu" onClick={ toggleMenuVisibility }/>
            Curso TUDS- Desarrollo de Aplicativos
        </div>
    )
}

export default TopHeader