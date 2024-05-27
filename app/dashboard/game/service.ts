"use server"

import { mockedRegisteredPlayers } from "@/app/dashboard/game/mockPlayers"
import { type GameStoreStateType } from "@/app/store"

export const getRegisteredGamePlayers = async (gameId: string) => {
  return mockedRegisteredPlayers
}

export const saveGameResult = async (result: GameStoreStateType) => {
  return {OK: true}
}
