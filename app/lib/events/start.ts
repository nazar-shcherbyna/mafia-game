'use server';

import { JoinEventFormStateType } from '@/app/@types/events';
import { settings } from '@/settings';
import { sql } from '@vercel/postgres';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { fetchEvent, fetchEventModerator, fetchEventPlayers } from './fetch';

export async function startEvent(
  user_id: string,
  event_id: string,
): Promise<JoinEventFormStateType | null> {
  unstable_noStore();

  try {
    const eventModerator = await fetchEventModerator(event_id);

    if (eventModerator?.id !== user_id) {
      return {
        message: 'You are not the event moderator.',
      };
    }

    const event = await fetchEvent(event_id);

    if (event === null) {
      return {
        message: 'Could not find event.',
      };
    }

    if (event.status === 'in-process') {
      return {
        message: 'Event is already has started.',
      };
    }

    if (event.status === 'finished') {
      return {
        message: 'Event is finished.',
      };
    }

    const eventPlayers = await fetchEventPlayers(event_id);

    if (eventPlayers.length < settings.eventMinPlayersCount) {
      return {
        message: 'Event has not enough players.',
      };
    }

    await sql`
        UPDATE events
        SET status = 'in-process'
        WHERE id = ${event_id};
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
