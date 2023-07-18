import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { PokemonGameContext, type PokemonGameState } from './pokemon-game.context';
import { PokemonListContext, type PokemonListState } from './pokemon-list.context';

export const PokemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 1,
    isPokemonVisible: true,
    showBackImage: false
  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: []
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  useVisibleTask$(() => {
    // Aqui vamos a leer infromacion desde el localstorage
    if(localStorage.getItem('pokemon-game')) {
      const {pokemonId = 10, isPokemonVisible = true, showBackImage = false} = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;

      pokemonGame.isPokemonVisible = isPokemonVisible;
      pokemonGame.pokemonId = pokemonId;
      pokemonGame.showBackImage = showBackImage;
    }
  });

  useVisibleTask$(({ track }) => {
    // Aqui vamos a guardar infromacion al localstorage
    track(() => [pokemonGame.isPokemonVisible, pokemonGame.pokemonId, pokemonGame.showBackImage]);

    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame))
  });

  return <Slot />
});