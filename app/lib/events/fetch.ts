'use server';

import { EventType } from '@/app/@types/events';
import { UserType } from '@/app/@types/users';
import { sql } from '@vercel/postgres';
import { unstable_noStore } from 'next/cache';

export async function fetchEvent(id: string) {
  unstable_noStore();

  try {
    const events = await sql<EventType>`
      SELECT * FROM events
      WHERE id = ${id};
    `;

    if (events.rows[0] === undefined) {
      return null;
    }

    return events.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch events.');
  }
}

export async function fetchEventPlayers(eventId: string) {
  unstable_noStore();

  try {
    const eventUsers = await sql<Pick<UserType, 'id' | 'nickname'>>`
      SELECT id, nickname FROM users
      WHERE id IN (
        SELECT user_id FROM events_users
        WHERE event_id = ${eventId}
      );
    `;

    return eventUsers.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch event users.');
  }
}

export async function fetchEventModerator(eventId: string) {
  unstable_noStore();

  try {
    const eventModerator = await sql<Pick<UserType, 'id' | 'nickname'>>`
      SELECT id, nickname FROM users
      WHERE id IN (
        SELECT admin_id FROM events
        WHERE id = ${eventId}
      ) AND role = 'admin';
    `;

    if (eventModerator.rows[0] === undefined) {
      return null;
    }

    return eventModerator.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch event moderator.');
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

export async function fetchCountOfPlayerIdInEvent(
  eventId: string,
  playerId: string,
) {
  unstable_noStore();

  try {
    const countOfPlayerIdInEvent = await sql<{
      count: string;
    }>`
        SELECT COUNT(user_id) FROM events_users
        WHERE event_id = ${eventId} AND user_id = ${playerId}
        LIMIT 1;
    `;

    return countOfPlayerIdInEvent.rows[0]
      ? Number(countOfPlayerIdInEvent.rows[0].count)
      : null;
  } catch (error) {
    console.error('Database Error:', error);
    return null;
  }
}
