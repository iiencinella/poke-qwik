import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";

export const usePokemonGame = () => {
  const pokemonGame = useContext(PokemonGameContext);

  // Para poder manipular Signals, la función debe de estar serializada de la siguiente manera $([función])
  const changePokemonId = $((value: number) => {
    if (pokemonGame.pokemonId + value <= 0) return; //Evaluamos que el valor del Signal no sea menor a 0
    if (pokemonGame.pokemonId + value > 1010) return; //Evaluamos que el valor del Signal no sea mayor a la cantidad de pokemons existentes (este control lo hacemos manual)

    pokemonGame.pokemonId += value;
  });

  const toggleFromBack = $(() => {
    pokemonGame.showBackImage = !pokemonGame.showBackImage
  });

  const toggleVisible = $(() => {
    pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible
  });

  return {
    pokemonId: useComputed$(() => pokemonGame.pokemonId),
    showBackImage: useComputed$(() => pokemonGame.showBackImage),
    isPokemonVisible: useComputed$(() => pokemonGame.isPokemonVisible),
    nextPokemon: $(() => changePokemonId(1)),
    previewPokemon: $(() => changePokemonId(-1)),
    toggleFromBack,
    toggleVisible
  }
}