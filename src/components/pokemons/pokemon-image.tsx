import { component$ } from "@builder.io/qwik";

interface Props {
  id: number;
  size?: number;
}

export const PokemonImage = component$(( props: Props ) => {
  return (
    <>
      <img 
        width={64}
        height={64}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}
        alt="Pokemon Sprite"
        style={{ width: `${props.size}px` }} />
    </>
  )
})