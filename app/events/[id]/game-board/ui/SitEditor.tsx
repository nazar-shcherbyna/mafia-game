import { DBGameType } from '@/app/@types/db-types';
import { findGamePlayerBySitPlace } from '@/app/dashboard/game/utils';
import { FetchGamePlayerType } from '@/app/lib/game-board/fetch';
import { gameBoardValidator } from '@/app/lib/game-board/validators';
import { SelectPlayerPositionForm } from '@/app/ui/game-board/select-player-position-form';
import { SelectRoleForm } from '@/app/ui/game-board/select-role-form';
import { SelectRoundPlayerStatusForm } from '@/app/ui/game-board/select-round-player-status-form';

export async function SitEditor({
  gamePlayers,
  game,
  position,
  gameBoardValidation,
}: {
  gamePlayers: FetchGamePlayerType[];
  game: DBGameType;
  position: number;
  gameBoardValidation: ReturnType<typeof gameBoardValidator>;
}) {
  const playerInPlace = findGamePlayerBySitPlace(position, gamePlayers);

  return (
    <>
      <PropertyWrapper>Edit Place: {position}</PropertyWrapper>

      <div className="my-5 flex flex-row gap-4">
        <div className="flex flex-col gap-2">
          <SelectPlayerPositionForm
            game={game}
            gamePlayers={gamePlayers}
            playerInPlace={playerInPlace}
            position={position}
          />

          {gameBoardValidation.passedConditions.includes('positions') &&
            playerInPlace && (
              <SelectRoleForm player={playerInPlace} game={game} />
            )}

          {gameBoardValidation.passedConditions.includes('roles') &&
            gameBoardValidation.passedConditions.includes('positions') &&
            playerInPlace && (
              <SelectRoundPlayerStatusForm
                playerRoundStatus={playerInPlace.player_status}
                game={game}
                player={playerInPlace}
              />
            )}
        </div>
      </div>
    </>
  );
}

const PropertyWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full items-center justify-between gap-2">
    {children}
  </div>
);
