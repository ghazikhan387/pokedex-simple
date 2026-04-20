import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function PokemonDetails({pokemonName}) {
    const {id} = useParams();
    const [pokemon, setPokemon] = useState({});
    let pokemonIdentifier = pokemonName || id;
    async function downloadPokemon(){
        
        try{
         const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIdentifier}`);
        
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            types: response.data.types.map((t) => t.type.name),
            height: response.data.height,
            weight: response.data.weight,
            
        })
        } catch(error){
            console.log(error);
        }        
        
    }



    useEffect(() => {
        downloadPokemon();
    }, [pokemonIdentifier]);
    return (
        <div className="mt-4">
            <Link to="/" onClick={() => {setPokemonName("")}} className="text-[20px] bg-gray-500 text-slate-50 px-2 py-1 rounded-lg hover:bg-slate-600 hover:scale-105 transition-all duration-300 font-bold cursor-pointer mt-4 mb-4">{'<<'} Back</Link>
            
            <div className="flex flex-col items-center mt-4 mb-4 md:w-[50vw]    lg:w-[30vw] border border-slate-800 px-2 py-1 h-min-[90vh] w-[95vw] text-center rounded-lg">
              <h1 className="text-2xl font-bold mt-4 mb-4">Pokemon Details</h1>

              <div>
                <img className="w-60 p-2 h-60 hover:scale-110 transition-all duration-300" src={pokemon.image} alt={pokemon.name} />
              </div>
              <div>
                <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
                <div className="text-lg">Height: {pokemon.height}</div>
                <div className="text-lg">Weight: {pokemon.weight}</div>
                <div className="flex gap-2 text-lg">Types: {pokemon.types?.map((t) => <div className="bg-gray-200 px-2 py-1 rounded-lg" key={t}>{t}</div>)}</div>
              </div>
            </div>
        </div>
    )
}

export default PokemonDetails;