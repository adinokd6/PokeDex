import {loadPokemonListReducer} from '../reducers/LoadPokemonList';
import { createStore } from 'redux';



export const storeExport = createStore(loadPokemonListReducer);