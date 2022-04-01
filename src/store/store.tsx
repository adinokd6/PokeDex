import { Action, Reducer } from 'redux';

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
    count: number
    results: Array<PokemonUrl>

}

export type KnownAction = PokemonListAction