import { component$, useStore, useTask$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/getSmallPokemons';
import type { SmallPokemon } from '~/interfaces';

interface PokemonPageState {
  currentPage: number;
  pokemons: SmallPokemon[];
}

export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    pokemons: []
  });

  // Este hook lo vamos a poder ejecutar cuando se cargue la vista en el cliente
  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);
    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);

    pokemonState.pokemons = pokemons;
  })

  return (
    <div class='flex flex-col justify-center items-center'>
      <div class='flex justify-center items-center flex-col'>
        <span class='my-5 text-5xl'>Status</span>
        <span>Página actual: {pokemonState.currentPage}</span>
        <span>Está cargando: </span>
      </div>

      <div class="mt-10">
        <button onClick$={() => pokemonState.currentPage--} class='btn btn-primary mr-2'>Anterior</button>
        <button onClick$={() => pokemonState.currentPage++} class='btn btn-primary'>Siguiente</button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {
          pokemonState.pokemons.map(({ name, id }) => (
            <div key={name} class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={id} />
              <span class='capitalize'>{name}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
});

export const head: DocumentHead = {
  title: "Poke Qwik",
  meta: [
    {
      name: "description",
      content: "Esta es mi primera aplicación en Qwik",
    },
  ],
};