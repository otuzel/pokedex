// Renders the profile and games of a single pokemon
import React, { useCallback } from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";
import useAsync from "../../hooks/useAsync";

const PokemonGamesSection = React.lazy(() =>
  import("../../components/PokemonGamesSection")
);

const PokemonGames = props => {
  const callback = useCallback(
    () =>
      fetchPokemonGames(
        props.pokemon.game_indices.map(game => game.version.name)
      ),
    [props.pokemon]
  );

  const { data, state } = useAsync(callback);

  return (
    <>
      {state === "error" && <div>Oops</div>}
      {state === "loading" && <Spinner />}
      {state === "idle" && data ? (
        <React.Suspense fallback={<Spinner />}>
          <PokemonGamesSection games={data} />
        </React.Suspense>
      ) : (
        <div>No games</div>
      )}
    </>
  );
};

const Pokemon = props => {
  const callback = useCallback(() => fetchPokemonByName(props.name), [
    props.name
  ]);

  const { data, state } = useAsync(callback);

  return (
    <Column width={1} p={4}>
      {state === "error" && <div>Oops</div>}
      {state === "loading" && <Spinner />}
      {state === "idle" &&
        (!props.name ? null : data ? (
          <>
            <PokemonProfile pokemon={data} />
            <PokemonGames pokemon={data} />
          </>
        ) : (
          <div>No pokemon</div>
        ))}
    </Column>
  );
};

export default Pokemon;
