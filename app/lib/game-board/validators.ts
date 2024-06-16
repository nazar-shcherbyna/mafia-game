import { FetchGamePlayerType } from './fetch';

export const checkIfAllPlayersHavePosition = (
  gamePlayers: FetchGamePlayerType[],
): boolean => {
  return gamePlayers.every((player) => player.position_number !== null);
};

export const checkIfAllPlayersHaveRole = (
  gamePlayers: FetchGamePlayerType[],
): boolean => {
  return gamePlayers.every((player) => player.game_role !== null);
};

export const gameBoardValidator = (
  round: string,
  gamePlayers: FetchGamePlayerType[],
): {
  message: string;
  disableNextRound: boolean;
  passedConditions: ('potions' | 'roles')[];
} => {
  const roundNumber = Number(round);
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
        passedConditions: ['potions'],
      };
    }

    return {
      message: 'You can start Round 2.',
      disableNextRound: false,
      passedConditions: ['potions', 'roles'],
    };
  } else if (roundNumber > 1) {
    return {
      message: 'You can start the next round.',
      disableNextRound: false,
      passedConditions: ['potions', 'roles'],
    };
  } else {
    return {
      message: 'You can`t start the next round.',
      disableNextRound: false,
      passedConditions: ['potions', 'roles'],
    };
  }
};

export function checkIfPositionIsActive(
  passedConditions: ReturnType<typeof gameBoardValidator>['passedConditions'],
  player: FetchGamePlayerType | undefined,
): boolean {
  const areAllPlayersHavePosition = passedConditions.includes('potions');

  if (!areAllPlayersHavePosition) {
    return true;
  }

  if (player) {
    return true;
  }

  return false;
}
