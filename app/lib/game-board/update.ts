'use server';

import { DBGamePlayerRoleEnum } from '@/app/@types/db-enums';
import { SelectRoleFormStateType } from '@/app/ui/game-board/select-role-form';
import { SelectRoundPlayerStatusFormStateType } from '@/app/ui/game-board/select-round-player-status-form';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function updatePlayerRole(
  player_id: string,
  gameId: string,
  prevState: SelectRoleFormStateType | undefined,
  formData: FormData,
): Promise<SelectRoleFormStateType | undefined> {
  try {
    const role = formData.get('role') as DBGamePlayerRoleEnum;

    await sql`
      UPDATE games_players
      SET game_role = ${role}
      WHERE player_id = ${player_id} AND game_id = ${gameId};
    `;

    revalidatePath(`/events/${gameId}/game-board`);
  } catch (error) {
    console.error('Database Error:', error);

    return {
      message: 'Failed to update player role.',
    };
  }
}

export async function updateRoundPlayerStatus(
  {
    gameId,
    gameRound,
    playerId,
  }: {
    gameId: string;
    gameRound: string;
    playerId: string;
  },
  prevState: SelectRoleFormStateType | undefined,
  formData: FormData,
): Promise<SelectRoundPlayerStatusFormStateType | undefined> {
  try {
    // const playerStatusInDB = await sql<DBGamesRoundsType>`
    const status = formData.get('status') as DBGamePlayerRoleEnum;

    await sql`
      INSERT INTO games_rounds (game_id, game_round, player_id, player_status)
      VALUES (${gameId}, ${Number(gameRound)}, ${playerId}, ${status})
    `;

    revalidatePath(`/events/${gameId}/game-board`);
  } catch (error) {
    console.error('Database Error:', error);

    return {
      message: 'Failed to update player status.',
    };
  }
}

export async function updatePlayerPosition(
  {
    gameId,
    position,
  }: {
    gameId: string;
    position: number;
  },
  prevState: SelectRoleFormStateType | undefined,
  formData: FormData,
): Promise<SelectRoleFormStateType | undefined> {
  try {
    const playerId = formData.get('playerId') as string;

    await sql`
      UPDATE games_players
      SET position_number = ${position}
      WHERE player_id = ${playerId} AND game_id = ${gameId};
    `;

    revalidatePath(`/events/${gameId}/game-board`);
  } catch (error) {
    console.error('Database Error:', error);

    return {
      message: 'Failed to update player position.',
    };
  }
}
