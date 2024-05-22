import { useGameStore } from '@/app/store';

export const useGetCurrentDayOrNightStore = (getCurrent = true) => {
  const isNight = useGameStore((state) => state.isNight);
  const playersStore = useGameStore((state) =>
    (getCurrent ? isNight : !isNight) ? state.playersNight : state.playersDay,
  );
  const setPlayersStore = useGameStore((state) =>
    (getCurrent ? isNight : !isNight)
      ? state.setPlayersNight
      : state.setPlayersDay,
  );
  return { playersStore, setPlayersStore };
};
