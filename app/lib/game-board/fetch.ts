import {
  DBGamePlayerType,
  DBGameRoundType,
  DBUserType,
} from '@/app/@types/db-types';
import { sql } from '@vercel/postgres';
import { unstable_noStore } from 'next/cache';

export type FetchGamePlayerType = Pick<
  DBUserType & DBGamePlayerType,
  'id' | 'nickname' | 'game_role' | 'position_number' | 'role'
>;

export const fetchGamePlayers = async (gameId: string) => {
  unstable_noStore();

  try {
    const gamePlayers = await sql<FetchGamePlayerType>`
      SELECT id, nickname, game_role, position_number, role FROM users 
      JOIN games_players ON users.id = games_players.player_id
      WHERE game_id = ${gameId}
      ORDER BY position_number;
    `;

    return gamePlayers.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch game players.');
  }
};

export const fetchPlayerByPosition = async (
  gameId: string,
  position: number,
) => {
  unstable_noStore();

  try {
    const player = await sql<FetchGamePlayerType>`
      SELECT id, nickname, game_role, position_number, role FROM users 
      JOIN games_players ON users.id = games_players.player_id
      WHERE game_id = ${gameId} AND position_number = ${position};
    `;

    return player.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch player by position.');
  }
};

export const fetchPlayerRoundStatus = async (
  gameId: string,
  gameRound: string,
  playerId: string,
) => {
  unstable_noStore();

  try {
    const playerRoundStatus = await sql<Pick<DBGameRoundType, 'player_status'>>`
      SELECT player_status FROM games_rounds
      WHERE game_id = ${gameId} AND game_round = ${Number(
        gameRound,
      )} AND player_id = ${playerId};
    `;

    console.log('playerRoundStatus', playerRoundStatus);

    return playerRoundStatus.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch player round status.');
  }
};