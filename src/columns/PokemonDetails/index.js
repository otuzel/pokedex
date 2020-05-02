// Renders the profile and games of a single pokemon
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";

const usePokemon = name => {
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemon = useCallback(() => {
    setPokemon(null);
    if (!name) return;
    fetchPokemonByName(name).then(pokemon => {
      setPokemon(pokemon);
    });
  }, [name]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return pokemon;
};

const usePokemonGames = pokemon => {
  const [games, setGames] = useState(null);
  const fetchGames = useCallback(() => {
    setGames(null);
    if (!pokemon) return;
    fetchPokemonGames(pokemon.game_indices.map(game => game.version.name)).then(
      games => {
        setGames(games);
      }
    );
  }, [pokemon]);

  useState(() => {
    fetchGames();
  }, []);
  return games;
};

const PokemonGames = props => {
  const games = usePokemonGames(props.pokemon);

  return !games ? <Spinner /> : <PokemonGamesSection games={games} />;
};

const Pokemon = props => {
  const pokemon = usePokemon(props.name);

  return (
    <Column width={1} p={4}>
      {!props.name ? null : !pokemon ? (
        <Spinner />
      ) : (
        <>
          <PokemonProfile pokemon={pokemon} />
          <PokemonGames pokemon={pokemon} />
        </>
      )}
    </Column>
  );
};

export default Pokemon;
