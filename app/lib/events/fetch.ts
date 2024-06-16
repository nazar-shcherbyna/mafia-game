'use server';

import { DBGameStatusEnum } from '@/app/@types/db-enums';
import type {
  DBEventPlayerType,
  DBEventType,
  DBGameType,
  DBUserType,
} from '@/app/@types/db-types';

import { sql } from '@vercel/postgres';
import { unstable_noStore } from 'next/cache';

export async function fetchEvent(id: string) {
  unstable_noStore();

  try {
    const events = await sql<DBEventType>`
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
    const eventUsers = await sql<
      Pick<DBUserType & DBEventPlayerType, 'id' | 'nickname' | 'status'>
    >`
      SELECT id, nickname, status FROM users 
      LEFT JOIN events_players ON users.id = events_players.player_id
      WHERE event_id = ${eventId};
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
    const eventModerator = await sql<Pick<DBUserType, 'id' | 'nickname'>>`
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

  try {
    const events = await sql<
      DBEventType & {
        players_count: string;
      }
    >`
          SELECT * FROM events
          LEFT JOIN (
            SELECT event_id, COUNT(player_id) as players_count
            FROM events_players
            GROUP BY event_id
          ) as players ON events.id = players.event_id
          ORDER BY created_at DESC;
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
        SELECT COUNT(player_id) FROM events_players
        WHERE event_id = ${eventId} AND player_id = ${playerId}
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

export const fetchEventStartedGames = async (eventId: string) => {
  unstable_noStore();

  try {
    const games = await sql<DBGameType>`
      SELECT * FROM games
      WHERE event_id = ${eventId} AND status = ${DBGameStatusEnum.started}
      LIMIT 1;
    `;

    return games.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch event active games.');
  }
};
