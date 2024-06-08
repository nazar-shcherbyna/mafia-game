'use client';

import { EventType } from '@/app/@types/events';
import { UserType } from '@/app/@types/users';
import { canPlayerJoinEvent } from '@/app/lib/utils';
import NoSSR from '@/app/ui/no-ssr';
import { UiBox } from '../atoms/box';
import { EventCardDescription } from './event-card-description';
import { EventCardPlayers } from './event-card-players';
import { JoinEventForm } from './join-event-form';

export function EventCard({
  user,
  event,
  eventUsers,
  eventModerator,
  countOfPlayerIdInEvent,
}: {
  user: UserType;
  event: EventType;
  eventUsers: Pick<UserType, 'id' | 'nickname'>[];
  eventModerator: Pick<UserType, 'id' | 'nickname'>;
  countOfPlayerIdInEvent: number | null;
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
        {canJoinToEvent && (
          <JoinEventForm className="mt-6" event={event} user={user} />
        )}
      </UiBox>
    </NoSSR>
  );
}
