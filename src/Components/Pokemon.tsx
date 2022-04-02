import React from "react";
import { connect } from "react-redux";
import { fetchWrapper } from '../fetchWrapper';
import { storeExport } from '../store';
import './Styling/pokemonSpinner.css'

class Pokemon extends React.Component<{ apiLink: string }, { loading: boolean }> {
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
                    storeExport.dispatch({ type: 'LOAD_DETAILS', details: result })
                })
        }, 10000);

    }

    render() {
        if (this.state.loading) {
            return <div className="pokemon"></div>
        }

        return (
            <div>DUPA</div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        details: (newData) => { dispatch({ type: 'LOAD_DETAILS', details: newData }) }
    }
}

const connector = connect(mapDispatchToProps)

export default connector(Pokemon);