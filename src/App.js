// The <App /> component is responsible for rendering the two main columns
import React, { useEffect, useState } from "react";
import { BaseStyles } from "@primer/components";
import { Flex } from "@primer/components";
import { Spinner } from "@nice-boys/components";
import ErrorBoundary from "react-error-boundary";
import PokemonList from "./columns/PokemonList";

const PokemonDetails = React.lazy(() => import("./columns/PokemonDetails"));

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    document.title = `${selectedPokemon ? `${selectedPokemon} | ` : ""}Pokedex`;
  });

  return (
    <BaseStyles>
      <Flex>
        <React.Suspense fallback={<Spinner />}>
          <PokemonList setSelectedPokemon={setSelectedPokemon} />
        </React.Suspense>

        {selectedPokemon && (
          <React.Suspense fallback={<Spinner />}>
            <PokemonDetails name={selectedPokemon} />
          </React.Suspense>
        )}
      </Flex>
    </BaseStyles>
  );
};

export default App;
