import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';
import { usePokemonGame } from '~/hooks';

//Este hook lo vamos a poder usar para realizar validaciones antes de que se cargue la pantalla
export const usePokemonId = routeLoader$<number>(({ params, redirect}) => {
  const id = Number(params.id);

  // Evaluamos que el id sea numérico  esté dentro del rango de la cantidad de pokemons.
  // En caso de que no cumpla alguna condición, será redireccionado a la página de inicio
  if (isNaN(id)) redirect( 301, '/');
  if (id <= 0) redirect( 301, '/');
  if (id > 1010) redirect( 301, '/');

  return id;
})

export default component$(() => {
  const pokemonId = usePokemonId();

  const { toggleFromBack, toggleVisible, isPokemonVisible, showBackImage } = usePokemonGame();

  return (
    <div class='flex justify-center items-center flex-col'>
      <span class='text-5xl'>Pokemon: {pokemonId}</span>

      <PokemonImage id={pokemonId.value} backImage={showBackImage.value} isVisible={isPokemonVisible.value} />

      <div class='mt2'>
        <button onClick$={toggleFromBack} class='btn btn-primary mr-2'>Voltear</button>
        <button onClick$={toggleVisible} class='btn btn-primary'>Revelar</button>
      </div>
    </div>
  )
});