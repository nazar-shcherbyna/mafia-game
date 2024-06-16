'use client';

import { DBEventType, DBUserType } from '@/app/@types/db-types';

import { startEvent } from '@/app/lib/events/start';
import { UiButton } from '@/app/ui/atoms/button';
import { settings } from '@/settings';
import { useFormState, useFormStatus } from 'react-dom';

export const StartGameForm: React.FC<{
  user: Pick<DBUserType, 'id'>;
  event: Pick<DBEventType, 'id'>;
  className?: string;
  countOfPlayerIdInEvent: number | null;
}> = ({ event, user, className, countOfPlayerIdInEvent }) => {
  const startEventWithAdminIdAndEventId = startEvent.bind(
    null,
    user.id,
    event.id,
  );

  const [formState, dispatch] = useFormState(
    startEventWithAdminIdAndEventId,
    null,
  );
  return (
    <form action={dispatch} className={className}>
      <StartButton
        disabled={
          countOfPlayerIdInEvent === 0 ||
          (countOfPlayerIdInEvent || 0) < settings.eventMinPlayersCount
        }
      />
      {formState?.message && (
        <p className="mt-4 text-red-500">{formState.message}</p>
      )}
    </form>
  );
};

function StartButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <UiButton
      type="submit"
      className="w-full"
      disabled={disabled || pending}
      aria-disabled={disabled || pending}
    >
      Start game
    </UiButton>
  );
}
