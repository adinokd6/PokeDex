import {loadPokemonListReducer} from './reducers/LoadPokemonList.tsx';
import { createStore } from 'redux';

export const storeExport = createStore(loadPokemonListReducer);