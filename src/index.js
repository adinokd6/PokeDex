"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
require("./custom.css");
const react_redux_1 = require("react-redux");
const store_1 = require("./Components/store");
const MainWindow_1 = __importDefault(require("./Components/MainWindow"));
react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: store_1.storeExport },
    react_1.default.createElement(MainWindow_1.default, null)), document.getElementById('root'));
