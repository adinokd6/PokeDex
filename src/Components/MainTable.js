import './Styling/style.css'
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { lightTheme, darkTheme } from "./Themes"
import { AwesomeButton } from "react-awesome-button";
import Header from './PokeHeader'
import "react-awesome-button/dist/styles.css";
import { fetchWrapper } from '../fetchWrapper';

class MainTable extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      theme: 'light',
      loading: true
    }
  }

  apiUrl = "https://pokeapi.co/api/v2/pokemon"

  themeToggler = () => {
    this.state.theme === 'light' ? this.setState({theme: 'dark'}) : this.setState({theme: 'light'})
  }

  updateValues() {
    fetchWrapper.get(this.apiUrl)
    .then((result) => {

    })
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />
          <div>
            <Header />
            <AwesomeButton onPress={this.themeToggler} type="primary">Change to {this.state.theme == "dark" ? "light theme" : "dark theme"}</AwesomeButton>
          </div>
        </>
      </ThemeProvider>
    );
  }
  
}

export default MainTable;