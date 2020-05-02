// Renders the sidebar with the list of pokemons in the pokedex
import React, { useEffect, useState } from "react";
import { Link } from "@primer/components";
import { Spinner } from "@nice-boys/components";
import Sidebar from "../../components/Sidebar";
import SidebarItem from "../../components/SidebarItem";
import SidebarTitle from "../../components/SidebarTitle";
import { fetchPokemons } from "../../api/pokeapi";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState();

  useEffect(() => {
    fetchPokemons().then(pokemons => {
      setPokemons(pokemons);
    });
  }, []);
  return pokemons;
};

const PokemonList = props => {
  const pokemons = usePokemons();

  return (
    <Sidebar>
      <Link onClick={() => props.setSelectedPokemon(null)}>
        <SidebarTitle>Pokedex</SidebarTitle>
      </Link>
      {!pokemons ? (
        <Spinner />
      ) : (
        pokemons.map(pokemon => (
          <Link
            key={pokemon.name}
            onClick={() => props.setSelectedPokemon(pokemon.name)}
          >
            <SidebarItem>{pokemon.name}</SidebarItem>
          </Link>
        ))
      )}
    </Sidebar>
  );
};

export default PokemonList;
