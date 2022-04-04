"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const fetchWrapper_1 = require("../fetchWrapper");
const store_1 = require("./store");
require("./Styling/pokemonSpinner.css");
const PokeModal_1 = __importDefault(require("./PokeModal"));
const reactive_button_1 = __importDefault(require("reactive-button"));
class Pokemon extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            openModal: false,
        };
        this.openModal = this.openModal.bind(this);
    }
    componentDidMount() {
        this.loadDetails();
    }
    loadDetails() {
        setTimeout(() => {
            fetchWrapper_1.fetchWrapper.get(this.props.apiLink)
                .then((result) => {
                this.setState({ loading: false });
                store_1.storeExport.dispatch({ type: 'LOAD_DETAILS', details: result, name: this.props.name });
            });
        }, 1000);
    }
    openModal() {
        this.setState(prevState => ({ openModal: !prevState.openModal }));
    }
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    render() {
        if (this.state.loading || this.props.pokemonDetails == undefined) {
            return react_1.default.createElement("div", { className: "center-spinner" },
                react_1.default.createElement("div", { className: "pokemon" }));
        }
        const getImage = this.props.pokemonDetails.sprites.front_default;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "margin-for-pokemon" },
                react_1.default.createElement(reactive_button_1.default, { onClick: () => this.openModal(), idleText: react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("img", { src: getImage }),
                        react_1.default.createElement("div", { className: "pokemonFont" }, this.capitalize(this.props.name))), className: 'style-button-for-pokeImg' })),
            this.state.openModal && react_1.default.createElement(PokeModal_1.default, { pokemonDetails: this.props.pokemonDetails, pokemonName: this.capitalize(this.props.name), isOpen: this.state.openModal, onClose: this.openModal })));
    }
}
const maptStateToProps = (state, getProps) => {
    return {
        pokemonDetails: findDetails(state.results, getProps.name)
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        details: (newData, newName) => { dispatch({ type: 'LOAD_DETAILS', details: newData, name: newName }); }
    };
};
function findDetails(data, name) {
    var pokemonIndex = data.findIndex(x => x.name === name);
    return data[pokemonIndex].specs;
}
const connector = (0, react_redux_1.connect)(maptStateToProps, mapDispatchToProps);
exports.default = connector(Pokemon);
