'use client';

import { RegisteredPlayerGameType } from '@/app/@types/types';
import { useChangeRoundHook } from '@/app/dashboard/game/hooks/changeRoundHook';
import { useStartGame } from '@/app/dashboard/game/hooks/useStartGameHook';
import { Board } from '@/app/dashboard/game/ui/Board';
import { useGameStore } from '@/app/store';
import { UiButton } from '@/app/ui/atoms/button';
import { useDisableNextRound } from './hooks/useDisableNextRound';

export const GameBoard = ({
  gameId,
  registeredPlayers,
}: {
  gameId: string;
  registeredPlayers: RegisteredPlayerGameType[];
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
    <div className="relative flex w-full flex-col items-center pt-[5vw]">
      <div className="relative top-[-5vw] flex w-full flex-row items-center justify-between px-[10vw]">
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

      <Board />

      <div className="relative bottom-[-1vw] mb-2 flex w-full flex-row items-center justify-between px-[10vw]">
        <UiButton onClick={restartHandler}>Restart</UiButton>
      </div>
    </div>
  );
};
