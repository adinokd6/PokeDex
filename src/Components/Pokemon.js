import React from "react";
import { connect } from "react-redux";
import { fetchWrapper } from '../fetchWrapper';
import { storeExport } from '../store';
import './Styling/pokemonSpinner.css';
import { PokemonDetails, PokemonUrl, Sprites } from '../reducers/LoadPokemonList.tsx';
import { AwesomeButton } from "react-awesome-button";
import PokeModal from './PokeModal';

class Pokemon extends React.Component<{ apiLink: string, name: string, pokemonDetails: PokemonDetails }, { loading: boolean, openModal: boolean }> {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            openModal: false,
        }
        this.openModal = this.openModal.bind(this)
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
        }, 1000);
    }

    openModal() {
        this.setState(prevState => ({ openModal: !prevState.openModal }))
    }

    render() {

        if (this.state.loading || this.props.pokemonDetails == undefined) {
            return <div className="center-spinner"><div className="pokemon"></div></div>
        }

        console.log(this.props.pokemonDetails)
        return (
            <div>
                <div><AwesomeButton className="style-button-for-pokeImg" onPress={() => this.openModal()}>{<img src={this.props.pokemonDetails.sprites.front_default}></img>}</AwesomeButton></div>
                <div>{this.props.name}</div>
                {this.state.openModal && <PokeModal pokemonDetails={this.props.pokemonDetails} isOpen={this.state.openModal} onClose={this.openModal} />}
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
        details: (newData, newName) => { dispatch({ type: 'LOAD_DETAILS', details: newData, name: newName }) }
    }
}


function findDetails(data: Array<PokemonUrl>, name) {
    var pokemonIndex = data.findIndex(x => x.name === name)
    return data[pokemonIndex].specs
}

const connector = connect(maptStateToProps, mapDispatchToProps)

export default connector(Pokemon);