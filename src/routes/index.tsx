import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const pokemonId = useSignal(1); // Usarlo solo para valores primitivos (boolean, string, number)
  // const pokemonId = useStore(); // Usarlo solo para valores compuestos

  // Para poder manipular Signals, la función debe de estar serializada de la siguiente manera $([función])
  const changePokemonId = $((value:number) => {
    if(pokemonId.value + value <= 0) return; //Evaluamos que el valor del Signal no sea menor a 0
    if(pokemonId.value + value > 1010) return; //Evaluamos que el valor del Signal no sea mayor a la cantidad de pokemons existentes (este control lo hacemos manual)

    pokemonId.value += value;
  })

  return (
    <div class='flex flex-col justify-center items-center'>
      <span class='text-2xl'>Buscador simple</span>
      <span class='text-9xl'>{pokemonId}</span>

      <img 
        width={64}
        height={64}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`}
        alt="Pokemon Sprite"
        style={{ width: '200px' }} />

      <div class='mt2'>
        <button onClick$={() => changePokemonId(-1)} class='btn btn-primary mr-2'>Anterior</button>
        <button onClick$={() => changePokemonId(1)} class='btn btn-primary'>Siguiente</button>
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
