import { component$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';

export const usePokemonList = routeLoader$(async() => {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=10`);
  const data = await resp.json();

  return data;
})

export default component$(() => {
  return (
    <div class='flex flex-col justify-center items-center'>
      <div class='flex justify-center items-center flex-col'>
        <span class='my-5 text-5xl'>Status</span>
        <span>Página actual: xxx</span>
        <span>Está cargando página</span>
      </div>

      <div class="mt-10">
        <Link class='btn btn-primary mr-2'>Anterior</Link>
        <Link class='btn btn-primary'>Siguiente</Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
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