import React, { FC } from "react";
import { PokemonDetail } from "../../types/pokemon";

export const Card: FC<{ pokemon: PokemonDetail }> = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="card_header">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <div>{pokemon.name}</div>
      </div>
      <main className="card_main">
        <span>タイプ</span>
        <ul>
          {pokemon.types.map((type, i) => (
            <li key={i}>{type.type.name}</li>
          ))}
        </ul>
        <span>重さ</span>
        <div>{pokemon.weight}</div>
        <span>高さ</span>
        <div>{pokemon.height}</div>
        <span>アビリティ</span>
        <div>{pokemon.abilities[0].ability.name}</div>
      </main>
    </div>
  );
};
