"use client"

import { RegisteredPlayerGameType } from '@/app/@types/types'
import { PlayerGameDictType, RoundReportInterface } from '@/app/dashboard/game/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


export type GameStoreStateType = {
  gameId: string | null
  day: number
  isNight: boolean
  selectedSit: number | undefined | null
  registeredPlayers: RegisteredPlayerGameType[]
  playersDay: PlayerGameDictType[]
  playersNight: PlayerGameDictType[]
  roundReport: RoundReportInterface[]
}

type Actions = {
  setGameId: (gameId: string | undefined | null) => void

  addDay: () => void
  reduceDay: () => void

  changeTimeOfDay: () => void
  setSelectedSit: (selectedSit: number | undefined | null) => void
  setRegisteredPlayers: (registeredPlayers: RegisteredPlayerGameType[]) => void

  setPlayersDay: (Players: PlayerGameDictType[]) => void
  setPlayersNight: (Players: PlayerGameDictType[]) => void

  setRoundReport: (roundReport: RoundReportInterface[]) => void
  resetState: () => void
}


const initialState: GameStoreStateType = {
  gameId: null,
  day: 0,
  isNight: false,
  selectedSit: undefined,
  registeredPlayers: [],
  playersDay: [],
  playersNight: [],
  roundReport: [],
}


export const useGameStore = create<GameStoreStateType & Actions>()(
  persist(
    (set, get) => ({
        ...initialState,

        setGameId: (gameId: string | undefined | null) => set({ gameId: gameId }),

        addDay: () => set({ day: get().day + 1 }),
        reduceDay: () => set({ day: get().day - 1 }),
      
        changeTimeOfDay: () => set({ isNight: !get().isNight }),
      
        setSelectedSit: (selectedSit: number | undefined | null) => set({ selectedSit: selectedSit }),
      
        setRegisteredPlayers: (registeredPlayers: RegisteredPlayerGameType[]) => set({ registeredPlayers: registeredPlayers }),
      
        setPlayersDay: (playersDay: PlayerGameDictType[]) => set({ playersDay: playersDay }),
        setPlayersNight: (playersNight: PlayerGameDictType[]) => set({ playersNight: playersNight }),

        setRoundReport: (roundReport: RoundReportInterface[]) => set({ roundReport: roundReport }),

        resetState: () => set({...initialState}),
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => window.localStorage),
    },
  ),
)

