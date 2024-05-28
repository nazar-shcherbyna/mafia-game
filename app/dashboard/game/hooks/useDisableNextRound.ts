import { useGameStore } from '@/app/store';
import { getActionsObjCount, getNotUsedNightActions } from '../utils';
import { useGetCurrentDayOrNightStore } from './hooks';

export const useDisableNextRound = (): {
  isDisabledDayRound: boolean;
  isDisabledNightRound: boolean;
} => {
  const round = useGameStore((state) => state.day);
  const isNight = useGameStore((state) => state.isNight);
  const { playersStore } = useGetCurrentDayOrNightStore();

  const gamePlayers = playersStore[round];

  const notUsedNightActions = getNotUsedNightActions(gamePlayers);
  const isDisabledNightRound = Object.keys(notUsedNightActions).length > 0;

  const actionsObjCount = getActionsObjCount(playersStore[round]);
  console.log(actionsObjCount);
  const isDisabledDayRound =
    round !== 0 && !actionsObjCount?.KILLED_BY_DAY_VOTE;

  return {
    isDisabledDayRound: isNight ? false : isDisabledDayRound,
    isDisabledNightRound: isNight ? isDisabledNightRound : false,
  };
};
