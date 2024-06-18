'use server';

import { DBEventStatusEnum, DBGameStatusEnum } from '@/app/@types/db-enums';
import { JoinEventFormStateType } from '@/app/@types/events';
import { sql } from '@vercel/postgres';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { fetchEventGames } from './fetch';

export async function finishEvent(
  eventId: string,
): Promise<JoinEventFormStateType | undefined> {
  unstable_noStore();

  try {
    const eventGames = await fetchEventGames(eventId);

    if (eventGames.length === 0) {
      return {
        message: 'Event has no games.',
      };
    }

    const hasEventActiveGame = eventGames.some(
      (game) => game.status === DBGameStatusEnum.started,
    );
    if (hasEventActiveGame) {
      return {
        message: 'Event has active game.',
      };
    }

    await sql`
      UPDATE events
      SET status = ${DBEventStatusEnum.completed}
      WHERE id = ${eventId};
    `;

    revalidatePath(`/events/${eventId}`);
  } catch (error) {
    console.error('Database Error in finishEvent:', error);
    return {
      message: 'Failed to join event.',
    };
  }
}
