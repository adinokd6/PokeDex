import Logo from '../Images/Pokedex_logo.png';
import Switch from "react-switch";

function PokeHeader() {
    return (
        <div>
            <img src={Logo} className="center-logo" />
        </div>
    );
}

export default PokeHeader;