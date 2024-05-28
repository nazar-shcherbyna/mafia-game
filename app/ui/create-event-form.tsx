'use client';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useFormState, useFormStatus } from 'react-dom';
import { createEvent } from '../events/lib/create';
import { UiButton } from './atoms/button';
import { UiFormCard } from './form/form-card';
import { UiFormInput } from './form/input';

export default function CreateEventForm() {
  const [formState, dispatch] = useFormState(createEvent, undefined);
  console.log(formState);

  return (
    <UiFormCard action={dispatch} label="New event">
      <Image
        width={200}
        height={200}
        src="/dev-create-game.png"
        alt="create-game-title"
        className="mx-auto mb-2"
      />
      <UiFormInput
        name="title"
        label="Event title"
        placeholder="Please enter"
        type="text"
        className="mb-3"
        errorMessages={formState?.errors.title}
      />
      <UiFormInput
        name="date"
        label="Date & time"
        placeholder="Please enter"
        className="mb-3"
        type="datetime-local"
        step={60}
        min={new Date().toDateString()}
        errorMessages={formState?.errors.date}
      />
      <UiFormInput
        name="location"
        label="Location"
        placeholder="Please select"
        type="text"
        errorMessages={formState?.errors.location}
      />
      <CreateButton />
      {formState?.message && (
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <ExclamationCircleIcon className="h-5 w-5 shrink-0 text-red-500" />
          <p className="text-sm text-red-500">{formState.message}</p>
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
