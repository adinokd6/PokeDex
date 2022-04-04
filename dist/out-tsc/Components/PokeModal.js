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
const React = __importStar(require("react"));
const react_responsive_modal_1 = require("react-responsive-modal");
const reactive_button_1 = __importDefault(require("reactive-button"));
require("./Styling/style.css");
class PokeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: this.props.pokemonDetails.sprites.front_default
        };
        this.closeModal = this.props.onClose.bind(this);
    }
    closeModal() { }
    render() {
        console.log(this.props.isOpen);
        const closeButton = (React.createElement(React.Fragment, null,
            React.createElement(reactive_button_1.default, { onClick: this.closeModal })));
        const types = this.props.pokemonDetails.types.map((x) => { return React.createElement(React.Fragment, null,
            "Type: ",
            React.createElement("span", null, x.type.name),
            React.createElement("br", null)); });
        return (React.createElement(react_responsive_modal_1.Modal, { classNames: { root: "modal-position modal-background" }, open: this.props.isOpen, onClose: () => null, closeIcon: closeButton },
            React.createElement("div", null,
                React.createElement("div", { id: "right" }, React.createElement("img", { src: this.props.pokemonDetails.sprites.front_default })),
                React.createElement("div", { id: "left" },
                    React.createElement("span", null,
                        "Base experience: ",
                        this.props.pokemonDetails.base_experience),
                    React.createElement("br", null),
                    React.createElement("span", null,
                        "Height: ",
                        this.props.pokemonDetails.height),
                    React.createElement("br", null),
                    types))));
    }
}
exports.default = PokeModal;
