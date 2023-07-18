import { component$, Slot } from "@builder.io/qwik";
import Nabvar from "~/components/shared/navbar/nabvar";
import { PokemonProvider } from "~/context";

export default component$(() => {

  return (
    <PokemonProvider>
      <Nabvar />
      <main>
        <Slot />
      </main>
    </PokemonProvider>

  );
});
