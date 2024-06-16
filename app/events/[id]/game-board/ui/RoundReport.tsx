'use client';

import {
  DBGameRoundPlayerStatusEnum,
  DBGameTurnEnum,
} from '@/app/@types/db-enums';
import { DBGameType } from '@/app/@types/db-types';
import { FetchGamePlayerType } from '@/app/lib/game-board/fetch';
import { useGameStore } from '@/app/store';
import { UiButton } from '@/app/ui/atoms/button';

export const RoundReport: React.FC<{
  game: DBGameType;
  gamePlayers: FetchGamePlayerType[];
}> = ({ game, gamePlayers }) => {
  const setIsOpenRoundReport = useGameStore(
    (state) => state.setIsOpenRoundReport,
  );

  return (
    <div>
      <div>
        Report after the last{' '}
        {game.turn === DBGameTurnEnum.day
          ? DBGameTurnEnum.night
          : DBGameTurnEnum.day}
        :
      </div>

      <div>
        {gamePlayers
          .filter(
            (player) =>
              player.player_status !== DBGameRoundPlayerStatusEnum.alive,
          )
          .map((player, index) => (
            <div className="mt-3" key={index}>
              {player.position_number}. {player.nickname} -{' '}
              {player.player_status}
            </div>
          ))}
      </div>

      <UiButton className="mt-3" onClick={() => setIsOpenRoundReport(false)}>
        Close Report
      </UiButton>
    </div>
  );
};
