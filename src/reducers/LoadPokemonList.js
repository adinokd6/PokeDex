"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPokemonListReducer = void 0;
const loadPokemonListReducer = (state, incomingAction) => {
    if (state === undefined) {
        return { count: 0, results: [], next: "" };
    }
    const action = incomingAction;
    switch (action.type) {
        case 'LOAD_LIST':
            return Object.assign(Object.assign({}, state), { count: action.results.count, results: action.results.results, next: action.results.next });
        case 'LOAD_DETAILS':
            return Object.assign(Object.assign({}, state), { results: addDetails(state.results, action.details, action.name) });
        case 'LOAD_MORE':
            return Object.assign(Object.assign({}, state), { results: state.results.concat(action.newPokemons), next: action.newLink });
        default:
            {
                return state;
            }
    }
};
exports.loadPokemonListReducer = loadPokemonListReducer;
function addDetails(data, details, name) {
    var pokemonIndex = data.findIndex(x => x.name == name);
    data[pokemonIndex].specs = details;
    return data;
}
