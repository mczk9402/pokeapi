import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Card } from "./components/Card";
import { PokemonDetail, PokemonItem } from "./types/pokemon";
import { getAllPokemon, getPokemon } from "./utls/pokemon";
import "./App.css";

function App() {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [allPokemon, setAllPokemon] = useState<PokemonDetail[] | null>(null);

  const { data, isLoading, refetch } = useQuery("allPokemon", () =>
    getAllPokemon(url)
  );

  const loadPokemon = async (pokemonItems: PokemonItem[]) => {
    let _pokemonDetails = await Promise.all(
      pokemonItems.map((pokemonItem) => getPokemon(pokemonItem.url))
    );

    setAllPokemon(_pokemonDetails);
  };

  const handleFetchButton = async (url: string | undefined) => {
    if (url) setUrl(url);
  };

  useEffect(() => {
    if (data) loadPokemon(data.results);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [url, refetch]);

  return (
    <div className="App">
      <main className="main">
        {isLoading ? (
          <div>ロード中…</div>
        ) : (
          <div className="pokemonCardContainer">
            {allPokemon?.map((pokemonDetail, i) => (
              <Card pokemon={pokemonDetail} key={i} />
            ))}
          </div>
        )}
      </main>
      <nav>
        <button
          onClick={() => handleFetchButton(data?.previous)}
          disabled={!data?.previous}
        >
          前へ
        </button>
        <button
          onClick={() => handleFetchButton(data?.next)}
          disabled={!data?.next}
        >
          次へ
        </button>
      </nav>
    </div>
  );
}

export default App;
