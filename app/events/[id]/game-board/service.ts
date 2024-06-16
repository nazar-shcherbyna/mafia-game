'use server';

import { type GameStoreStateType } from '@/app/store';
import { mockedRegisteredPlayers } from './mockPlayers';

export const getRegisteredGamePlayers = async (gameId: string) => {
  return mockedRegisteredPlayers;
};

export const saveGameResult = async (result: GameStoreStateType) => {
  return { OK: true };
};
