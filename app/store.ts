'use client';

import { RegisteredUserGameType } from '@/app/@types/types';
import {
  PlayerGameDictType,
  RoundReportInterface,
} from '@/app/dashboard/game/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type GameStoreStateType = {
  gameId: string | null;
  day: number;
  isNight: boolean;
  selectedSit: number | undefined | null;
  isOpenRoundReport: boolean;
  registeredPlayers: RegisteredUserGameType[];
  playersDay: PlayerGameDictType[];
  playersNight: PlayerGameDictType[];
  roundReport: RoundReportInterface[];
};

type Actions = {
  setGameId: (gameId: string | undefined | null) => void;

  addDay: () => void;
  reduceDay: () => void;

  changeTimeOfDay: () => void;
  setSelectedSit: (selectedSit: number | undefined | null) => void;
  setRegisteredPlayers: (registeredPlayers: RegisteredUserGameType[]) => void;

  setPlayersDay: (Players: PlayerGameDictType[]) => void;
  setPlayersNight: (Players: PlayerGameDictType[]) => void;

  setRoundReport: (roundReport: RoundReportInterface[]) => void;
  resetState: () => void;

  setIsOpenRoundReport: (state: boolean) => void;
};

const initialState: GameStoreStateType = {
  gameId: null,
  day: 0,
  isNight: false,
  selectedSit: undefined,
  isOpenRoundReport: false,
  registeredPlayers: [],
  playersDay: [],
  playersNight: [],
  roundReport: [],
};

export const useGameStore = create<GameStoreStateType & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setGameId: (gameId: string | undefined | null) => set({ gameId: gameId }),

      addDay: () => set({ day: get().day + 1 }),
      reduceDay: () => set({ day: get().day - 1 }),

      changeTimeOfDay: () => set({ isNight: !get().isNight }),

      setSelectedSit: (selectedSit: number | undefined | null) =>
        set({ selectedSit: selectedSit }),

      setRegisteredPlayers: (registeredPlayers: RegisteredUserGameType[]) =>
        set({ registeredPlayers: registeredPlayers }),

      setPlayersDay: (playersDay: PlayerGameDictType[]) =>
        set({ playersDay: playersDay }),
      setPlayersNight: (playersNight: PlayerGameDictType[]) =>
        set({ playersNight: playersNight }),

      setRoundReport: (roundReport: RoundReportInterface[]) =>
        set({ roundReport: roundReport }),

      resetState: () => set({ ...initialState }),
      setIsOpenRoundReport: (state: boolean) =>
        set({ isOpenRoundReport: state }),
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => window.localStorage),
    },
  ),
);
