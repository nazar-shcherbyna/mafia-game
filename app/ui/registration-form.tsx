'use client';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';
import { registrate } from '../lib/auth/registrate';
import { UiButton } from './atoms/button';
import { UiFormCard } from './form/form-card';
import { UiFormInput } from './form/input';
import { UiFormInputPassword } from './form/input-password';
import { UiLink } from './link';

export default function RegistrationForm() {
  const [errorMessage, dispatch] = useFormState(registrate, undefined);

  return (
    <UiFormCard action={dispatch} label="Please register">
      <UiFormInput
        name="nickname"
        label="Nickname"
        placeholder="Create nickname"
        type="text"
        className="mb-3"
        errorMessages={errorMessage?.errors?.nickname}
      />
      <UiFormInputPassword
        name="password"
        label="Password"
        placeholder="Create password"
        className="mb-3"
        errorMessages={errorMessage?.errors?.password}
      />
      <UiFormInputPassword
        name="confirmPassword"
        label="Confirm password"
        placeholder="Confirm password"
        errorMessages={errorMessage?.errors?.confirmPassword}
      />
      <RegisterButton />
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
        <UiLink href="/login" className="ml-2">
          Login
        </UiLink>
      </div>
    </UiFormCard>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <UiButton className="mt-6" aria-disabled={pending}>
      Register
    </UiButton>
  );
}
