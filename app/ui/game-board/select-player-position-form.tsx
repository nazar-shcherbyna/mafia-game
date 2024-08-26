'use client';

import { DBGameTurnEnum } from '@/app/@types/db-enums';
import { DBGameType } from '@/app/@types/db-types';
import { PropertyWrapper } from '@/app/events/[id]/game-board/ui/PropertyWrapper';
import { FetchGamePlayerType } from '@/app/lib/game-board/fetch';
import { updatePlayerPosition } from '@/app/lib/game-board/update';
import { UiButton } from '@/app/ui/atoms/button';
import { UiSelect } from '@/app/ui/atoms/select';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';

export interface SelectRoleFormStateType {
  message: string;
}

export const SelectPlayerPositionForm: React.FC<{
  game: DBGameType;
  position: number;
  gamePlayers: FetchGamePlayerType[];
  playerInPlace: FetchGamePlayerType | undefined;
}> = ({ game, position, gamePlayers, playerInPlace }) => {
  const [option, setOption] = React.useState<FetchGamePlayerType | undefined>(
    undefined,
  );

  const updatePlayerPositionWithParams = updatePlayerPosition.bind(null, {
    gameId: game.id,
    position,
  });
  const [formState, dispatch] = useFormState<
    SelectRoleFormStateType | undefined
    // @ts-ignore
  >(updatePlayerPositionWithParams, undefined);

  const roundNumber = Number(game.round);
  const isDisabled =
    roundNumber > 1 || (roundNumber === 1 && game.turn === DBGameTurnEnum.day);

  return (
    <form action={dispatch}>
      <PropertyWrapper>
        Player name:
        <UiSelect
          // disabled={!isPersonalDataEditable}
          // aria-disabled={!isPersonalDataEditable}
          onChange={(event) => {
            const selectedPlayer = gamePlayers.find(
              (player) => player.id === event.target.value,
            );
            setOption(selectedPlayer);
          }}
          defaultValue={playerInPlace?.id}
          name="playerId"
          disabled={isDisabled}
        >
          <option value={undefined}>Not selected</option>
          {gamePlayers.map((player) => (
            <option
              key={player.id}
              value={player.id}
              disabled={playerInPlace?.id === player.id}
            >
              {player.nickname}
            </option>
          ))}
        </UiSelect>
        <SaveButton
          disabled={isDisabled || !option || playerInPlace?.id === option?.id}
        />
      </PropertyWrapper>
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

function SaveButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <UiButton
      className="bg-green-600"
      disabled={disabled || pending}
      aria-disabled={disabled || pending}
    >
      Save
    </UiButton>
  );
}
