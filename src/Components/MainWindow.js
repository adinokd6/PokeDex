import './Styling/style.css'
import * as React from 'react';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { lightTheme, darkTheme } from "./Themes"
import {AwesomeButtonProgress,AwesomeButton} from "react-awesome-button";
import Header from './PokeHeader'
import "react-awesome-button/dist/styles.css";
import { fetchWrapper } from '../fetchWrapper';
import { storeExport } from '../store';
import { connect, ConnectedProps } from 'react-redux';
import _ from 'lodash';
import Pokemon from './Pokemon';
import { PokemonUrl } from "../reducers/LoadPokemonList.tsx";

interface MainWindowProps {
  pokemonList: [],
  nextApiLink: string,
  searchName: string
}

class MainWindow extends React.Component<MainWindowProps, { theme: string, loading: boolean, loadNext: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
      loading: true,
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
        let isOnTheList = val[1] != undefined && (this.props.searchName === "" || val[1].name.toLocaleLowerCase().includes(this.props.searchName.toLocaleLowerCase()));
        return isOnTheList == true ? <div className="child"><Pokemon key={key} apiLink={val[1].url} name={val[1].name} pokemonDetails={val[1].details} /></div> : <></>
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
            <AwesomeButtonProgress action={(element, next) => {
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