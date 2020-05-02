// Renders the profile and games of a single pokemon
import React from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";
import useAsync from "../../hooks/useAsync";

const PokemonGames = props => {
  const [games, state] = useAsync(() => {
    if (!props.pokemon) {
      return Promise.resolve(null);
    }
    return fetchPokemonGames(
      props.pokemon.game_indices.map(game => game.version.name)
    );
  }, [props.pokemon]);

  return (
    <>
      {state === "error" && <div>Oops</div>}
      {state === "loading" && <Spinner />}
      {state === "idle" && games ? (
        <PokemonGamesSection games={games} />
      ) : (
        <div>No games</div>
      )}
    </>
  );
};

const Pokemon = props => {
  const [pokemon, state] = useAsync(() => {
    return fetchPokemonByName(props.name);
  }, [props.name]);

  return (
    <Column width={1} p={4}>
      {state === "error" && <div>Oops</div>}
      {state === "loading" && <Spinner />}
      {state === "idle" &&
        (!props.name ? null : pokemon ? (
          <>
            <PokemonProfile pokemon={pokemon} />
            <PokemonGames pokemon={pokemon} />
          </>
        ) : (
          <div>No pokemon</div>
        ))}
    </Column>
  );
};

export default Pokemon;
