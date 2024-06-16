'use client';

import { DBGamePlayerRoleEnum } from '@/app/@types/db-enums';
import { DBGameType } from '@/app/@types/db-types';
import { FetchGamePlayerType } from '@/app/lib/game-board/fetch';
import { updatePlayerRole } from '@/app/lib/game-board/update';
import { UiSelect } from '@/app/ui/atoms/select';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { PropertyWrapper } from '../../events/[id]/game-board/ui/PropertyWrapper';
import { UiButton } from '../atoms/button';

export interface SelectRoleFormStateType {
  message: string;
}

export const SelectRoleForm: React.FC<{
  player: FetchGamePlayerType;
  game: DBGameType;
}> = ({ player, game }) => {
  const defaultOptionValue = player.game_role || DBGamePlayerRoleEnum.civilian;

  const [optionsRole, setOptionsRole] =
    React.useState<DBGamePlayerRoleEnum>(defaultOptionValue);

  const updatePlayerRoleWithParams = updatePlayerRole.bind(
    null,
    player.id,
    game.id,
  );
  const [formState, dispatch] = useFormState<
    SelectRoleFormStateType | undefined
    // @ts-ignore
  >(updatePlayerRoleWithParams, undefined);

  return (
    <form action={dispatch}>
      <PropertyWrapper>
        Role:
        <UiSelect
          // disabled={!isPersonalDataEditable}
          // aria-disabled={!isPersonalDataEditable}
          onChange={(event) =>
            setOptionsRole(event.target.value as DBGamePlayerRoleEnum)
          }
          defaultValue={defaultOptionValue}
          name="role"
        >
          {Object.entries(DBGamePlayerRoleEnum).map(
            ([role, properties], index) => (
              <option
                disabled={role === player.game_role}
                key={role}
                value={role}
              >
                {role}
              </option>
            ),
          )}
        </UiSelect>
        <SaveButton disabled={optionsRole === player.game_role} />
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
    <UiButton className="bg-green-600" aria-disabled={disabled || pending}>
      Save
    </UiButton>
  );
}
