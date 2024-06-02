'use client';

import { EventType } from '@/app/@types/events';
import { UserType } from '@/app/@types/users';
import { joinEvent } from '@/app/lib/events/join';
import { UiButton } from '@/app/ui/atoms/button';
import { useFormState, useFormStatus } from 'react-dom';

export const JoinEventForm: React.FC<{
  user: Pick<UserType, 'id'>;
  event: Pick<EventType, 'id'>;
}> = ({ event, user }) => {
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
    <form action={dispatch}>
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
    <UiButton type="submit" className="mt-6 w-full" aria-disabled={pending}>
      Join
    </UiButton>
  );
}
