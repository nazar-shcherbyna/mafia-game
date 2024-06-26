'use server';

import { JoinEventFormStateType } from '@/app/@types/events';
import { settings } from '@/settings';
import { sql } from '@vercel/postgres';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { fetchCountOfPlayerIdInEvent } from './fetch';

export async function joinEvent(
  player_id: string,
  event_id: string,
): Promise<JoinEventFormStateType | null> {
  unstable_noStore();

  try {
    const countOfPlayerIdInEvent = await fetchCountOfPlayerIdInEvent(
      event_id,
      player_id,
    );

    if (countOfPlayerIdInEvent !== 0) {
      return {
        message: 'You are already joined this event.',
      };
    }

    if (countOfPlayerIdInEvent >= settings.eventMaxPlayersCount) {
      return {
        message: 'Event is fully booked.',
      };
    }

    await sql`
      INSERT INTO events_players (event_id, player_id)
      VALUES (${event_id}, ${player_id});
    `;

    revalidatePath(`/events/${event_id}`);

    return null;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Failed to join event.',
    };
  }
}
