import { $, component$, useComputed$, useSignal, useStore } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { getSmallPokemons } from '~/helpers/getSmallPokemons';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ query, redirect, pathname }) => {
  const offset = Number(query.get('offset') || '0');

  if (isNaN(offset)) redirect(301, pathname);
  if (offset < 0) redirect(301, pathname);

  return await getSmallPokemons(offset);
})

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();

  const modalVisible = useSignal(false);
  const modalPokemon = useStore({
    id: '',
    name: ''
  });

  const showModal = $((id: string, name: string) => {
    modalPokemon.id = id;
    modalPokemon.name = name;
    modalVisible.value = true;
  });

  const CloseModal = $(() => {
    modalVisible.value = false;
  });

  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.search);
    return Number(offsetString.get('offset') || 0);
  })

  return (
    <div class='flex flex-col justify-center items-center'>
      <div class='flex justify-center items-center flex-col'>
        <span class='my-5 text-5xl'>Status</span>
        <span>Offset: {currentOffset}</span>
        <span>Está cargando página: {location.isNavigating ? 'Si' : 'No'}</span>
      </div>

      <div class="mt-10">
        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`} class='btn btn-primary mr-2'>Anterior</Link>
        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`} class='btn btn-primary'>Siguiente</Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {
          pokemons.value.map(({ name, id }) => (
            <div key={name} onClick$={() => showModal(id, name)} class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={id} />
              <span class='capitalize'>{name}</span>
            </div>
          ))
        }
      </div>

      <Modal showModal={modalVisible.value} closeFn={CloseModal}>
        <div q: slot='title'>
          {modalPokemon.name}
        </div>
        <div q: slot='content'>
          <PokemonImage id={modalPokemon.id} />
          <span>Preguntando a ChatGPT</span>
        </div>
      </Modal>
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