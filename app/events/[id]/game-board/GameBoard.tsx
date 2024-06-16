'use client';

import { DBGameType } from '@/app/@types/db-types';
import { FetchGamePlayerType } from '@/app/lib/game-board/fetch';
import { gameBoardValidator } from '@/app/lib/game-board/validators';
import { useGameStore } from '@/app/store';
import { UiButton } from '@/app/ui/atoms/button';
import { Board } from './ui/Board';

export const GameBoard = ({
  game,
  gamePlayers,
}: {
  game: DBGameType;
  gamePlayers: FetchGamePlayerType[];
}) => {
  const round = useGameStore((state) => state.day);
  const isNight = useGameStore((state) => state.isNight);
  const resetState = useGameStore((state) => state.resetState);

  // const { nextRoundHandler, previousRoundHandler } = useChangeRoundHook();
  // useStartGame(gameId, registeredPlayers);

  const restartHandler = () => {
    if (!window.confirm('Do you sure? It will destroy this game')) return;
    resetState();
  };

  const gameBoardValidation = gameBoardValidator(game.round, gamePlayers);

  return (
    <div className="relative flex w-full grow-0 flex-col items-center px-24 py-32">
      <h3 className="absolute -top-2">{gameBoardValidation.message}</h3>
      <div className="absolute top-6 flex w-full items-center justify-between">
        <UiButton
          // onClick={previousRoundHandler}
          aria-disabled={!round && !isNight}
          disabled={!round && !isNight}
        >
          Previous Round
        </UiButton>
        <div>
          {game.turn}: {game.round}
        </div>
        <UiButton
          disabled={gameBoardValidation.disableNextRound}
          aria-disabled={gameBoardValidation.disableNextRound}
          // onClick={nextRoundHandler}
        >
          Next Round
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
