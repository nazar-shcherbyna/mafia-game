'use client';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';
import { registrate } from '../lib/auth/registrate';
import { Button } from './atoms/button';
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
        placeholder="Enter your nickname"
        type="text"
        className="mb-3"
      />
      <UiFormInputPassword
        name="password"
        label="Password"
        placeholder="Enter your password"
        className="mb-3"
      />
      <UiFormInputPassword
        name="confirmPassword"
        label="Confirm password"
        placeholder="Enter your password"
      />
      <RegisterButton />
      {errorMessage && (
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{errorMessage}</p>
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
    <Button className="mt-6" aria-disabled={pending}>
      Register
    </Button>
  );
}
