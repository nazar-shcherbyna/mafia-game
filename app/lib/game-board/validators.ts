import {
  DBGamePlayerRoleEnum,
  DBGameRoundPlayerStatusEnum,
  DBGameTurnEnum,
} from '@/app/@types/db-enums';
import { DBGameType } from '@/app/@types/db-types';
import { FetchGamePlayerType } from './fetch';

export function checkIfPositionIsActive(
  passedConditions: ReturnType<typeof gameBoardValidator>['passedConditions'],
  player: FetchGamePlayerType | undefined,
): boolean {
  const areAllPlayersHavePosition = passedConditions.includes('positions');

  if (!areAllPlayersHavePosition) {
    return true;
  }

  if (player) {
    return true;
  }

  return false;
}

export function checkIfAllPlayersHavePosition(
  gamePlayers: FetchGamePlayerType[],
): boolean {
  return gamePlayers.every((player) => player.position_number !== null);
}

export function checkIfAllPlayersHaveRole(
  gamePlayers: FetchGamePlayerType[],
): boolean {
  return gamePlayers.every((player) => player.game_role !== null);
}

export function checkIfAllPlayersWithRoleMadeAction(
  gamePlayers: FetchGamePlayerType[],
): {
  isAllPlayersWithRoleMadeAction: boolean;
  actionsArray: DBGamePlayerRoleEnum[];
  isCityVoted: boolean;
} {
  const actionsArray = [];
  const isMafiaMadeAction = gamePlayers.some(
    (player) =>
      player.player_status === DBGameRoundPlayerStatusEnum.killed_by_mafia,
  );
  if (isMafiaMadeAction) {
    actionsArray.push(DBGamePlayerRoleEnum.mafia, DBGamePlayerRoleEnum.don);
  }

  const isDetectiveMadeAction = gamePlayers.some(
    (player) =>
      player.player_status === DBGameRoundPlayerStatusEnum.checked_by_detective,
  );
  if (isDetectiveMadeAction) {
    actionsArray.push(DBGamePlayerRoleEnum.detective);
  }

  const isDoctorMadeAction = gamePlayers.some(
    (player) =>
      player.player_status === DBGameRoundPlayerStatusEnum.hilled_by_doctor,
  );
  if (isDoctorMadeAction) {
    actionsArray.push(DBGamePlayerRoleEnum.doctor);
  }

  const isKillerMadeAction = gamePlayers.some(
    (player) =>
      player.player_status === DBGameRoundPlayerStatusEnum.killed_by_killer,
  );
  if (isKillerMadeAction) {
    actionsArray.push(DBGamePlayerRoleEnum.killer);
  }

  const isHookerMadeAction = gamePlayers.some(
    (player) => player.player_status === DBGameRoundPlayerStatusEnum.hooked,
  );
  if (isHookerMadeAction) {
    actionsArray.push(DBGamePlayerRoleEnum.hooker);
  }

  const isCityVoted = gamePlayers.some(
    (player) =>
      player.player_status === DBGameRoundPlayerStatusEnum.killed_by_day_vote,
  );

  return {
    isAllPlayersWithRoleMadeAction:
      isMafiaMadeAction &&
      isDetectiveMadeAction &&
      isDoctorMadeAction &&
      isKillerMadeAction &&
      isHookerMadeAction,
    actionsArray,
    isCityVoted,
  };
}

export const gameBoardValidator = (
  game: DBGameType,
  gamePlayers: FetchGamePlayerType[],
): {
  message: string;
  disableNextRound: boolean;
  passedConditions: ('positions' | 'roles' | 'actions')[];
} => {
  const roundNumber = Number(game.round);
  if (roundNumber === 1) {
    const isAllPlayersHavePosition = checkIfAllPlayersHavePosition(gamePlayers);

    if (!isAllPlayersHavePosition) {
      return {
        message: 'Please, assign all players to their positions.',
        disableNextRound: true,
        passedConditions: [],
      };
    }

    const isAllPlayersHaveRole = checkIfAllPlayersHaveRole(gamePlayers);

    if (!isAllPlayersHaveRole) {
      return {
        message: 'Please, assign all players to their roles.',
        disableNextRound: true,
        passedConditions: ['positions'],
      };
    }

    const isAllPlayersWithRoleMadeAction =
      checkIfAllPlayersWithRoleMadeAction(gamePlayers);

    if (!isAllPlayersWithRoleMadeAction) {
      return {
        message: 'Please, assign all players to their actions.',
        disableNextRound: true,
        passedConditions: ['positions', 'roles'],
      };
    }

    const successMessage =
      game.turn === DBGameTurnEnum.night
        ? 'You can start Day 1.'
        : 'You can start Night 2.';

    return {
      message: successMessage,
      disableNextRound: false,
      passedConditions: ['positions', 'roles', 'actions'],
    };
  } else if (roundNumber > 1) {
    return {
      message: 'You can start the next round.',
      disableNextRound: false,
      passedConditions: ['positions', 'roles'],
    };
  } else {
    return {
      message: 'You can`t start the next round.',
      disableNextRound: false,
      passedConditions: ['positions', 'roles'],
    };
  }
};
