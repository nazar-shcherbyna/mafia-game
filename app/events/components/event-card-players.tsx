import { DBUserType } from '@/app/@types/db-types';
import { UiBox } from '@/app/ui/atoms/box';
import Image from 'next/image';

export const EventCardPlayers: React.FC<{
  eventUsers: Pick<DBUserType, 'id' | 'nickname'>[];
}> = ({ eventUsers }) => {
  return (
    <>
      <h3 className="mb-1 text-lg font-semibold text-[#CFD3EC]">Players</h3>
      <UiBox>
        {eventUsers.length > 0 ? (
          <ul className="grid grid-cols-6 gap-5">
            {eventUsers.map((player) => (
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
    </>
  );
};
