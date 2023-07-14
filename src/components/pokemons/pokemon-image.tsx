import { type Signal, component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: Signal<number>;
  size?: number;
  backImage: boolean;
}

export const PokemonImage = component$(({ id, size = 200, backImage = false }: Props) => {
  const imageLoaded = useSignal(false);

  //Hook que se ejecutará cuando se cumpla una condición (que se puede evaluar por medio del hook "track")
  useTask$(({ track }) => {
    track(() => id.value);
    //Para este caso: Si el valor de la variable "id" cambia, se ejecutará el siguiente bloque de código
    imageLoaded.value = false;
  });

  return (
    <div
      class='flex justify-center items-center'
      style={{ width: `${size}px`, height: `${size}px` }} >
      {!imageLoaded.value && <span>Cargando...</span>}
      <img
        width={64}
        height={64}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${backImage ? '/back/' : ''}${id.value}.png`}
        alt="Pokemon Sprite"
        style={{ width: `${size}px` }}
        onLoad$={() => { 
          setTimeout(() => { 
            imageLoaded.value = true;
          }, 2000);
        }}
        class={{ 
          'hidden': !imageLoaded.value 
        }} />
    </div>
  )
})