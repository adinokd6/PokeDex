import { Action, Reducer } from 'redux';
import _ from 'lodash';

export interface PokemonListState {
    count: number,
    results: Array<PokemonUrl>
}

export interface PokemonUrl {
    name: string
    url: URL
    specs: PokemonDetails
}

export interface PokemonDetails {
    base_experience: number
    height: number
    types: Array<Types>
    sprites: Array<Sprites>
}

export interface Types {
    slot: number
    type: Type
}

export interface Type {
    name: string
}

export interface Sprites {
    back_default: URL
    back_female: URL
    back_shiny: URL
    back_shiny_female: URL
    front_default: URL
    front_female: URL
    front_shiny: URL
    front_shiny_female: URL
}

export interface PokemonListAction {
    type: 'LOAD_LIST'
    results: PokemonListState
}

export interface PokemonDetailsAction {
    type: 'LOAD_DETAILS'
    name: string
    details: PokemonDetails
}

export type KnownAction = PokemonListAction | PokemonDetailsAction

export const loadPokemonListReducer: Reducer<PokemonListState> = (state: PokemonListState | undefined, incomingAction: Action): PokemonListState => {
    if(state === undefined){
        return {count: 0, results: []}
    }

    const action = incomingAction as KnownAction;

    switch(action.type) {
        case 'LOAD_LIST':
            return {
                ...state,
                count: action.results.count,
                results: action.results.results,
            }
        case 'LOAD_DETAILS':
            return {
                ...state,
                results: addDetails(state.results, action.details, action.name)
            }
        default:
            {
                return state;
            }

    }
}

function addDetails(data: Array<PokemonUrl>, details, name) {
    var pokemonIndex = data.findIndex(x => x.name == name)
    data[pokemonIndex].specs=details;
    return data
}