'use server';

import { EventType } from '@/app/@types/events';
import { PlayerType } from '@/app/@types/types';
import { sql } from '@vercel/postgres';
import { unstable_noStore } from 'next/cache';

export async function fetchEvent(id: string) {
  unstable_noStore();

  try {
    const events = await sql<EventType>`
      SELECT * FROM events
      WHERE id = ${id};
    `;

    return events.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch events.');
  }
}

export async function fetchEventPlayers(eventId: string, playerId: string) {
  unstable_noStore();

  try {
    const eventPlayers = await sql<PlayerType>`
      SELECT id, nickname FROM players
      WHERE id IN (
        SELECT player_id FROM events_players
        WHERE event_id = ${eventId}
      );
    `;
    console.log('eventPlayers:', eventPlayers.rows);

    return eventPlayers.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch event players.');
  }
}

export async function fetchAllEvents() {
  unstable_noStore();

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const events = await sql<EventType>`
          SELECT * FROM events
      `;
    return events.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch events.');
  }
}
