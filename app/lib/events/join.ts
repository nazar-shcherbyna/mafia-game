'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath, unstable_noStore } from 'next/cache';

export async function joinEvent(player_id: string, event_id: string) {
  unstable_noStore();

  try {
    const eventsPlayers = await sql`
        INSERT INTO events_players (event_id, player_id)
        VALUES (${event_id}, ${player_id});
    `;
    revalidatePath(`/events/${event_id}`);
    return eventsPlayers.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to join event.');
  }
}
