import { Slot, component$ } from '@builder.io/qwik';

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