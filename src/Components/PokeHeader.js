import Logo from '../Images/Pokedex_logo.png';


function PokeHeader() {
    return (
        <div>
            <img src={Logo} className="center-logo" />
        </div>
    );
}

export default PokeHeader;