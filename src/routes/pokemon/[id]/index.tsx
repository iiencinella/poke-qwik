import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {
  const location = useLocation();

  return (
    <div class='flex justify-center items-center flex-col'>
      <span class='text-5xl'>Pokemon: {location.params.id}</span>

      <PokemonImage id={location.params.id} />
    </div>
  )
});