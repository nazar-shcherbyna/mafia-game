'use server';

import { unstable_noStore } from 'next/cache';

export const fetchPlayerGames = async (playerId: string) => {
  unstable_noStore();

  try {
    // const games = await sql<DBGameType>`
    //   SELECT * FROM games
    //   WHERE player_id = ${playerId};
    // `;

    // return games.rows;
    return [];
  } catch (error) {
    console.error('Database Error in fetchPlayerGames:', error);
    throw new Error('Failed to fetch player games.');
  }
};
