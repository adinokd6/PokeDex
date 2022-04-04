import * as React from 'react';
import { Modal } from 'react-responsive-modal';
import { PokemonDetails } from '../reducers/LoadPokemonList';
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
        const types = this.props.pokemonDetails.types.map((x) => { return <>Type: <span>{x.type.name}</span><br /></> })
        return (
            <Modal classNames={{ root: "modal-position modal-background" }} open={this.props.isOpen} onClose={this.props.onClose} >
                <div>
                    <div id="right">{<img src={this.props.pokemonDetails.sprites.front_default} />}</div>
                    <div id="left">
                        <span>Base experience: {this.props.pokemonDetails.base_experience}</span>
                        <br />
                        <span>Height: {this.props.pokemonDetails.height}</span>
                        <br />
                        {types}
                    </div>
                </div>
            </Modal>
        )
    }
}

export default PokeModal;
