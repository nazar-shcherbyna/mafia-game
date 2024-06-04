'use client';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from '../lib/auth/login';
import { UiButton } from './atoms/button';
import { UiFormCard } from './form/form-card';
import { UiFormInput } from './form/input';
import { UiFormInputPassword } from './form/input-password';
import { UiLink } from './link';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(login, undefined);

  return (
    <UiFormCard action={dispatch} label="Please login">
      <UiFormInput
        name="nickname"
        label="Nickname"
        placeholder="Enter your nickname"
        type="text"
        className="mb-3"
        errorMessages={errorMessage?.errors?.nickname}
      />
      <UiFormInputPassword
        name="password"
        label="Password"
        placeholder="Enter your password"
        errorMessages={errorMessage?.errors?.password}
      />
      <LoginButton />

      {errorMessage?.message && (
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{errorMessage.message}</p>
        </div>
      )}

      <div className="mt-6">
        Or, please:
        <UiLink href="/registration" className="ml-2">
          Sign up
        </UiLink>
      </div>
    </UiFormCard>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <UiButton className="mt-6" aria-disabled={pending}>
      Sign in
    </UiButton>
  );
}
