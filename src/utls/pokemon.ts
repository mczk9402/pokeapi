import { PokemonDetail, PokemonList } from "../types/pokemon";

const fetcher: <T>(url: string) => Promise<T> = async (url) => {
  return new Promise((resolve) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

export const getAllPokemon: (url: string) => Promise<PokemonList> = async (
  url
) => fetcher(url);

export const getPokemon: (url: string) => Promise<PokemonDetail> = async (
  url
) => fetcher(url);
