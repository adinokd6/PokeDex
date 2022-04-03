import * as React from 'react';
import { Modal } from 'react-responsive-modal';
import { PokemonDetails } from '../reducers/LoadPokemonList.tsx';
import './Styling/style.css';


class PokeModal extends React.Component<{ pokemonDetails: PokemonDetails, onClose: any, isOpen: boolean }, { photo: string }> {
    constructor(props: any) {
        super(props)
        this.state = {
            photo: this.props.pokemonDetails.sprites.front_default
        }
        this.closeModal = this.props.onClose.bind(this)
    }


    closeModal() { }

    render() {
        console.log(this.props.isOpen)
        const types = this.props.pokemonDetails.types.map((x) => { return <>Type: <span>{x.type.name}</span><hr /></> })
        return (
            <Modal classNames={{ root: "modal-position" }} open={this.props.isOpen} onClose={this.props.onClose} >
                <h2>Simple centered modal</h2>
                <div>Photo: {<img src={this.props.pokemonDetails.sprites.front_default} />}</div>
                <hr />
                <span>Base experience: {this.props.pokemonDetails.base_experience}</span>
                <hr />
                <span>Height: {this.props.pokemonDetails.height}</span>
                <hr />
                {types}
            </Modal>
        )
    }
}

export default PokeModal;
