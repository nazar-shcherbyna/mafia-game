'use client';

import { DBGameType } from '@/app/@types/db-types';
import { FetchGamePlayerType } from '@/app/lib/game-board/fetch';
import { gameBoardValidator } from '@/app/lib/game-board/validators';
import { useGameStore } from '@/app/store';
import { UiButton } from '@/app/ui/atoms/button';
import { NextRoundForm } from '@/app/ui/game-board/next-round-form';
import { Board } from './ui/Board';

export const GameBoard = ({
  game,
  gamePlayers,
}: {
  game: DBGameType;
  gamePlayers: FetchGamePlayerType[];
}) => {
  const gameBoardValidation = gameBoardValidator(game, gamePlayers);
  const isOpenRoundReport = useGameStore((state) => state.isOpenRoundReport);
  const setIsOpenRoundReport = useGameStore(
    (state) => state.setIsOpenRoundReport,
  );

  const handleOpenRoundReport = () => {
    setIsOpenRoundReport(true);
  };

  return (
    <div className="relative flex w-full grow-0 flex-col items-center px-24 py-32">
      <h3 className="absolute -top-2">{gameBoardValidation.message}</h3>
      <div className="absolute left-1/2 top-6 -translate-x-1/2">
        <div>
          {game.turn}: {game.round}
        </div>
      </div>
      <div className="absolute right-0 top-6">
        <NextRoundForm
          game={game}
          gamePlayers={gamePlayers}
          gameBoardValidation={gameBoardValidation}
        />
      </div>
      <div className="absolute left-0 top-6">
        <UiButton disabled={isOpenRoundReport} onClick={handleOpenRoundReport}>
          Show round report
        </UiButton>
      </div>

      <Board
        game={game}
        gamePlayers={gamePlayers}
        gameBoardValidation={gameBoardValidation}
      />
    </div>
  );
};
