'use server';

import {
  DBGameRoundPlayerStatusEnum,
  DBGameTurnEnum,
} from '@/app/@types/db-enums';
import { DBGamePlayerType, DBGameType } from '@/app/@types/db-types';
import { NextRoundFormStateType } from '@/app/ui/game-board/next-round-form';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { FetchGamePlayerType } from './fetch';
import { finishGame } from './update';
import { checkIfThereIsVinner } from './validators';

export async function nextGameRound({
  game,
  gamePlayers,
}: {
  game: DBGameType;
  gamePlayers: FetchGamePlayerType[];
}): Promise<NextRoundFormStateType | undefined> {
  let isGameFinished = false;

  try {
    const alivePlayersWithoutStatus = gamePlayers.filter(
      (player) => player.player_status === null && player.is_alive === true,
    );

    if (alivePlayersWithoutStatus.length > 0) {
      await Promise.all(
        alivePlayersWithoutStatus.map(
          async (player) =>
            sql`
                INSERT INTO games_rounds (game_id, game_round, player_id, player_status)
                VALUES (${game.id}, ${game.round}, ${player.id}, ${DBGameRoundPlayerStatusEnum.alive});
            `,
        ),
      );
    }

    if (game.turn === DBGameTurnEnum.day) {
      const killedByDayVotePlayer = gamePlayers.find(
        (player) =>
          player.player_status ===
          DBGameRoundPlayerStatusEnum.killed_by_day_vote,
      );

      if (killedByDayVotePlayer) {
        await sql`
          UPDATE games_players
          SET is_alive = false
          WHERE game_id = ${game.id} AND player_id = ${killedByDayVotePlayer.id};
        `;
      }

      const updatedAliveGamePlayers = await sql<DBGamePlayerType>`
        SELECT * FROM games_players
        WHERE game_id = ${game.id} AND is_alive = true;
      `;

      const gameVinner = checkIfThereIsVinner(updatedAliveGamePlayers.rows);

      if (gameVinner !== null) {
        await finishGame({
          gameId: game.id,
          vinner: gameVinner,
        });
        isGameFinished = true;
      } else {
        await sql`
          UPDATE games
          SET turn = ${DBGameTurnEnum.night}, round = ${game.round + 1}
          WHERE id = ${game.id};
        `;
      }
    }

    if (game.turn === DBGameTurnEnum.night) {
      const killedByKillerPlayer = gamePlayers.find(
        (player) =>
          player.player_status === DBGameRoundPlayerStatusEnum.killed_by_killer,
      );

      if (killedByKillerPlayer) {
        await sql`
          UPDATE games_players
          SET is_alive = false
          WHERE game_id = ${game.id} AND player_id = ${killedByKillerPlayer.id};
      `;
      }

      const killedByMafiaPlayer = gamePlayers.find(
        (player) =>
          player.player_status === DBGameRoundPlayerStatusEnum.killed_by_mafia,
      );

      if (killedByMafiaPlayer) {
        await sql`
          UPDATE games_players
          SET is_alive = false
          WHERE game_id = ${game.id} AND player_id = ${killedByMafiaPlayer.id};
      `;
      }

      const killedByDetectivePlayer = gamePlayers.find(
        (player) =>
          player.player_status ===
          DBGameRoundPlayerStatusEnum.killed_by_detective,
      );

      if (killedByDetectivePlayer) {
        await sql`
          UPDATE games_players
          SET is_alive = false
          WHERE game_id = ${game.id} AND player_id = ${killedByDetectivePlayer.id};
      `;
      }

      const updatedAliveGamePlayers = await sql<DBGamePlayerType>`
        SELECT * FROM games_players
        WHERE game_id = ${game.id} AND is_alive = true;
      `;

      const gameVinner = checkIfThereIsVinner(updatedAliveGamePlayers.rows);

      if (gameVinner !== null) {
        await finishGame({
          gameId: game.id,
          vinner: gameVinner,
        });
        isGameFinished = true;
      } else {
        await sql`
          UPDATE games
          SET turn = ${DBGameTurnEnum.day}
          WHERE id = ${game.id};
        `;
      }
    }
  } catch (error) {
    console.error('Database Error in nextGameRound:', error);

    return {
      message: 'Failed to advance to the next round.',
    };
  }

  if (isGameFinished) {
    redirect(`/events/${game.event_id}`);
  } else {
    revalidatePath(`/events/${game.id}/game-board`);
  }
}
