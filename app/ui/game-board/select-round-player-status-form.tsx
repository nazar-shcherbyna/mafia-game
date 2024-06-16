'use client';

import {
  DBGameRoundPlayerStatusEnum,
  DBGameTurnEnum,
} from '@/app/@types/db-enums';
import { DBGameType } from '@/app/@types/db-types';
import { GamePlayerStatusKeysType } from '@/app/dashboard/game/types';
import { FetchGamePlayerType } from '@/app/lib/game-board/fetch';
import { updateRoundPlayerStatus } from '@/app/lib/game-board/update';
import { UiSelect } from '@/app/ui/atoms/select';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { PropertyWrapper } from '../../events/[id]/game-board/ui/PropertyWrapper';
import { UiButton } from '../atoms/button';

export interface SelectRoundPlayerStatusFormStateType {
  message: string;
}

export const SelectRoundPlayerStatusForm: React.FC<{
  player: FetchGamePlayerType;
  game: DBGameType;
  playerRoundStatus: DBGameRoundPlayerStatusEnum | null;
}> = async ({ player, game, playerRoundStatus }) => {
  const [optionsStatus, setOptionsStatus] = React.useState<
    DBGameRoundPlayerStatusEnum | undefined
  >(undefined);
  const updateRoundPlayerStatusWithParams = updateRoundPlayerStatus.bind(null, {
    gameId: game.id,
    gameRound: game.round,
    playerId: player.id,
  });

  const [formState, dispatch] = useFormState<
    SelectRoundPlayerStatusFormStateType | undefined
    // @ts-ignore
  >(updateRoundPlayerStatusWithParams, undefined);

  return (
    <form action={dispatch}>
      <PropertyWrapper>
        Status:
        <UiSelect
          // disabled={!isPersonalDataEditable}
          // aria-disabled={!isPersonalDataEditable}
          value={optionsStatus}
          onChange={(event) =>
            setOptionsStatus(event.target.value as GamePlayerStatusKeysType)
          }
          name="status"
        >
          {Object.entries(DBGameRoundPlayerStatusEnum).map(
            ([status, properties], index) => (
              <option
                key={status}
                value={status}
                disabled={
                  (game.turn === DBGameTurnEnum.night &&
                    status ===
                      DBGameRoundPlayerStatusEnum.killed_by_day_vote) ||
                  player.player_status === status
                }
              >
                {status}
              </option>
            ),
          )}
        </UiSelect>
        <SaveButton disabled={optionsStatus === playerRoundStatus} />
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
      aria-disabled={disabled || pending}
      type="submit"
    >
      Save
    </UiButton>
  );
}
