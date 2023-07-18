/**
 * Este hook personalizado lo desarrollamos para entender como se pueden usar en Qwik
 */
import { $, useComputed$, useSignal } from "@builder.io/qwik";

export const useCounter = (initialValue: number) => {
  const counter = useSignal(initialValue);

  const increaseCounter = $(() => {
    counter.value++;
  });

  const decreaseCounter = $(() => {
    counter.value--;
  });

  return {
    counter: useComputed$(() => counter.value), //Aqui convertimos al dato de "solo lectura"
    increase: increaseCounter,
    decrease: decreaseCounter
  };
}