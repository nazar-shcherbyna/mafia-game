import { FetchGamePlayerType } from './fetch';

export const gameBoardValidator = (
  round: string,
  gamePlayers: FetchGamePlayerType[],
): {
  message: string;
  disableNextRound: boolean;
} => {
  const roundNumber = Number(round);
  if (roundNumber === 1) {
    const haveAllPlayersHavePosition = gamePlayers.every(
      (player) => player.position_number !== null,
    );

    if (!haveAllPlayersHavePosition) {
      return {
        message: 'Please, assign all players to their positions.',
        disableNextRound: true,
      };
    }

    const haveAllPlayersHaveRole = gamePlayers.every(
      (player) => player.game_role !== null,
    );

    if (!haveAllPlayersHaveRole) {
      return {
        message: 'Please, assign all players to their roles.',
        disableNextRound: true,
      };
    }

    return {
      message: 'You can start Round 2.',
      disableNextRound: false,
    };
  } else if (roundNumber > 1) {
    return {
      message: 'You can start the next round.',
      disableNextRound: false,
    };
  } else {
    return {
      message: 'You can`t start the next round.',
      disableNextRound: false,
    };
  }
};
