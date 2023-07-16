import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const pokemonId = useSignal(1); // Usarlo solo para valores primitivos (boolean, string, number)
  // const pokemonId = useStore(); // Usarlo solo para valores compuestos

  const showBackImage = useSignal(false);
  const isPokemonVisible = useSignal(false);

  const nav = useNavigate();

  // Para poder manipular Signals, la función debe de estar serializada de la siguiente manera $([función])
  const changePokemonId = $((value:number) => {
    if(pokemonId.value + value <= 0) return; //Evaluamos que el valor del Signal no sea menor a 0
    if(pokemonId.value + value > 1010) return; //Evaluamos que el valor del Signal no sea mayor a la cantidad de pokemons existentes (este control lo hacemos manual)

    pokemonId.value += value;
  })

  const changeShowBackImage = $(() => {
    showBackImage.value = !showBackImage.value;
  })

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonId.value}`);
  })

  return (
    <div class='flex flex-col justify-center items-center'>
      <span class='text-2xl'>Buscador simple</span>
      <span class='text-9xl'>{pokemonId}</span>

      <div onClick$={() => goToPokemon()}>
        <PokemonImage id={pokemonId.value} backImage={showBackImage.value} isVisible={isPokemonVisible.value} />
      </div>

      <div class='mt2'>
        <button onClick$={() => changePokemonId(-1)} class='btn btn-primary mr-2'>Anterior</button>
        <button onClick$={() => changePokemonId(1)} class='btn btn-primary mr-2'>Siguiente</button>
        <button onClick$={() => changeShowBackImage()} class='btn btn-primary mr-2'>Voltear</button>
        <button onClick$={() => isPokemonVisible.value = !isPokemonVisible.value} class='btn btn-primary'>Revelar</button>
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
