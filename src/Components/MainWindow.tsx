import './Styling/style.css'
import * as React from 'react';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { lightTheme, darkTheme } from "./Themes";
import { fetchWrapper } from '../fetchWrapper';
import { storeExport } from './store';
import { connect, ConnectedProps } from 'react-redux';
import _ from 'lodash';
import Pokemon from './Pokemon';
import ReactiveButton from 'reactive-button';
import Logo from "../Images/Pokedex_logo.png";

interface MainWindowProps {
  pokemonList: [],
  nextApiLink: string
}

interface MainWindowState {
  theme: string,
  loading: boolean,
  loadNext: string,
  searchName: string
}

class MainWindow extends React.Component<MainWindowProps, MainWindowState> {
  constructor(props: MainWindowProps) {
    super(props);
    this.state = {
      theme: 'light',
      loading: true,
      loadNext: 'idle',
      searchName: ""
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
    if (!this.state.loading && this.props.nextApiLink!=null) {
      this.setState({ loadNext: 'loading' });
      setTimeout(() => {
        fetchWrapper.get(this.props.nextApiLink)
          .then((data) => {
            this.setState({ loadNext: 'success' })
            storeExport.dispatch({ type: 'LOAD_MORE', newPokemons: data.results, newLink: data.next })
          })
      }, 3000)
    }

    if(this.props.nextApiLink==null)
    {
      this.setState({ loadNext: 'success' })
    }
  }



  searchForPokemon(event: any) {
    this.setState({searchName: event.target.value})
  }


  render() {
    const listToShow = _.chain(this.props.pokemonList)
      .entries()
      .map((val, key) => {
        let isOnTheList = val[1] != undefined && (this.state.searchName === "" || val[1].name.toLocaleLowerCase().includes(this.state.searchName.toLocaleLowerCase()));
        return isOnTheList == true ? <div className="child"><Pokemon key={key} apiLink={val[1].url} name={val[1].name} pokemonDetails={val[1].details} /></div> : <></>
      }).value()

    return (
      <ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />
          <div className="center-logo"><img src={Logo}></img></div>
          <ReactiveButton onClick={this.themeToggler}>Change to {this.state.theme == "dark" ? "light theme" : "dark theme"}</ReactiveButton>
          <input type="text" value={this.state.searchName} onChange={(event) => this.searchForPokemon(event)} />
          <div className="parent">
            {listToShow}
          </div>
          <div className="center-load-button">
            <ReactiveButton buttonState={this.state.loadNext} onClick={() => { this.loadMorePokemons() }} idleText={'Load more pokemons'}></ReactiveButton>
          </div>
        </>
      </ThemeProvider>
    );
  }

}

const maptStateToProps = (state: any) => {
  return {
    pokemonList: state.results,
    nextApiLink: state.next
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    results: (newData: any) => { dispatch({ type: 'LOAD_LIST', results: newData }) },
    morePokemons: (newData: any) => { dispatch({ type: 'LOAD_MORE', newPokemons: newData.results, newLink: newData.link }) }
  }
}

const connector = connect(maptStateToProps, mapDispatchToProps)

export default connector(MainWindow);