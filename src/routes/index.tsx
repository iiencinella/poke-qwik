import { $, component$, useContext } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";

export default component$(() => {
  const nav = useNavigate();

  const pokemonGame = useContext(PokemonGameContext);

  // Para poder manipular Signals, la función debe de estar serializada de la siguiente manera $([función])
  const changePokemonId = $((value:number) => {
    if(pokemonGame.pokemonId + value <= 0) return; //Evaluamos que el valor del Signal no sea menor a 0
    if(pokemonGame.pokemonId + value > 1010) return; //Evaluamos que el valor del Signal no sea mayor a la cantidad de pokemons existentes (este control lo hacemos manual)

    pokemonGame.pokemonId += value;
  })

  const changeShowBackImage = $(() => {
    pokemonGame.showBackImage = !pokemonGame.showBackImage;
  })

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonGame.pokemonId}`);
  })

  return (
    <div class='flex flex-col justify-center items-center'>
      <span class='text-2xl'>Buscador simple</span>
      <span class='text-9xl'>{pokemonGame.pokemonId}</span>

      <div onClick$={() => goToPokemon()}>
        <PokemonImage id={pokemonGame.pokemonId} backImage={pokemonGame.showBackImage} isVisible={pokemonGame.isPokemonVisible} />
      </div>

      <div class='mt2'>
        <button onClick$={() => changePokemonId(-1)} class='btn btn-primary mr-2'>Anterior</button>
        <button onClick$={() => changePokemonId(1)} class='btn btn-primary mr-2'>Siguiente</button>
        <button onClick$={() => changeShowBackImage()} class='btn btn-primary mr-2'>Voltear</button>
        <button onClick$={() => pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible} class='btn btn-primary'>Revelar</button>
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
