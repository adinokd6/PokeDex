import './Styling/style.css'
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { lightTheme, darkTheme } from "./Themes"
import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";
import Header from './PokeHeader'
import "react-awesome-button/dist/styles.css";
import { fetchWrapper } from '../fetchWrapper';
import { storeExport } from '../store';
import { connect, ConnectedProps } from 'react-redux';
import _ from 'lodash';
import Pokemon from './Pokemon.tsx';

class MainWindow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'light',
      loading: true,
      searchName: "",
      loadNext: false,
    }
  }

  mainApiUrl = "https://pokeapi.co/api/v2/pokemon"

  componentDidMount() {
    this.loadPokemonList()
  }



  themeToggler = () => {
    this.state.theme === 'light' ? this.setState({ theme: 'dark' }) : this.setState({ theme: 'light' })
  }

  loadPokemonList() {
    fetchWrapper.get(this.mainApiUrl)
      .then((data) => {
        this.setState({ loading: false })
        storeExport.dispatch({ type: 'LOAD_LIST', results: data })
      })
  }

  loadMorePokemons() {
    if (!this.state.loading) {
      console.log(this.props.nextApiLink)
      fetchWrapper.get(this.props.nextApiLink)
        .then((data) => {
          storeExport.dispatch({ type: 'LOAD_MORE', newPokemons: data.results })
        })
    }
  }



  render() {
    const listToShow = _.chain(this.props.pokemonList)
      .entries()
      .map((val, key) => {
        let filtered = val[1]!=undefined && (this.state.searchName === "" || val[1].name.toLocaleLowerCase().includes(this.state.searchName.toLocaleLowerCase()));
        return filtered == true ? <div className="child"><Pokemon key={key} apiLink={val[1].url} name={val[1].name} pokeDetails={val[1].details} /></div> : <></>
      }).value()

    return (
      <ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />
          <Header />
          <AwesomeButton onPress={this.themeToggler} type="primary">Change to {this.state.theme == "dark" ? "light theme" : "dark theme"}</AwesomeButton>
          <div className="parent">
            {listToShow}
          </div>
          <div className="center-load-button">
            <AwesomeButtonProgress action={(element,next) => {
              setTimeout(() => {
                this.loadMorePokemons();
                console.log(next())
                next();
              }, 500)
              }}>Load more pokemons</AwesomeButtonProgress>
          </div>
        </>
      </ThemeProvider>
    );
  }

}

const maptStateToProps = (state) => {
  return {
    pokemonList: state.results,
    nextApiLink: state.next
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    results: (newData) => { dispatch({ type: 'LOAD_LIST', results: newData }) },
    morePokemons: (newData) => { dispatch({ type: 'LOAD_MORE', newPokemons: newData.results }) }
  }
}

const connector = connect(maptStateToProps, mapDispatchToProps)

export default connector(MainWindow);