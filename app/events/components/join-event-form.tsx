'use client';

import { DBEventType, DBUserType } from '@/app/@types/db-types';

import { joinEvent } from '@/app/lib/events/join';
import { UiButton } from '@/app/ui/atoms/button';
import { useFormState, useFormStatus } from 'react-dom';

export const JoinEventForm: React.FC<{
  user: Pick<DBUserType, 'id'>;
  event: Pick<DBEventType, 'id'>;
  className?: string;
}> = ({ event, user, className }) => {
  const joinEventWithPlayerIdAndEventId = joinEvent.bind(
    null,
    user.id,
    event.id,
  );

  const [formState, dispatch] = useFormState(
    joinEventWithPlayerIdAndEventId,
    null,
  );
  return (
    <form action={dispatch} className={className}>
      <JoinButton />
      {formState?.message && (
        <p className="mt-4 text-red-500">{formState.message}</p>
      )}
    </form>
  );
};

function JoinButton() {
  const { pending } = useFormStatus();

  return (
    <UiButton
      type="submit"
      className="w-full"
      disabled={pending}
      aria-disabled={pending}
    >
      Join
    </UiButton>
  );
}
