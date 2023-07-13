import { type Signal, component$ } from "@builder.io/qwik";

interface Props {
  id: Signal<number>;
  size?: number;
  backImage: boolean;
}

export const PokemonImage = component$(( { id, size = 200, backImage = false }: Props ) => {
  return (
    <>
      <img 
        width={64}
        height={64}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${backImage?'/back/':''}${id.value}.png`}
        alt="Pokemon Sprite"
        style={{ width: `${size}px` }} />
    </>
  )
})