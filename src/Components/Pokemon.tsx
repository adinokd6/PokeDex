import React from "react";
import { connect } from "react-redux";
import { fetchWrapper } from '../fetchWrapper';
import { storeExport } from './store';
import './Styling/pokemonSpinner.css';
import { PokemonDetails, PokemonUrl } from '../reducers/LoadPokemonList';
import PokeModal from './PokeModal';
import ReactiveButton from 'reactive-button';

interface PokemonProps {
    apiLink: string
    name: string
    pokemonDetails: PokemonDetails
}

class Pokemon extends React.Component<PokemonProps, { loading: boolean, openModal: boolean }> {
    constructor(props: any) {
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

    capitalize(str: string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {

        if (this.state.loading || this.props.pokemonDetails == undefined) {
            return <div className="center-spinner"><div className="pokemon"></div></div>
        }

        const getImage = this.props.pokemonDetails.sprites.front_default
        return (
            <div>
                <div className="margin-for-pokemon"><ReactiveButton onClick={() => this.openModal()} idleText={<><img src={getImage}></img><div className="pokemonFont">{this.capitalize(this.props.name)}</div></>} className={'style-button-for-pokeImg'}></ReactiveButton></div>
                
                {this.state.openModal && <PokeModal pokemonDetails={this.props.pokemonDetails} isOpen={this.state.openModal} onClose={this.openModal} />}
            </div>
        )
    }
}


const maptStateToProps = (state: any, getProps: any) => {
    return {
        pokemonDetails: findDetails(state.results, getProps.name)
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        details: (newData: any, newName: string) => { dispatch({ type: 'LOAD_DETAILS', details: newData, name: newName }) }
    }
}


function findDetails(data: Array<PokemonUrl>, name: string) {
    var pokemonIndex = data.findIndex(x => x.name === name)
    return data[pokemonIndex].specs
}

const connector = connect(maptStateToProps, mapDispatchToProps)

export default connector(Pokemon);