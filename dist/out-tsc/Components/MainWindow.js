"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./Styling/style.css");
const React = __importStar(require("react"));
const styled_components_1 = require("styled-components");
const globalStyles_1 = require("./globalStyles");
const Themes_1 = require("./Themes");
const fetchWrapper_1 = require("../fetchWrapper");
const store_1 = require("./store");
const react_redux_1 = require("react-redux");
const lodash_1 = __importDefault(require("lodash"));
const Pokemon_1 = __importDefault(require("./Pokemon"));
const reactive_button_1 = __importDefault(require("reactive-button"));
const Pokedex_logo_png_1 = __importDefault(require("../Images/Pokedex_logo.png"));
class MainWindow extends React.Component {
    constructor(props) {
        super(props);
        this.mainApiUrl = "https://pokeapi.co/api/v2/pokemon";
        this.themeToggler = () => {
            this.state.theme === 'light' ? this.setState({ theme: 'dark' }) : this.setState({ theme: 'light' });
        };
        this.state = {
            theme: 'light',
            loading: true,
            loadNext: 'idle',
            searchName: ""
        };
    }
    componentDidMount() {
        this.loadPokemonList();
    }
    loadPokemonList() {
        fetchWrapper_1.fetchWrapper.get(this.mainApiUrl)
            .then((data) => {
            this.setState({ loading: false });
            store_1.storeExport.dispatch({ type: 'LOAD_LIST', results: data });
        });
    }
    loadMorePokemons() {
        if (!this.state.loading && this.props.nextApiLink != null) {
            this.setState({ loadNext: 'loading' });
            setTimeout(() => {
                fetchWrapper_1.fetchWrapper.get(this.props.nextApiLink)
                    .then((data) => {
                    this.setState({ loadNext: 'success' });
                    store_1.storeExport.dispatch({ type: 'LOAD_MORE', newPokemons: data.results, newLink: data.next });
                });
            }, 3000);
        }
        if (this.props.nextApiLink == null) {
            this.setState({ loadNext: 'success' });
        }
    }
    searchForPokemon(event) {
        this.setState({ searchName: event.target.value });
    }
    render() {
        const listToShow = lodash_1.default.chain(this.props.pokemonList)
            .entries()
            .map((val, key) => {
            let isOnTheList = val[1] != undefined && (this.state.searchName === "" || val[1].name.toLocaleLowerCase().includes(this.state.searchName.toLocaleLowerCase()));
            return isOnTheList == true ? React.createElement("div", { className: "child" },
                React.createElement(Pokemon_1.default, { key: key, apiLink: val[1].url, name: val[1].name, pokemonDetails: val[1].details })) : React.createElement(React.Fragment, null);
        }).value();
        return (React.createElement(styled_components_1.ThemeProvider, { theme: this.state.theme === 'light' ? Themes_1.lightTheme : Themes_1.darkTheme },
            React.createElement(React.Fragment, null,
                React.createElement(globalStyles_1.GlobalStyles, null),
                React.createElement("div", { className: "center-logo" },
                    React.createElement("img", { src: Pokedex_logo_png_1.default })),
                React.createElement(reactive_button_1.default, { onClick: this.themeToggler },
                    "Change to ",
                    this.state.theme == "dark" ? "light theme" : "dark theme"),
                React.createElement("input", { type: "text", value: this.state.searchName, onChange: (event) => this.searchForPokemon(event) }),
                React.createElement("div", { className: "parent" }, listToShow),
                React.createElement("div", { className: "center-load-button" },
                    React.createElement(reactive_button_1.default, { buttonState: this.state.loadNext, onClick: () => { this.loadMorePokemons(); }, idleText: 'Load more pokemons' })))));
    }
}
const maptStateToProps = (state) => {
    return {
        pokemonList: state.results,
        nextApiLink: state.next
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        results: (newData) => { dispatch({ type: 'LOAD_LIST', results: newData }); },
        morePokemons: (newData) => { dispatch({ type: 'LOAD_MORE', newPokemons: newData.results, newLink: newData.link }); }
    };
};
const connector = (0, react_redux_1.connect)(maptStateToProps, mapDispatchToProps);
exports.default = connector(MainWindow);
