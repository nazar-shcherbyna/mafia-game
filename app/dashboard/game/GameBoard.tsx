'use client';

import { RegisteredUserGameType } from '@/app/@types/types';
import { useChangeRoundHook } from '@/app/dashboard/game/hooks/changeRoundHook';
import { useStartGame } from '@/app/dashboard/game/hooks/useStartGameHook';
import { useGameStore } from '@/app/store';
import { UiButton } from '@/app/ui/atoms/button';
import { useDisableNextRound } from './hooks/useDisableNextRound';

export const GameBoard = ({
  gameId,
  registeredPlayers,
}: {
  gameId: string;
  registeredPlayers: RegisteredUserGameType[];
}) => {
  const round = useGameStore((state) => state.day);
  const isNight = useGameStore((state) => state.isNight);
  const resetState = useGameStore((state) => state.resetState);

  const { nextRoundHandler, previousRoundHandler } = useChangeRoundHook();
  useStartGame(gameId, registeredPlayers);

  const restartHandler = () => {
    if (!window.confirm('Do you sure? It will destroy this game')) return;
    resetState();
  };

  const { isDisabledDayRound, isDisabledNightRound } = useDisableNextRound();

  return (
    <div className="relative flex w-full grow-0 flex-col items-center py-20">
      <div className="absolute top-3 flex w-full items-center justify-between">
        <UiButton
          onClick={previousRoundHandler}
          aria-disabled={!round && !isNight}
          disabled={!round && !isNight}
        >
          Previous Round
        </UiButton>
        <div>
          {isNight ? 'Night' : 'Day'}: {round}
        </div>
        <UiButton
          disabled={
            round !== 0 && isNight ? isDisabledNightRound : isDisabledDayRound
          }
          aria-disabled={
            round !== 0 && isNight ? isDisabledNightRound : isDisabledDayRound
          }
          onClick={nextRoundHandler}
        >
          Next Round
        </UiButton>
      </div>

      {/* <Board /> */}

      <div className="absolute bottom-3 flex w-full items-center justify-between">
        <UiButton onClick={restartHandler}>Restart</UiButton>
      </div>
    </div>
  );
};
