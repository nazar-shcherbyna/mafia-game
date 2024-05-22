'use client';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useFormState, useFormStatus } from 'react-dom';
import { registrate } from '../lib/auth/registrate';
import { UiButton } from './atoms/button';
import { UiFormCard } from './form/form-card';
import { UiFormInput } from './form/input';

export default function CreateGameForm() {
  const [errorMessage, dispatch] = useFormState(registrate, undefined);

  return (
    <UiFormCard action={dispatch} label="Create new game">
      <Image
        width={200}
        height={200}
        src="/dev-create-game.png"
        alt="create-game-title"
        className="mx-auto mb-2"
      />
      <UiFormInput
        name="name"
        label="Game name"
        placeholder="Please enter"
        type="text"
        className="mb-3"
      />
      <UiFormInput
        name="date"
        label="Date & time"
        placeholder="Please enter"
        className="mb-3"
        type="datetime-local"
        step={60}
        min={new Date().toISOString()}
      />
      <UiFormInput
        name="city"
        label="City"
        placeholder="Please select"
        type="text"
      />
      <CreateButton />
      {errorMessage && (
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <ExclamationCircleIcon className="h-5 w-5 shrink-0 text-red-500" />
          {/* TODO fix toString */}
          <p className="text-sm text-red-500">{errorMessage.toString()}</p>
        </div>
      )}
    </UiFormCard>
  );
}

function CreateButton() {
  const { pending } = useFormStatus();

  return (
    <UiButton className="mt-6" aria-disabled={pending}>
      Create
    </UiButton>
  );
}
