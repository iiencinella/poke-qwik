
import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, routeAction$ } from '@builder.io/qwik-city';

import styles from './login.css?inline';

export const useLoginUserAction = routeAction$((data, event) => {
  const {email, password} = data;

  if(email === 'iiencinella@outlook.es' && password === '123456') {
    return {
      success: true,
      jwt: 'esto_es_un_jwt'
    }
  }

  return {
    success: false
  }
});

export default component$(() => {
  useStylesScoped$(styles);

  const action = useLoginUserAction();

  return (
    <Form action={action} class="login-form mt-5">
      <div class="relative">
        <input
          name="email"
          type="text"
          placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          name="password"
          type="password"
          placeholder="Password" />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type='submit'>Ingresar</button>
      </div>

      <p>
        {action.value?.success && (
          <code>Autenticado. Token: {action.value?.jwt}</code>
        )}
      </p>

      {/* <code>
        {JSON.stringify(action.value, undefined, 2)}
      </code> */}
    </Form>
  )
});