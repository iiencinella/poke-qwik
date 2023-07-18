import { $, component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks";

export default component$(() => {
  const nav = useNavigate();

  const {isPokemonVisible, pokemonId, showBackImage, nextPokemon, previewPokemon, toggleFromBack, toggleVisible} = usePokemonGame();

  const goToPokemon = $((id: number) => {
    nav(`/pokemon/${id}`);
  })

  return (
    <div class='flex flex-col justify-center items-center'>
      <span class='text-2xl'>Buscador simple</span>
      <span class='text-9xl'>{pokemonId.value}</span>

      <div onClick$={() => goToPokemon(pokemonId.value)}>
        <PokemonImage id={pokemonId.value} backImage={showBackImage.value} isVisible={isPokemonVisible.value} />
      </div>

      <div class='mt2'>
        <button onClick$={previewPokemon} class='btn btn-primary mr-2'>Anterior</button>
        <button onClick$={nextPokemon} class='btn btn-primary mr-2'>Siguiente</button>
        <button onClick$={toggleFromBack} class='btn btn-primary mr-2'>Voltear</button>
        <button onClick$={toggleVisible} class='btn btn-primary'>Revelar</button>
      </div>
    </div>
  );
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
