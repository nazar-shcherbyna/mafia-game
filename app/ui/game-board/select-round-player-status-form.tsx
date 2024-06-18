'use client';

import {
  DBGamePlayerRoleEnum,
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
  gamePlayers: FetchGamePlayerType[];
}> = async ({ player, game, playerRoundStatus, gamePlayers }) => {
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

  const needTodisableStatus = (status: DBGameRoundPlayerStatusEnum) => {
    switch (status) {
      case DBGameRoundPlayerStatusEnum.killed_by_day_vote:
        return game.turn === DBGameTurnEnum.night;
      case DBGameRoundPlayerStatusEnum.killed_by_killer:
        if (game.turn === DBGameTurnEnum.day) {
          return true;
        }
        const killer = gamePlayers.find(
          (player) => player.game_role === DBGamePlayerRoleEnum.killer,
        );
        if (!killer || killer.is_alive === false) {
          return true;
        }
        return false;
      case DBGameRoundPlayerStatusEnum.hilled_by_doctor:
        if (game.turn === DBGameTurnEnum.day) {
          return true;
        }
        const doctor = gamePlayers.find(
          (player) => player.game_role === DBGamePlayerRoleEnum.doctor,
        );
        if (!doctor || doctor.is_alive === false) {
          return true;
        }
        return false;
      case DBGameRoundPlayerStatusEnum.checked_by_detective:
        if (game.turn === DBGameTurnEnum.day) {
          return true;
        }
        const detective = gamePlayers.find(
          (player) => player.game_role === DBGamePlayerRoleEnum.detective,
        );
        if (!detective || detective.is_alive === false) {
          return true;
        }
        return false;
      case DBGameRoundPlayerStatusEnum.hooked:
        if (game.turn === DBGameTurnEnum.day) {
          return true;
        }
        const hooker = gamePlayers.find(
          (player) => player.game_role === DBGamePlayerRoleEnum.hooker,
        );
        if (!hooker || hooker.is_alive === false) {
          return true;
        }
        return false;
      case DBGameRoundPlayerStatusEnum.killed_by_mafia:
        if (game.turn === DBGameTurnEnum.day) {
          return true;
        }
        return false;
      case DBGameRoundPlayerStatusEnum.killed_by_detective:
        if (game.turn === DBGameTurnEnum.day) {
          return true;
        }
        const detectiveRole = gamePlayers.find(
          (player) => player.game_role === DBGamePlayerRoleEnum.detective,
        );
        if (!detectiveRole || detectiveRole.is_alive === false) {
          return true;
        }
        return false;
      default:
        return player.player_status === status;
    }
  };

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
                disabled={needTodisableStatus(
                  status as DBGameRoundPlayerStatusEnum,
                )}
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
