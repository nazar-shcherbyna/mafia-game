import { DBGamePlayerType, DBUserType } from '@/app/@types/db-types';
import { sql } from '@vercel/postgres';
import { unstable_noStore } from 'next/cache';

export const fetchGamePlayers = async (gameId: string) => {
  unstable_noStore();

  try {
    const gamePlayers = await sql<
      Pick<DBUserType & DBGamePlayerType, 'id' | 'nickname' | 'role'>
    >`
        SELECT id, nickname, games_players.role FROM users
        JOIN games_players ON users.id = games_players.player_id
        WHERE game_id = ${gameId};
    `;

    return gamePlayers.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch game players.');
  }
};
