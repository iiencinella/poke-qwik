import { Slot, component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

// Validamos si el usuario inició sesión, caso contrario se manda a la página de inicio de sesión
export const useCheckAuthCookie = routeLoader$(({cookie, redirect}) => {
  const jwtCookie = cookie.get('jwt');

  if(jwtCookie) {
    console.log('Cookie válido: ', jwtCookie);
    return 
  }

  redirect(302, '/login');
});

export default component$(() => {
  return (
    <>
      <div class='flex flex-col items-center justify-center'>
        <h3>Dashboard Layout</h3>
        <Slot />
      </div>
    </>
  )
});