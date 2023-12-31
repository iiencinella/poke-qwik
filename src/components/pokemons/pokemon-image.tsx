import { component$, useSignal, useTask$, useComputed$ } from "@builder.io/qwik";

interface Props {
  id: number | string;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(({ id, size = 200, backImage = false, isVisible = true }: Props) => {
  const imageLoaded = useSignal(false);

  //Hook que se ejecutará cuando se cumpla una condición (que se puede evaluar por medio del hook "track")
  useTask$(({ track }) => {
    track(() => id);
    //Para este caso: Si el valor de la variable "id" cambia, se ejecutará el siguiente bloque de código
    imageLoaded.value = false;
  });

  const imageUrl = useComputed$(() => {
    if(id === '') return '';
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${backImage ? '/back/' : ''}${id}.png`;
  })

  return (
    <div
      class='flex justify-center items-center'
      style={{ width: `${size}px`, height: `${size}px` }} >
      {!imageLoaded.value && <span>Cargando...</span>}
      <img
        width={64}
        height={64}
        src={imageUrl.value}
        alt="Pokemon Sprite"
        style={{ width: `${size}px` }}
        onLoad$={() => { imageLoaded.value = true; }}
        class={[{ 
          'hidden': !imageLoaded.value, 
          'brightness-0': !isVisible
        }, 'transition-all']} />
    </div>
  )
})