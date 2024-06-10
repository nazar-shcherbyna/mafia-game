'use client';

import { DBUserRolesEnum } from '@/app/@types/db-enums';
import { DBEventType, DBGameType, DBUserType } from '@/app/@types/db-types';
import { canPlayerJoinEvent } from '@/app/lib/utils';
import NoSSR from '@/app/ui/no-ssr';
import { UiBox } from '../atoms/box';
import { BtnToGameBoard } from './btn-to-game-board';
import { EventCardDescription } from './event-card-description';
import { EventCardPlayers } from './event-card-players';
import { JoinEventForm } from './join-event-form';
import { StartGameForm } from './start-game-form';

export function EventCard({
  user,
  event,
  eventUsers,
  eventModerator,
  countOfPlayerIdInEvent,
  eventActiveGames,
}: {
  user: DBUserType;
  event: DBEventType;
  eventUsers: Pick<DBUserType, 'id' | 'nickname'>[];
  eventModerator: Pick<DBUserType, 'id' | 'nickname'>;
  countOfPlayerIdInEvent: number | null;
  eventActiveGames: DBGameType[];
}) {
  const canJoinToEvent = canPlayerJoinEvent(
    user,
    event,
    eventUsers,
    countOfPlayerIdInEvent,
  );

  return (
    <NoSSR>
      <UiBox className="w-[300px] p-10 sm:w-[440px] md:w-[610px]">
        <EventCardDescription
          user={user}
          event={event}
          eventModerator={eventModerator}
        />
        <EventCardPlayers eventUsers={eventUsers} />
        {user.role === DBUserRolesEnum.admin &&
          (eventActiveGames.length === 0 ? (
            <StartGameForm event={event} user={user} className="mt-6" />
          ) : (
            <BtnToGameBoard
              eventId={event.id}
              className="mt-6 block w-full text-center"
            />
          ))}
        {user.role === DBUserRolesEnum.player && canJoinToEvent && (
          <JoinEventForm className="mt-6" event={event} user={user} />
        )}
      </UiBox>
    </NoSSR>
  );
}
