import { component$, useStore } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { SmallPokemon } from '~/interfaces';

interface PokemonPageState {
  currentPage: number;
  pokemons: SmallPokemon[];
}

export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    pokemons: []
  });
  
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

      <div class="grid grid-cols-6 mt-5">
        {/* {
          pokemons.value.map(({ name, id }) => (
            <div key={name} class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={id} />
              <span class='capitalize'>{name}</span>
            </div>
          ))
        } */}
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