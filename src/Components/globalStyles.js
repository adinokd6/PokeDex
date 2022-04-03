import { createGlobalStyle } from "styled-components"
import background_dark from "../Images/background_dark.jpg"
import background from "../Images/background.png"

export const GlobalStyles = createGlobalStyle`
  body {
    background-image: url(${({ theme }) => theme.type === 'light' ? background : background_dark}) !important;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
    transition: background-image 3s ease-in-out;
    -webkit-transition: opacity 1s ease-in-out;
    -moz-transition: opacity 1s ease-in-out;
    -o-transition: opacity 1s ease-in-out;
  }
  `
