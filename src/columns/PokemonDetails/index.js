// Renders the profile and games of a single pokemon
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Spinner } from "@nice-boys/components";
import PokemonProfile from "../../components/PokemonProfile";
import PokemonGamesSection from "../../components/PokemonGamesSection";
import Column from "../../components/Column";
import { fetchPokemonGames, fetchPokemonByName } from "../../api/pokeapi";

const PokemonGames = props => {
  const [games, setGames] = useState(null);
  const fetchGames = useCallback(() => {
    setGames(null);
    if (!props.pokemon) return;
    fetchPokemonGames(
      props.pokemon.game_indices.map(game => game.version.name)
    ).then(games => {
      setGames(games);
    });
  }, [props]);

  useState(() => {
    fetchGames();
  }, []);

  return !games ? <Spinner /> : <PokemonGamesSection games={games} />;
};

const Pokemon = props => {
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemon = useCallback(() => {
    setPokemon(null);
    if (!props.name) return;
    fetchPokemonByName(props.name).then(pokemon => {
      setPokemon(pokemon);
    });
  }, [props]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

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

// class Pokemon extends React.Component {
//   state = {
//     pokemon: null
//   };

//   componentDidMount() {
//     this.fetchPokemon();
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.name !== this.props.name) {
//       this.fetchPokemon();
//     }
//   }

//   fetchPokemon() {
//     this.setState({
//       pokemon: null
//     });

//     if (!this.props.name) return;
//     fetchPokemonByName(this.props.name).then(pokemon => {
//       this.setState({
//         pokemon
//       });
//     });
//   }

//   render() {
//     return (
//       <Column width={1} p={4}>
//         {!this.props.name ? null : !this.state.pokemon ? (
//           <Spinner />
//         ) : (
//           <>
//             <PokemonProfile pokemon={this.state.pokemon} />
//             <PokemonGames pokemon={this.state.pokemon} />
//           </>
//         )}
//       </Column>
//     );
//   }
// }

export default Pokemon;
