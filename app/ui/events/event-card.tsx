'use client';

import { DBGameStatusEnum, DBUserRolesEnum } from '@/app/@types/db-enums';
import { DBEventType, DBGameType, DBUserType } from '@/app/@types/db-types';
import { FetchEventPlayerType } from '@/app/lib/events/fetch';
import { canPlayerJoinEvent } from '@/app/lib/utils';
import NoSSR from '@/app/ui/no-ssr';
import { UiBox } from '../atoms/box';
import { BtnToGameBoard } from './btn-to-game-board';
import { EventCardDescription } from './event-card-description';
import { EventCardGames } from './event-card-games';
import { EventCardPlayers } from './event-card-players';
import { JoinEventForm } from './join-event-form';
import { StartGameForm } from './start-game-form';

export function EventCard({
  user,
  event,
  eventPlayers,
  eventModerator,
  countOfPlayerIdInEvent,
  eventGames,
}: {
  user: DBUserType;
  event: DBEventType;
  eventPlayers: FetchEventPlayerType[];
  eventModerator: Pick<DBUserType, 'id' | 'nickname'>;
  countOfPlayerIdInEvent: number | null;
  eventGames: DBGameType[];
}) {
  const canJoinToEvent = canPlayerJoinEvent(
    user,
    event,
    eventPlayers,
    countOfPlayerIdInEvent,
  );

  const activeEventGames = eventGames.find(
    (game) => game.status === DBGameStatusEnum.started,
  );

  console.log('eventGames', eventGames);

  return (
    <NoSSR>
      <UiBox className="w-[300px] p-10 sm:w-[440px] md:w-[610px]">
        <EventCardDescription
          user={user}
          event={event}
          eventModerator={eventModerator}
        />
        <EventCardPlayers eventUsers={eventPlayers} />
        <EventCardGames eventGames={eventGames} />
        {user.role === DBUserRolesEnum.admin &&
          (!activeEventGames ? (
            <StartGameForm
              event={event}
              user={user}
              countOfPlayerIdInEvent={countOfPlayerIdInEvent}
              className="mt-6"
              eventPlayers={eventPlayers}
              eventGames={eventGames}
            />
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
