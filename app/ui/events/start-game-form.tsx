'use client';

import { DBEventPlayerStatusEnum } from '@/app/@types/db-enums';
import { DBEventType, DBGameType, DBUserType } from '@/app/@types/db-types';
import { FetchEventPlayerType } from '@/app/lib/events/fetch';

import { startEvent } from '@/app/lib/events/start';
import { UiButton } from '@/app/ui/atoms/button';
import { settings } from '@/settings';
import { useFormState, useFormStatus } from 'react-dom';

export const StartGameForm: React.FC<{
  user: Pick<DBUserType, 'id'>;
  event: Pick<DBEventType, 'id'>;
  className?: string;
  countOfPlayerIdInEvent: number | null;
  eventPlayers: FetchEventPlayerType[];
  eventGames: DBGameType[];
}> = ({ event, user, className, countOfPlayerIdInEvent, eventPlayers }) => {
  const startEventWithAdminIdAndEventId = startEvent.bind(null, {
    admin_id: user.id,
    event_id: event.id,
  });

  const [formState, dispatch] = useFormState(
    startEventWithAdminIdAndEventId,
    null,
  );

  const activeEventPlayers = eventPlayers.filter(
    (player) => player.status === DBEventPlayerStatusEnum.active,
  );

  return (
    <form action={dispatch} className={className}>
      <StartButton
        disabled={activeEventPlayers.length < settings.eventMinPlayersCount}
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
