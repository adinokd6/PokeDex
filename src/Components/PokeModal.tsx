import * as React from 'react';
import { Modal } from 'react-responsive-modal';
import { PokemonDetails } from '../reducers/LoadPokemonList';
import ReactiveButton from 'reactive-button';
import './Styling/style.css';
import Sign from "../Images/on.png"


class PokeModal extends React.Component<{ pokemonDetails: PokemonDetails, onClose: any, isOpen: boolean, pokemonName: string }, { photo: string }> {
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
        const closeButton = (<>
            <ReactiveButton style={{
                border: "red",
                color: "red"
            }
            }
                idleText={<></>}
                className={"button-close-modal"} onClick={this.closeModal} />
        </>)
        const types = this.props.pokemonDetails.types.map((x) => { return <><span className="bold-font">Type: </span><span>{x.type.name}</span><br /></> })
        return (
            <Modal center classNames={{ root: "modal-position modal-background animation-modal-in" }} open={this.props.isOpen} onClose={() => null} closeIcon={closeButton} showCloseIcon={false} >
                <div>
                    {closeButton}
                    <div id="left">{<img src={this.props.pokemonDetails.sprites.front_default} />}</div>
                    <div id="right">
                        <span className="name-font-size-modal">{this.props.pokemonName}</span>
                        <br />
                        <br />
                        <br />
                        <span className="bold-font">Base experience: </span><span>{this.props.pokemonDetails.base_experience}</span>
                        <br />
                        <span className="bold-font">Height: </span><span>{this.props.pokemonDetails.height}</span>
                        <br />
                        {types}
                    </div>
                </div>
            </Modal>
        )
    }
}

export default PokeModal;
