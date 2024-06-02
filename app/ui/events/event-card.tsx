'use client';

import { EventType } from '@/app/@types/events';
import { PlayerType } from '@/app/@types/types';
import { UserType } from '@/app/@types/users';
import NoSSR from '@/app/ui/no-ssr';
import { settings } from '@/settings';
import Image from 'next/image';
import { UiBox } from '../atoms/box';
import { JoinEventForm } from './join-event-form';

export function EventCard({
  user,
  event,
  eventPlayers,
  countOfPlayerIdInEvent,
}: {
  user: UserType | null;
  event: EventType;
  eventPlayers: Pick<PlayerType, 'id' | 'nickname'>[];
  countOfPlayerIdInEvent: number | null;
}) {
  const canJoinToEvent =
    user &&
    user?.role === 'player' &&
    ['created', 'in-process'].includes(event.status) &&
    countOfPlayerIdInEvent === 0 &&
    eventPlayers.length < settings.eventMaxPlayersCount;

  return (
    <NoSSR>
      <UiBox className="w-[300px] p-10 sm:w-[440px] md:w-[610px]">
        <div className="mb-4">
          <h3 className="mb-1 text-lg font-semibold text-[#CFD3EC]">
            Event name
          </h3>
          <p className="text-lg font-normal text-[#746BD4]">{event.title}</p>
        </div>
        <div className="mb-4">
          <h3 className="mb-1 text-lg font-semibold text-[#CFD3EC]">
            Date & Time
          </h3>
          <p className="text-lg font-normal text-[#746BD4]">
            {event.date.toLocaleString()}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="mb-1 text-lg font-semibold text-[#CFD3EC]">
            Location
          </h3>
          <p className="text-lg font-normal text-[#746BD4]">{event.location}</p>
        </div>
        <div>
          <h3 className="mb-1 text-lg font-semibold text-[#CFD3EC]">Players</h3>

          <UiBox>
            {eventPlayers.length > 0 ? (
              <ul className="grid grid-cols-6 gap-5">
                {eventPlayers.map((player) => (
                  <li className="truncate text-center text-lg" key={player.id}>
                    <Image
                      width={65}
                      height={65}
                      src="/dev-event-card.png"
                      alt="create-game-title"
                      className="mb-1"
                    />
                    {player.nickname}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-lg font-normal">No players yet</div>
            )}
          </UiBox>
          {canJoinToEvent && <JoinEventForm event={event} user={user} />}
        </div>
      </UiBox>
    </NoSSR>
  );
}
