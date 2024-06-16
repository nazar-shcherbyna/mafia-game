import { DBGameType } from '@/app/@types/db-types';
import { NextRoundFormStateType } from '@/app/ui/game-board/next-round-form';
import { FetchGamePlayerType } from './fetch';

export async function nextGameRound({
  game,
  gamePlayers,
}: {
  game: DBGameType;
  gamePlayers: FetchGamePlayerType[];
}): Promise<NextRoundFormStateType | undefined> {
  try {
    const gamePlayersWithoutStatus = gamePlayers.filter(
      (player) => player.player_status === null,
    );

    console.log(
      'gamePlayersWithoutStatus: ----------',
      gamePlayersWithoutStatus,
    );

    // revalidatePath(`/events/${game.id}/game-board`);
  } catch (error) {
    console.error('Database Error:', error);

    return {
      message: 'Failed to advance to the next round.',
    };
  }
}
