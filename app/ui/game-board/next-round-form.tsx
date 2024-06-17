'use client';

import { DBGameType } from '@/app/@types/db-types';
import { FetchGamePlayerType } from '@/app/lib/game-board/fetch';
import { nextGameRound } from '@/app/lib/game-board/next-round';
import { gameBoardValidator } from '@/app/lib/game-board/validators';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { UiButton } from '../atoms/button';

export interface NextRoundFormStateType {
  message: string;
}

export const NextRoundForm: React.FC<{
  game: DBGameType;
  gamePlayers: FetchGamePlayerType[];
  gameBoardValidation: ReturnType<typeof gameBoardValidator>;
}> = ({ game, gamePlayers, gameBoardValidation }) => {
  const nextGameRoundWithParams = nextGameRound.bind(null, {
    game,
    gamePlayers,
  });
  const [formState, dispatch] = useFormState<
    NextRoundFormStateType | undefined
    // @ts-ignore
  >(nextGameRoundWithParams, undefined);

  return (
    <form action={dispatch}>
      <input type="hidden" name="round" value={2} />
      <ActionButton disabled={gameBoardValidation.disableNextRound} />
      {formState?.message && (
        <div
          className="flex items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <ExclamationCircleIcon className="h-5 w-5 shrink-0 text-red-500" />
          <p className="text-sm text-red-500">{formState.message}</p>
        </div>
      )}
    </form>
  );
};

function ActionButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <UiButton
      disabled={disabled || pending}
      aria-disabled={disabled || pending}
    >
      Next Round
    </UiButton>
  );
}
