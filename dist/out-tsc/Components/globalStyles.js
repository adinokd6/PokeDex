"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalStyles = void 0;
const styled_components_1 = require("styled-components");
const background_dark_jpg_1 = __importDefault(require("../Images/background_dark.jpg"));
const background_png_1 = __importDefault(require("../Images/background.png"));
require("./Styling/style.css");
exports.GlobalStyles = (0, styled_components_1.createGlobalStyle) `
  body {
    background-image: url(${({ theme }) => theme.type === 'light' ? background_png_1.default : background_dark_jpg_1.default}) !important;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  `;
