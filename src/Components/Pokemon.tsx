import React from "react";
import { connect } from "react-redux";
import { fetchWrapper } from '../fetchWrapper';
import { storeExport } from '../store';
import './Styling/pokemonSpinner.css';
import { PokemonDetails, PokemonUrl, Sprites } from '../reducers/LoadPokemonList';
import AwesomeButton from "react-awesome-button";

interface PokemonProps {
    apiLink: string,
    name: string,
    pokemonDetails: PokemonDetails
}

class Pokemon extends React.Component<PokemonProps, { loading: boolean }> {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.loadDetails()
    }


    loadDetails() {
        setTimeout(() => {
            fetchWrapper.get(this.props.apiLink)
                .then((result) => {
                    this.setState({ loading: false })
                    storeExport.dispatch({ type: 'LOAD_DETAILS', details: result, name: this.props.name })
                })
        }, 3000);

    }

    render() {

        if (this.state.loading || this.props.pokemonDetails==undefined) {
            return <div className="pokemon"></div>
        }

        return (
            <div>
                <div>{this.props.name}</div>
                {<img src={this.props.pokemonDetails.sprites.front_default}></img>}
            </div>
        )
    }
}


const maptStateToProps = (state, getProps) => {
    return {
        pokemonDetails: findDetails(state.results, getProps.name)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        details: (newData,newName) => { dispatch({ type: 'LOAD_DETAILS', details: newData, name: newName }) }
    }
}


function findDetails(data: Array<PokemonUrl>, name) {
    var pokemonIndex = data.findIndex(x => x.name === name)
    return data[pokemonIndex].specs
}

const connector = connect(maptStateToProps, mapDispatchToProps)

export default connector(Pokemon);