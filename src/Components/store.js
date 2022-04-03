"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeExport = void 0;
const LoadPokemonList_1 = require("../reducers/LoadPokemonList");
const redux_1 = require("redux");
exports.storeExport = (0, redux_1.createStore)(LoadPokemonList_1.loadPokemonListReducer);
