import { createGlobalStyle } from "styled-components"
import background_dark from "../Images/background_dark.jpg"
import background from "../Images/background.png"
import "./Styling/style.css"

export const GlobalStyles = createGlobalStyle`
  body {
    background-image: url(${({ theme }) => theme.type === 'light' ? background : background_dark}) !important;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  `
