'use client';

import { settings } from '@/settings';
import { UserIcon } from '@heroicons/react/20/solid';
import { ExclamationCircleIcon, KeyIcon } from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '../lib/auth/authenticate';
import { Button } from './button';
import { UiFormCard } from './form/form-card';
import { UiFormInput } from './form/input';
import { UiLink } from './link';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <UiFormCard action={dispatch} label="Please login">
      <UiFormInput
        name="nickname"
        icon={
          <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        }
        label="Nickname"
        placeholder="Enter your nickname"
        type="text"
      />
      <UiFormInput
        name="password"
        icon={
          <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        }
        label="Password"
        placeholder="Enter your nickname"
        required
        minLength={settings.password.minLength}
        type="password"
      />
      <LoginButton />

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
    <Button className="mt-6" aria-disabled={pending}>
      Sign in
    </Button>
  );
}
