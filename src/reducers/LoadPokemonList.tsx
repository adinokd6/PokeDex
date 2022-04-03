import { Action, Reducer } from 'redux';
import _ from 'lodash';

export interface PokemonListState {
    count: number
    next: string
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
    sprites: Sprites
}

export interface Types {
    slot: number
    type: Type
}

export interface Type {
    name: string
}

export interface Sprites {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
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

export interface LoadMorePokemonsAction {
    type: 'LOAD_MORE'
    newPokemons: Array<PokemonUrl>
    newLink: string
}

export type KnownAction = PokemonListAction | PokemonDetailsAction | LoadMorePokemonsAction

export const loadPokemonListReducer: Reducer<PokemonListState> = (state: PokemonListState | undefined, incomingAction: Action): PokemonListState => {
    if(state === undefined){
        return {count: 0, results: [], next: ""}
    }

    const action = incomingAction as KnownAction;

    switch(action.type) {
        case 'LOAD_LIST':
            return {
                ...state,
                count: action.results.count,
                results: action.results.results,
                next: action.results.next
            }
        case 'LOAD_DETAILS':
            return {
                ...state,
                results: addDetails(state.results, action.details, action.name)
            }
        case 'LOAD_MORE':
            return {
                ...state,
                results: state.results.concat(action.newPokemons),
                next: action.newLink
            }
        default:
            {
                return state;
            }

    }
}

function addDetails(data: Array<PokemonUrl>, details: PokemonDetails, name: string) {
    var pokemonIndex = data.findIndex(x => x.name == name)
    data[pokemonIndex].specs=details;
    return data
}