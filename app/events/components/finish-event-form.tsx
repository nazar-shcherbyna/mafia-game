'use client';

import { DBEventType, DBGameType } from '@/app/@types/db-types';
import { finishEvent } from '@/app/lib/events/finish';

import { validateFinishEvent } from '@/app/lib/events/validators';
import { UiButton } from '@/app/ui/atoms/button';
import { useFormState, useFormStatus } from 'react-dom';

export const FinishEventForm: React.FC<{
  event: Pick<DBEventType, 'id'>;
  eventGames: DBGameType[];
  className?: string;
}> = ({ event, className, eventGames }) => {
  const { disableAction } = validateFinishEvent(eventGames);

  const finishEventWithParams = finishEvent.bind(null, event.id);

  const [formState, dispatch] = useFormState(finishEventWithParams, null);

  return (
    <form action={dispatch} className={className}>
      <ActionButton disabled={disableAction} />
      {formState?.message && (
        <p className="mt-4 text-red-500">{formState.message}</p>
      )}
    </form>
  );
};

function ActionButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <UiButton
      type="submit"
      className="w-full"
      disabled={disabled || pending}
      aria-disabled={disabled || pending}
    >
      Finish event
    </UiButton>
  );
}
