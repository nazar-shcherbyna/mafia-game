import { useCalculateGameActionsHook } from '@/app/dashboard/game/hooks/gameActionsHook';
import { useGetCurrentDayOrNightStore } from '@/app/dashboard/game/hooks/hooks';
import { saveGameResult } from '@/app/dashboard/game/service';
import { checkWinner } from '@/app/dashboard/game/utils';
import { useGameStore } from '@/app/store';
import { useEffect } from 'react';

let oldSelectedSit: number | undefined | null = undefined;

export const useChangeRoundHook = () => {
  const day = useGameStore((state) => state.day);
  const isNight = useGameStore((state) => state.isNight);
  const selectedSit = useGameStore((state) => state.selectedSit);
  const setSelectedSit = useGameStore((state) => state.setSelectedSit);
  const setRoundReport = useGameStore((state) => state.setRoundReport);

  const addDay = useGameStore((state) => state.addDay);
  const reduceDay = useGameStore((state) => state.reduceDay);
  const changeTimeOfDay = useGameStore((state) => state.changeTimeOfDay);
  const registeredPlayers = useGameStore((state) => state.registeredPlayers);
  const { playersStore, setPlayersStore } = useGetCurrentDayOrNightStore();
  const { playersStore: previousPlayersStore } =
    useGetCurrentDayOrNightStore(false);

  const { getNewStatuses } = useCalculateGameActionsHook();

  useEffect(() => {
    setSelectedSit(undefined);

    const playersStore_ = [...playersStore];
    if (!playersStore?.[day]) {
      playersStore_.push({});

      const previousPlayers =
        previousPlayersStore[isNight ? day : day - 1] ||
        (day === 0 && !isNight && playersStore[day]) ||
        {};
      // playersStore_[day] = getNewStatuses(previousPlayers)
      setPlayersStore(playersStore_);

      checkWinner(playersStore_[day]);

      //@ts-ignore
      saveGameResult(JSON.stringify(useGameStore.getState()));
    }
  }, [day, isNight, registeredPlayers]);

  useEffect(() => {
    if (oldSelectedSit === null) {
      oldSelectedSit = selectedSit;
    } else if (selectedSit !== null && oldSelectedSit !== selectedSit) {
      oldSelectedSit = selectedSit;
      setSelectedSit(null);
    } else {
      setSelectedSit(oldSelectedSit);
      oldSelectedSit === null;
    }
  }, [selectedSit]);

  const previousRoundHandler = () => {
    if (!isNight) {
      reduceDay();
    }
    changeTimeOfDay();
    setRoundReport([]);
  };

  const nextRoundHandler = () => {
    if (isNight) {
      addDay();
    }
    changeTimeOfDay();
    setRoundReport([]);
  };

  return {
    previousRoundHandler,
    nextRoundHandler,
  };
};
