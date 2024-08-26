import {
  DBGamePlayerRoleEnum,
  DBGameRoundPlayerStatusEnum,
  DBGameTurnEnum,
  DBGameVinnerEnum,
} from '@/app/@types/db-enums';
import { DBGamePlayerType, DBGameType } from '@/app/@types/db-types';
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
  aliveGamePlayers: FetchGamePlayerType[],
): {
  isAllPlayersWithRoleMadeAction: boolean;
  actionsArray: DBGamePlayerRoleEnum[];
  isCityVoted: boolean;
} {
  const actionsArray: DBGamePlayerRoleEnum[] = [];
  const aliveRolesWithActionArray = aliveGamePlayers
    .filter((player) => player.game_role !== DBGamePlayerRoleEnum.civilian)
    .map((player) => player.game_role);

  const isRoleAlive = (gameRole: DBGamePlayerRoleEnum) => {
    return aliveGamePlayers.some((player) => player.game_role === gameRole);
  };

  const isMafiaMadeAction = aliveGamePlayers.some(
    (player) =>
      player.player_status === DBGameRoundPlayerStatusEnum.killed_by_mafia,
  );
  if (isMafiaMadeAction) {
    if (isRoleAlive(DBGamePlayerRoleEnum.mafia)) {
      actionsArray.push(DBGamePlayerRoleEnum.mafia);
    }
    if (isRoleAlive(DBGamePlayerRoleEnum.don)) {
      actionsArray.push(DBGamePlayerRoleEnum.don);
    }
  }

  const isDetectiveMadeAction = aliveGamePlayers.some(
    (player) =>
      player.player_status === DBGameRoundPlayerStatusEnum.checked_by_detective,
  );
  if (isDetectiveMadeAction && isRoleAlive(DBGamePlayerRoleEnum.detective)) {
    actionsArray.push(DBGamePlayerRoleEnum.detective);
  }

  const isDoctorMadeAction = aliveGamePlayers.some(
    (player) =>
      player.player_status === DBGameRoundPlayerStatusEnum.hilled_by_doctor,
  );
  if (isDoctorMadeAction && isRoleAlive(DBGamePlayerRoleEnum.doctor)) {
    actionsArray.push(DBGamePlayerRoleEnum.doctor);
  }

  const isKillerMadeAction = aliveGamePlayers.some(
    (player) =>
      player.player_status === DBGameRoundPlayerStatusEnum.killed_by_killer,
  );
  if (isKillerMadeAction && isRoleAlive(DBGamePlayerRoleEnum.killer)) {
    actionsArray.push(DBGamePlayerRoleEnum.killer);
  }

  const isHookerMadeAction = aliveGamePlayers.some(
    (player) => player.player_status === DBGameRoundPlayerStatusEnum.hooked,
  );
  if (isHookerMadeAction && isRoleAlive(DBGamePlayerRoleEnum.hooker)) {
    actionsArray.push(DBGamePlayerRoleEnum.hooker);
  }

  const isCityVoted = aliveGamePlayers.some(
    (player) =>
      player.player_status === DBGameRoundPlayerStatusEnum.killed_by_day_vote,
  );

  return {
    isAllPlayersWithRoleMadeAction: actionsArray.every((role) =>
      aliveRolesWithActionArray.includes(role),
    ),
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
  if (game.vinner !== null) {
    return {
      message: `The game is finished at ${game.finished_at}. The vinner is ${game.vinner}`,
      disableNextRound: true,
      passedConditions: [],
    };
  }

  const roundNumber = Number(game.round);
  const aliveGamePlayers = gamePlayers.filter(
    (player) => player.is_alive === true,
  );

  if (roundNumber === 1) {
    const isAllPlayersHavePosition =
      checkIfAllPlayersHavePosition(aliveGamePlayers);

    if (!isAllPlayersHavePosition) {
      return {
        message: 'Please, assign all players to their positions.',
        disableNextRound: true,
        passedConditions: [],
      };
    }

    const isAllPlayersHaveRole = checkIfAllPlayersHaveRole(aliveGamePlayers);

    if (!isAllPlayersHaveRole) {
      return {
        message: 'Please, assign all players to their roles.',
        disableNextRound: true,
        passedConditions: ['positions'],
      };
    }

    const isAllPlayersWithRoleMadeAction =
      checkIfAllPlayersWithRoleMadeAction(aliveGamePlayers);

    if (!isAllPlayersWithRoleMadeAction) {
      return {
        message: 'Please, assign all players to their actions.',
        disableNextRound: true,
        passedConditions: ['positions', 'roles'],
      };
    }

    if (game.turn === DBGameTurnEnum.day) {
      const isCityVoted = isAllPlayersWithRoleMadeAction.isCityVoted;

      if (!isCityVoted) {
        return {
          message:
            'Please, vote for the player who you want to kill in the day.',
          disableNextRound: true,
          passedConditions: ['positions', 'roles', 'actions'],
        };
      }

      return {
        message: 'You can start Night 2.',
        disableNextRound: false,
        passedConditions: ['positions', 'roles', 'actions'],
      };
    }

    return {
      message: 'You can start Day 1.',
      disableNextRound: false,
      passedConditions: ['positions', 'roles', 'actions'],
    };
  } else if (roundNumber > 1) {
    const isAllPlayersWithRoleMadeAction =
      checkIfAllPlayersWithRoleMadeAction(aliveGamePlayers);

    console.log('game', game);

    console.log(
      'isAllPlayersWithRoleMadeAction',
      isAllPlayersWithRoleMadeAction,
    );

    if (!isAllPlayersWithRoleMadeAction.isAllPlayersWithRoleMadeAction) {
      return {
        message: 'Please, assign all players to their actions.',
        disableNextRound: true,
        passedConditions: ['positions', 'roles'],
      };
    }

    if (game.turn === DBGameTurnEnum.day) {
      const isCityVoted = isAllPlayersWithRoleMadeAction.isCityVoted;

      if (!isCityVoted) {
        return {
          message:
            'Please, vote for the player who you want to kill in the day.',
          disableNextRound: true,
          passedConditions: ['positions', 'roles', 'actions'],
        };
      }

      return {
        message: `You can start Night ${roundNumber + 1}.`,
        disableNextRound: false,
        passedConditions: ['positions', 'roles', 'actions'],
      };
    }

    return {
      message: `You can start Day ${roundNumber}.`,
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

export function checkIfThereIsVinner(
  updatedAliveGamePlayers: DBGamePlayerType[],
) {
  const mafiaPlayers = updatedAliveGamePlayers.filter(
    (player) =>
      player.game_role === DBGamePlayerRoleEnum.mafia ||
      player.game_role === DBGamePlayerRoleEnum.don,
  );

  const cityPlayers = updatedAliveGamePlayers.filter(
    (player) =>
      player.game_role !== DBGamePlayerRoleEnum.mafia &&
      player.game_role !== DBGamePlayerRoleEnum.don,
  );

  if (mafiaPlayers.length === 0) {
    return DBGameVinnerEnum.civilians;
  } else if (mafiaPlayers.length >= cityPlayers.length) {
    return DBGameVinnerEnum.mafia;
  }

  return null;
}
