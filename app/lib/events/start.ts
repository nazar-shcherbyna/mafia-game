'use server';

import {
  DBEventPlayerStatusEnum,
  DBEventStatusEnum,
  DBGameStatusEnum,
  DBGameTurnEnum,
} from '@/app/@types/db-enums';
import { DBGameType } from '@/app/@types/db-types';
import { JoinEventFormStateType } from '@/app/@types/events';
import { settings } from '@/settings';
import { sql } from '@vercel/postgres';
import { unstable_noStore } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  fetchEvent,
  fetchEventGames,
  fetchEventModerator,
  fetchEventPlayers,
} from './fetch';

export async function startEvent({
  admin_id,
  event_id,
}: {
  admin_id: string;
  event_id: string;
}): Promise<JoinEventFormStateType | null> {
  unstable_noStore();

  try {
    const event = await fetchEvent(event_id);
    const eventGames = await fetchEventGames(event_id);

    if (event === null) {
      return {
        message: 'Could not find event.',
      };
    }
    const eventModerator = await fetchEventModerator(event_id);
    if (eventModerator?.id !== admin_id) {
      return {
        message: 'You are not the event moderator.',
      };
    }

    const activeGame = eventGames.find(
      (game) => game.status === DBGameStatusEnum.started,
    );

    if (activeGame) {
      return {
        message: 'Event has active game.',
      };
    }
    if (event.status === DBEventStatusEnum.completed) {
      return {
        message: 'Event is completed.',
      };
    }
    const eventPlayers = await fetchEventPlayers(event_id);
    if (eventPlayers.length < settings.eventMinPlayersCount) {
      return {
        message: 'Event has not enough players.',
      };
    }

    if (event.status === DBEventStatusEnum.created) {
      await sql`
          UPDATE events
          SET status = ${DBEventStatusEnum.inProgress}
          WHERE id = ${event_id};
      `;
    }

    const game = await sql<DBGameType>`
      INSERT INTO games (event_id, status, round, turn)
      VALUES (${event_id}, ${DBGameStatusEnum.started}, 1, ${DBGameTurnEnum.night})
      RETURNING *;
    `;
    const activeEventPlayers = eventPlayers.filter(
      (player) => player.status === DBEventPlayerStatusEnum.active,
    );
    const insertedPlayers = await Promise.all(
      activeEventPlayers.map(
        async (player) =>
          sql`
            INSERT INTO games_players (game_id, player_id)
            VALUES (${game.rows[0].id}, ${player.id});
          `,
      ),
    );
    console.log('insertedPlayers:', insertedPlayers.length);
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Failed to join event.',
    };
  }

  redirect(`/events/${event_id}/game-board`);
}
