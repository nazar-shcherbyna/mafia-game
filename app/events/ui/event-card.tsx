'use client';

import { EventType } from '@/app/@types/events';
import { PlayerType } from '@/app/@types/types';
import { UserType } from '@/app/@types/users';
import { joinEvent } from '@/app/lib/events/join';
import NoSSR from '@/app/ui/no-ssr';
import Image from 'next/image';
import { UiBox } from '../../ui/atoms/box';
import { UiButton } from '../../ui/atoms/button';

export function EventCard({
  user,
  event,
  eventPlayers,
}: {
  user: UserType | null;
  event: EventType;
  eventPlayers: Pick<PlayerType, 'id' | 'nickname'>[];
}) {
  const canRenderJoinButton =
    user?.role === 'player' && ['created', 'in-process'].includes(event.status);

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
                  <li className="text-center text-lg" key={player.id}>
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
          {canRenderJoinButton && (
            <UiButton
              className="mt-6 w-full"
              onClick={() => {
                console.log({
                  user,
                  event,
                });

                joinEvent(user.id, event.id);
              }}
            >
              Join
            </UiButton>
          )}
        </div>
      </UiBox>
    </NoSSR>
  );
}
