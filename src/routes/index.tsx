import { component$, useSignal, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const pokemonId = useSignal(1); // Usarlo solo para valores primitivos (boolean, string, number)
  // const pokemonId = useStore(); // Usarlo solo para valores compuestos

  return (
    <div class='flex flex-col text-center'>
      <span class='text-2xl'>Buscador simple</span>
      <span class='text-9xl'>{pokemonId}</span>

      {/** TODO: Crear imagen */}
      <div class='mt2'>
        <button onClick$={ () => pokemonId.value-- } class='btn btn-primary mr-2'>Anterior</button>
        <button onClick$={ () => pokemonId.value++ } class='btn btn-primary'>Siguiente</button>
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
