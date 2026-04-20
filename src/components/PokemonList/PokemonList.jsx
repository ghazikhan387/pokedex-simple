import axios from "axios";
import { useEffect, useState } from "react";
import Pokemon from "../Pokemon/Pokemon";


function PokemonList() {
    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [POKEDEX_URL, setPOKEDEX_URL] = useState("https://pokeapi.co/api/v2/pokemon");
    // const [nextUrl, setNextUrl] = useState("");
    // const [prevUrl, setPrevUrl] = useState("");

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        POKEDEX_URL: "https://pokeapi.co/api/v2/pokemon",
        nextUrl: "",
        prevUrl: ""
    });


    async function downloadPokemons(){
        setPokemonListState((prev) => ({...prev, isLoading: true}));
        const response = await axios.get(pokemonListState.POKEDEX_URL);
        const pokemonResult = response.data.results;
        setPokemonListState({ ...pokemonListState, nextUrl: response.data.next, prevUrl: response.data.previous});
        const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        });
        
        setPokemonListState((prev)=>({...prev, pokemonList: pokeListResult, isLoading: false}));
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.POKEDEX_URL]);


    return (
        <div className="flex flex-col mt-8 mb-4 border border-slate-800 px-2 py-1 h-min-[90vh] w-[95vw] text-center rounded-lg">
            <h1 className="text-2xl font-bold mt-4 mb-4">Pokemon List</h1>
             <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 justify-between p-2">
               {pokemonListState.isLoading ? 'Loading...' : pokemonListState.pokemonList.map((p) => <Pokemon key={p.name} name={p.name} image={p.image} id={p.id}/>)}
             </div>
             <div className="flex justify-center gap-4 m-4">
                <button 
                className="bg-slate-700 w-[80px] text-slate-50 px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-600 transition-all duration-300 hover:scale-105" 
                disabled={pokemonListState.prevUrl == null} 
                onClick={() => 
                    {setPokemonListState({...pokemonListState, POKEDEX_URL: pokemonListState.prevUrl})}}>Prev</button>
                <button 
                className="bg-slate-700 w-[80px] text-slate-50 px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-600 transition-all duration-300 hover:scale-105" 
                disabled={pokemonListState.nextUrl == null} 
                onClick={() => 
                    {setPokemonListState({...pokemonListState, POKEDEX_URL: pokemonListState.nextUrl})}}>Next</button>
             </div>
        </div>
    )
}

export default PokemonList;