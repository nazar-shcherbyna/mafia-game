import { DBGameType } from '@/app/@types/db-types';
import { UiBox } from '@/app/ui/atoms/box';

export const EventCardGames: React.FC<{
  eventGames: DBGameType[];
}> = ({ eventGames }) => {
  return (
    <>
      <h3 className="mb-1 mt-4 text-lg font-semibold text-[#CFD3EC]">Games</h3>
      <UiBox>
        {eventGames.length > 0 ? (
          <ul>
            {eventGames.map((game, index) => (
              <li className="block w-full text-lg" key={game.id}>
                {index + 1}.) rounds - {game.round}, vinner - {game.vinner}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-lg font-normal">Create game</div>
        )}
      </UiBox>
    </>
  );
};
